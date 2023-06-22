const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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
    newUser.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1) Check if email and password exist
    if (!username || !password) {
      return res.status(400).json({
        error: 'Please provide email and password',
      });
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        error: 'Incorrect email or password',
      });
    }

    // 3) If everything ok, send token to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

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

    return res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true });
};
