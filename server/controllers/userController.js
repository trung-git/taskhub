const mongoose = require('mongoose');
const Tasker = require('../models/taskerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getObjectModel } = require('../utils');
const imageValidate = require('../utils/imageValidation');
const cloudinary = require('../utils/cloudinary');

exports.getTaskers = catchAsync(async (req, res, next) => {
  const taskTagId = req.query.taskTagId;
  const districtIds = req.query.districtIds.split(','); //id1,id2,id3
  const price = req.query.price ? req.query.price.split(',') : undefined; // 1,12
  const sortOption = Number(req.query.sortOption) || 1;
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);

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
          $eq: mongoose.Types.ObjectId.createFromHexString(taskTagId),
        },
      },
    },
    {
      $match: {
        workLocation: {
          $elemMatch: {
            $in: districtIds.map((v) =>
              mongoose.Types.ObjectId.createFromHexString(v)
            ),
          },
        },
      },
    },
  ];
  if (price) {
    aggregatePipeline.push({
      $match: {
        'taskInfo.price': {
          $gte: Number(price[0]),
          $lte: Number(price[1]),
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

  const tasker = await Tasker.aggregate([
    ...aggregatePipeline,
    {
      $skip: recordsPerPage * (pageNum - 1),
    },
    {
      $limit: recordsPerPage,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: tasker,
    recordsPerPage,
    pageNum,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const role = req.user.role;

  const user = await getObjectModel(role).findOne({ _id: id });

  if (!user) {
    return next(new AppError('User not found', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('This route is not for password updates', 400));
  }
  console.log(__dirname);
  const Object = getObjectModel(req.user.role);
  const user = await Object.findById(req.user._id);

  // Common info
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
  user.email = req.body.email || user.email;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
  user.gender = req.body.gender || user.gender;

  if (req.files && req?.files?.image) {
    const validateResult = imageValidate(req.files.image);
    if (validateResult.error) {
      return next(new AppError(validateResult.error));
    }
    try {
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: 'userAvatar',
      });
      user.image = result.url;
    } catch (error) {
      console.error(error);
      return next(new AppError('Failed to upload file.'));
    }
  }
  // Role base info
  if (user.role === 'Finder') {
    user.city = req.body.city || user.city;
  }
  if (user.role === 'Tasker') {
    user.workLocation = req.body.workLocation || user.workLocation;
    user.workTime = req.body.workTime || user.workTime;
    user.taskTag = req.body.taskTag || user.taskTag;
    user.profile.aboutMe = req.body.profile.aboutMe || user.profile.aboutMe;
    user.profile.skillAndExperience =
      req.body.profile.skillAndExperience || user.profile.skillAndExperience;
    user.profile.vehicle = req.body.profile.vehicle || user.profile.vehicle;
    if (req.files && req?.files?.photo) {
      const validateResult = imageValidate(req.files.photo);
      if (validateResult.error) {
        return next(new AppError(validateResult.error));
      }
      try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.photo.length; i++) {
          const file = req.files.photo[i];
          const result = await cloudinary.uploader.upload(file.tempFilePath, {folder: 'profileImages'});
          uploadedFiles.push(result.url);
        }
        user.profile.photo = uploadedFiles;
      } catch (error) {
        console.error(error);
        return next(new AppError('Failed to upload files.'));
      }
    }
  }

  const updatedUser = await user.save();

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});