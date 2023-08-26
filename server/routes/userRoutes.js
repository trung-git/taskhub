const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-login', authController.resetLogin);
router.get('/logout', authController.logout);

router.get('/tasker', userController.getTaskers);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);
router.get('/me', userController.getMe);
router.post('/update-profile', userController.updateMe);
router.post('/update-password', authController.updatePassword);
router.post('/verify-email/', authController.verifyEmail);
router.post(
  '/generate-verify-email-token',
  authController.generateVerifyEmailToken
);


module.exports = router;
