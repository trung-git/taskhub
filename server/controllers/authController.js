const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const Finder = require('../models/finderModel');
const Tasker = require('../models/taskerModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const getObjectModel = (role) => {
  const ROLE = ['Tasker', 'Finder'];
  if (!ROLE.includes(role)) {
    return false;
  }
  return role === 'Tasker' ? Tasker : Finder;
};

exports.signup = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  const Object = getObjectModel(role);

  if (!Object) {
    return next(new AppError('Invalid role!', 400));
  }

  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
  };
  if (role === 'Tasker') {
    user.address = req.body.address;
  }

  const newUser = await Object.create(user);
  createAndSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password, role } = req.body;
  const Object = getObjectModel(role);

  if (!Object) {
    return next(new AppError('Invalid role!', 400));
  }

  // 1) Check if email and password exist
  if (!username || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Object.findOne({ username }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createAndSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
