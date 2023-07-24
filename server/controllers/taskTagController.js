const TaskTag = require('../models/taskTagModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getTaskTags = catchAsync(async (req, res, next) => {
  const taskTags = await TaskTag.find();

  res.status(200).json({
    status: 'success',
    data: taskTags,
  });
});
exports.getTaskTagById = catchAsync(async (req, res, next) => {
  const taskTag = await TaskTag.findById(req.params.taskTagId);

  if (!taskTag) {
    return next(new AppError('Invalid task tag', 400));
  }

  res.status(200).json({
    status: 'success',
    data: taskTag,
  });
});
exports.createTaskTag = catchAsync(async (req, res, next) => {
  const taskTag = {
    title: req.body.title,
    description: req.body.description,
    langKey: req.body.langKey,
    avgPrice: req.body.avgPrice,
    defaultPrice: req.body.defaultPrice,
    photo: req.body.photo,
  };

  const newTaskTag = await TaskTag.create(taskTag);

  res.status(200).json({
    status: 'success',
    data: newTaskTag,
  });
});
