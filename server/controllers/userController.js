const mongoose = require('mongoose');
const Tasker = require('../models/taskerModel');
const catchAsync = require('../utils/catchAsync');

exports.getTasker = catchAsync(async (req, res, next) => {
  const aggregatePipeline = [
    {
      $lookup: {
        from: 'task tags', // Tên của collection "Task Tag"
        localField: 'taskTag.taskInfo',
        foreignField: '_id',
        as: 'taskInfo',
      },
    },
    {
      $unwind: '$taskInfo',
    },
    {
      $addFields: {
        'taskInfo.price': {
          $arrayElemAt: [
            {
              $filter: {
                input: '$taskTag',
                as: 'task',
                cond: { $eq: ['$$task.taskInfo', '$taskInfo._id'] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        username: 1,
        firstName: 1,
        lastName: 1,
        dateOfBirth: 1,
        email: 1,
        phoneNumber: 1,
        gender: 1,
        image: 1,
        city: 1,
        workLocation: 1,
        workTime: 1,
        profile: 1,
        contracts: 1,
        averageRating: 1,
        taskInfo: {
          _id: '$taskInfo._id',
          title: '$taskInfo.title',
          description: '$taskInfo.description',
          langKey: '$taskInfo.langKey',
          avgPrice: '$taskInfo.avgPrice',
          defaultPrice: '$taskInfo.defaultPrice',
          photo: '$taskInfo.photo',
          price: '$taskInfo.price.price',
        },
      },
    },
    {
      $match: {
        'taskInfo._id': {
          $eq: mongoose.Types.ObjectId.createFromHexString(req.body.taskTagId),
        },
      },
    },
    {
      $match: {
        workLocation: {
          $elemMatch: {
            $in: req.body.districtIds.map((v) =>
              mongoose.Types.ObjectId.createFromHexString(v)
            ),
          },
        },
      },
    },
  ];
  if (req.body.price) {
    aggregatePipeline.push({
      $match: {
        'taskInfo.price': {
          $gte: req.body.price.from,
          $lte: req.body.price.to,
        },
      },
    });
  }
  // Sort by price, average rating, tasks complete
  // 1 Recommended
  // 2 Price low to high
  // 3 Price high to low
  // 4 High rating
  // 5 Number of complete Task
  const sortOption = req.body.sortOption || 1;
  switch (sortOption) {
    case 1:
      aggregatePipeline.push({
        $sort: { 'taskInfo.price': 1, averageRating: -1 },
      });
      break;
    case 2:
      aggregatePipeline.push({ $sort: { 'taskInfo.price': 1 } });
      break;
    case 3:
      aggregatePipeline.push({ $sort: { 'taskInfo.price': -1 } });
      break;
    case 4:
      aggregatePipeline.push({ $sort: { averageRating: -1 } });
      break;
    default:
      break;
  }
  const recordsPerPage = process.env.RECORDS_PER_PAGE;
  const pageNum = req.body.pageNum || 1;

  const tasker = await Tasker.aggregate([
    ...aggregatePipeline,
    {
      $skip: Number(recordsPerPage) * (pageNum - 1),
    },
    {
      $limit: Number(recordsPerPage),
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: tasker,
    recordsPerPage,
    pageNum,
  });
});
