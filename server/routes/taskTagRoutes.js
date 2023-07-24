const express = require('express');
const router = express.Router();
const taskTagController = require('./../controllers/taskTagController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(taskTagController.getTaskTags)
  .post(protect, taskTagController.createTaskTag);

router.get('/:taskTagId', taskTagController.getTaskTagById);

module.exports = router;
