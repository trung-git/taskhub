const mongoose = require('mongoose');
const Tasker = require('../models/taskerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getObjectModel } = require('../utils');
const imageValidate = require('../utils/imageValidation');
const cloudinary = require('../utils/cloudinary');
const Contract = require('../models/contractModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

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
        aboutMe: 1,
        skillAndExperience: 1,
        photos: 1,
        vehicle: 1,
        contracts: 1,
        averageRating: 1,
        unavailableTime: 1,
        isVerified: 1,
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
  const paginationPipeline = [
    {
      $skip: recordsPerPage * (pageNum - 1),
    },
    {
      $limit: recordsPerPage,
    },
  ];
  const countPipeline = [
    {
      $group: {
        _id: null,
        totalRecord: { $sum: 1 },
      },
    },
    {
      $project: {
        totalRecord: 1,
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
        $sort: { averageRating: -1, 'taskInfo.price': 1 },
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
    ...paginationPipeline,
  ]);

  const count = await Tasker.aggregate([
    ...aggregatePipeline,
    ...countPipeline,
  ]);
  const totalPage =
    count.length === 0 ? 1 : Math.ceil(count[0].totalRecord / recordsPerPage);

  res.status(200).json({
    status: 'success',
    data: tasker,
    recordsPerPage,
    pageNum,
    totalPage,
    totalRecords: count[0]?.totalRecord || 0
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const role = req.user.role;

  const user = await getObjectModel(role).findOne({ _id: id });

  if (!user) {
    return next(new AppError('User not found', 400));
  }
  const contractCount = await Contract.countDocuments({$or: [{finder: user._id}, {tasker: user._id}]});
  const postCount = await Post.countDocuments({user: user._id});

  res.status(200).json({
    status: 'success',
    data: {
      user: {...user._doc, contractCount, postCount},
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError('This route is not for password updates', 400));
  }
  const Object = getObjectModel(req.user.role);
  const user = await Object.findById(req.user._id);

  // Common info
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
  user.email = req.body.email || user.email;
  user.phoneNumber = req.body.phoneNumber ?? user.phoneNumber;
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
    user.taskTag = req.body.taskTag || user.taskTag;
    user.aboutMe = req.body.aboutMe || user.aboutMe;
    user.skillAndExperience =
      req.body.skillAndExperience || user.skillAndExperience;
    user.vehicle = req.body.vehicle || user.vehicle;
    user.unavailableTime = req.body.unavailableTime || user.unavailableTime;
    if (req.files && req?.files?.photos) {
      const validateResult = imageValidate(req.files.photos);
      if (validateResult.error) {
        return next(new AppError(validateResult.error));
      }
      try {
        const uploadedFiles = [];
        for (let i = 0; i < req.files.photos.length; i++) {
          const file = req.files.photos[i];
          const result = await cloudinary.uploader.upload(file.tempFilePath, {folder: 'profileImages'});
          uploadedFiles.push(result.url);
        }
        user.photos = uploadedFiles;
      } catch (error) {
        console.error(error);
        return next(new AppError('Failed to upload files.'));
      }
    }
  }

  const updatedUser = await user.save();

  const contractCount = await Contract.countDocuments({$or: [{finder: updatedUser._id}, {tasker: updatedUser._id}]});
  const postCount = await Post.countDocuments({user: updatedUser._id});

  res.status(200).json({
    status: 'success',
    data: {
      updatedUser: {
        ...updatedUser._doc,
        contractCount,
        postCount
      },
    },
  });
});

exports.updateUnavailableTime = catchAsync(async (req, res, next) => {
  const { method, contractId } = req.body;

  const contract = await Contract.findOne({_id: contractId, tasker: req.user._id});
  if (!contract) {
    return next(new AppError('Invalid contract', 400));
  }

  const user = await Tasker.find(req.user._id);
  const unavailableTime = [...user.unavailableTime];
  if (method === 'add') {
    user.unavailableTime = unavailableTime.push(contract.workTime);
  }
  else if (method === 'remove') {
    user.unavailableTime = unavailableTime.filter(v => String(v._id) !== String(contract.workTime._id));
  }

  const savedUser = await user.save();
  res.status(200).json({
    status: 'success',
    data: savedUser
  });
})