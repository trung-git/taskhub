const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const TaskTag = require('../models/taskTagModel');
const District = require('../models/districtModel');
const City = require('../models/cityModel');

const { getObjectModel } = require('../utils');
const { ROLE } = require('../utils/constantVariables');
const Email = require('../utils/email');

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

  const emailToken = newUser.createVerifyEmailToken();
  const finalUser = await newUser.save();

  try {
    const URL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/user/verify-email/${emailToken}`;

    await new Email(finalUser, URL).sendWelcome();
  } catch (error) {
    finalUser.verifyEmailToken = undefined;
    finalUser.verifyEmailExpired = undefined;
    await finalUser.save();
    return next(new AppError('Send email fail! Please try again.', 500));
  }
  createAndSendToken(finalUser, 201, req, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  //Get token
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    verifyEmailToken: hashToken,
    verifyEmailExpired: { $gt: Date.now() },
  });
  //If not expired and there is user => set password
  if (!user)  return next(new AppError('Token is invalid or expired', 400));

  user.isVerified = true;
  user.verifyEmailToken = undefined;
  user.verifyEmailExpired = undefined;

  await user.save();
  res.status(200).json({
    status: 'success',
  });
});

exports.generateVerifyEmailToken = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const emailToken = user.createVerifyEmailToken();
  await user.save();

  try {
    const URL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/user/verify-email/${emailToken}`;

    await new Email(user, URL).sendWelcome();
  } catch (error) {
    user.verifyEmailToken = undefined;
    user.verifyEmailExpired = undefined;
    await user.save();
    return next(new AppError('Send email fail! Please try again.', 500));
  }
  await user.save();
  res.status(200).json({
    status: 'success',
    message: 'Token send to email',
  });
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
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  //check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }
  //If so, update the password
  user.password = req.body.password;
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();

  //Log user in , send JWT token
  createAndSendToken(user, 200, req, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //Get user by posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(`Not found user with ${req.body.email} email address `, 404)
    );
  }

  const resetToken = user.createPasswordResetToken();

  await user.save();

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/user/reset-password/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token send to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;
    await user.save();
    return next(new AppError('Send email fail! Please try again.', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //Get token
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpired: { $gt: Date.now() },
  });
  //If not expired and there is user => set password
  if (!user)  return next(new AppError('Token is invalid or expired', 400));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;

  //Update changePasswordAt property
  user.passwordChangedAt = Date.now() - 1000;
  await user.save();
  //Log the user in, set JWT
  createAndSendToken(user, 200, req, res);
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['Finder', 'Tasker']. role='Finder'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};