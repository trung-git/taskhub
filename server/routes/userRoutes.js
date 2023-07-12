const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const { registerPostCandidate } = require('../controllers/postController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/tasker', userController.getTaskers);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);
router.get('/me', userController.getMe);
router.post('/update-profile', userController.updateMe);
router.post('/update-password', authController.updatePassword);

router.patch(
  '/register-post-candidate/:postId',
  authController.restrictTo('Tasker'),
  registerPostCandidate
);
module.exports = router;
