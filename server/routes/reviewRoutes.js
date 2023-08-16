const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.use(authController.protect);
router.post(
  '/:taskerId',
  authController.restrictTo('Finder'),
  reviewController.reviewTasker
);

module.exports = router;
