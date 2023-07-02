const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../models/userModel');
const Finder = require('../models/finderModel');
const Tasker = require('../models/taskerModel');
const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const TaskTag = require('../models/taskTagModel');
const District = require('../models/districtModel');
const City = require('../models/cityModel');

const ROLE = {
  TASKER: 'Tasker',
  FINDER: 'Finder',
};

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
  const masterRole = Object.entries(ROLE).map((v) => v[1]);
  if (!masterRole.includes(role)) {
    return false;
  }
  return role === ROLE.TASKER ? Tasker : Finder;
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
    dateOfBirth: req.body.dateOfBirth,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
  };
  if (role === ROLE.TASKER) {
    const workLocation = await District.findById(req.body.workLocation);
    if (!workLocation) {
      return next(new AppError('Invalid Work Location', 400));
    }
    user.workLocation = [workLocation._id];

    const taskTag = await TaskTag.findById(req.body.taskTag);
    if (!taskTag) {
      return next(new AppError('Invalid Task', 400));
    }
    user.taskTag = { taskInfo: taskTag._id, price: taskTag.defaultPrice };
  }
  if (role === ROLE.FINDER) {
    const city = await City.findById(req.body.city);
    if (!city) {
      return next(new AppError('Invalid City', 400));
    }
    user.city = [city._id];
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
    return next(new AppError('Please provide username and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Object.findOne({ username }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
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

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
