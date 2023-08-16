const Contract = require('../models/contractModel');
const Review = require('../models/reviewModel');
const TaskTag = require('../models/taskTagModel');
const Tasker = require('../models/taskerModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.reviewTasker = catchAsync(async (req, res, next) => {
  const { taskerId } = req.params;
  const { rating, review, taskTagId, contractId } = req.body;
  const { _id: finderId } = req.user;

  const tasker = await Tasker.findById(taskerId);
  if (!tasker) {
    return next(new AppError('Tasker not found', 400));
  }

  const contract = await Contract.findById(contractId);
  if (!contract) {
    return next(new AppError('Contract not found', 400));
  }

  const taskTag = await TaskTag.findById(taskTagId);
  if (!taskTag) {
    return next(new AppError('Task Tag not found', 400));
  }

  if (
    !(
      String(contract.finder) === String(finderId) &&
      String(contract.tasker) === taskerId &&
      String(contract.taskTag) === taskTagId
    )
  ) {
    return next(new AppError('Invalid contract', 400));
  }

  const newReview = await Review.create({
    rating,
    review,
    taskTag: taskTag._id,
    user: String(finderId),
  });

  contract.review = newReview._id;
  await contract.save();

  res.status(200).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});
