const mongoose = require('mongoose');
const Post = require('../models/postModel');
const TaskTag = require('../models/taskTagModel');
const District = require('../models/districtModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');

const moment = require('moment');
const imageValidate = require('../utils/imageValidation');

const getPosts = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);
  const sortOption = Number(req.query.sortOption) || 2;
  // Filter params
  const taskTagIds = req.query.taskTagIds ? req.query.taskTagIds.split(',') : undefined;
  const districtIds = req.query.districtIds ? req.query.districtIds.split(',') : undefined;
  const cityIds = req.query.cityIds ? req.query.cityIds.split(',') : undefined;
  const workDay = req.query.workDay;
  // Aggregation pipeline
  const aggregatePipeline = [
    {
      $lookup: {
        from: 'task tags',
        localField: 'taskTag',
        foreignField: '_id',
        as: 'taskInfo',
      },
    },
    {
      $addFields: {
        taskTag: { $arrayElemAt: ['$taskInfo', 0] },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $addFields: {
        user: { $arrayElemAt: ['$userInfo', 0] },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'candidate.user',
        foreignField: '_id',
        as: 'candidateInfo',
      },
    },
    {
      $lookup: {
        from: 'districts',
        localField: 'workLocation',
        foreignField: '_id',
        as: 'workLocationInfo',
      },
    },
    {
      $addFields: {
        workLocation: { $arrayElemAt: ['$workLocationInfo', 0] },
      },
    },
    {
      $lookup: {
        from: 'cities',
        localField: 'workLocation.city',
        foreignField: '_id',
        as: 'cityInfo',
      },
    },
    {
      $addFields: {
        cityInfo: { $arrayElemAt: ['$cityInfo', 0] },
      },
    },
    {
      $addFields: {
        candidateCount: { $size: '$candidate' },
      }
    },
    {
      $project: {
        taskInfo: 0,
        userInfo: 0,
        'user.password': 0,
        'candidateInfo.password': 0,
        workLocationInfo: 0
      }
    },
    {
      $match: {
        'user._id': req.user._id,
      }
    }
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
  const paginationPipeline = [
    {
      $skip: recordsPerPage * (pageNum - 1),
    },
    {
      $limit: recordsPerPage,
    },
  ];
  // Filter
  if (taskTagIds) {
    aggregatePipeline.push({
      $match: {
        'taskTag._id': {
          
            $in: taskTagIds.map((v) =>
              mongoose.Types.ObjectId.createFromHexString(v)
            ),
          
        },
      },
    });
  }
  if (districtIds) {
    aggregatePipeline.push({
      $match: {
        'workLocation._id': {
            $in: districtIds.map((v) =>
              mongoose.Types.ObjectId.createFromHexString(v)
            ),
        },
      },
    });
  }
  if (cityIds) {
    aggregatePipeline.push({
      $match: {
        'cityInfo._id': {
            $in: cityIds.map((v) =>
              mongoose.Types.ObjectId.createFromHexString(v)
            ),
        },
      },
    });
  }
  if (workDay) {
    aggregatePipeline.push({
      $match: {
        'workTime.from': {
          $gte: moment(workDay).startOf('day').toDate(),
          $lt: moment(workDay).endOf('day').toDate(),
        },
      },
    });
  }
  // Sort
  // 1 createAt ASC
  // 2 createAt DESC
  // 3 updateAt ASC
  // 4 updateAt DESC
  // 5 wordDay ASC
  // 6 wordDay DESC
  // 7 candidate count ASC
  // 8 candidate count DESC
  switch (sortOption) {
    case 1:
      aggregatePipeline.push({ $sort: { createdAt: 1 } });
      break;
    case 2:
      aggregatePipeline.push({ $sort: { createdAt: -1 } });
      break;
    case 3:
      aggregatePipeline.push({ $sort: { updatedAt: -1 } });
      break;
    case 4:
      aggregatePipeline.push({ $sort: { updatedAt: -1 } });
      break;
    case 5:
      aggregatePipeline.push({ $sort: { 'workTime.from': 1 } });
      break;
    case 6:
      aggregatePipeline.push({ $sort: { 'workTime.from': -1 } });
      break;
    case 7:
      aggregatePipeline.push({ $sort: { candidateCount: 1 } });
      break;
    case 8:
      aggregatePipeline.push({ $sort: { candidateCount: -1 } });
      break;
    default:
      break;
  }

  const posts = await Post.aggregate([
    ...aggregatePipeline,
    ...paginationPipeline,
  ]);
  const count = await Post.aggregate([
    ...aggregatePipeline,
    ...countPipeline,
  ]);
  const totalPage =
    count.length === 0 ? 1 : Math.ceil(count[0].totalRecord / recordsPerPage);

  return res.status(200).json({
    status: 'success',
    data: posts,
    recordsPerPage,
    pageNum,
    totalPage,
    totalRecords: count[0]?.totalRecord || 0
  });
});
const getAppliedPosts = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);

  const findCondition = { candidate : {$elemMatch: { 'user': req.user._id} }};
  const posts = await Post.find( findCondition )
    .skip(recordsPerPage * (pageNum - 1))
    .limit(recordsPerPage);
  const count = await Post.countDocuments(findCondition);

  return res.status(200).json({
    status: 'success',
    data: posts,
    recordsPerPage,
    totalPage: Math.ceil(count / recordsPerPage),
    pageNum,
    totalRecords: count
  });
})
const getPostsRelatedToTask = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);

  const taskTagArr = req.user.taskTag.map(v => v.taskInfo);
  const findCondition = { taskTag : {$in: taskTagArr }, closeRegisterAt: {$gt: Date.now()}};
  
  const posts = await Post.find( findCondition )
    .skip(recordsPerPage * (pageNum - 1))
    .limit(recordsPerPage)
    .sort({ createdAt: 'desc' });
  const count = await Post.countDocuments(findCondition);

  return res.status(200).json({
    status: 'success',
    data: posts,
    recordsPerPage,
    totalPage: Math.ceil(count / recordsPerPage),
    pageNum,
    totalRecords: count
  });
})
const getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found'));
  }

  return res.status(200).json({
    status: 'success',
    data: post,
  });
});
const createPost = catchAsync(async (req, res, next) => {
  const user = req.user._id;
  const { text, address, workLocationId, closeRegisterAt, paymentPlan } = req.body;
  const workTime = JSON.parse(req.body.workTime);

  const taskTag = await TaskTag.findById(req.body.taskTag);
  if (!taskTag) {
    return next(new AppError('Invalid Task tag'));
  }

  const workLocation = await District.findById(workLocationId);
  if (!workLocation) {
    return next(new AppError('Work Location not found', 400));
  }

  let photos = undefined;
  if (req.files && req?.files?.photos) {
    const validateResult = imageValidate(req.files.photos);
    if (validateResult.error) {
      return next(new AppError(validateResult.error));
    }
    try {
      const uploadedFiles = [];
      const photoArr = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];
      for (let i = 0; i < photoArr.length; i++) {
        const file = photoArr[i];
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'postImages',
        });
        uploadedFiles.push(result.url);
      }
      photos = uploadedFiles;
    } catch (error) {
      console.error(error);
      return next(new AppError('Failed to upload files.'));
    }
  }

  const newPost = await Post.create({
    user,
    text,
    photos,
    taskTag: taskTag._id,
    address,
    workLocation: workLocation._id,
    workTime,
    closeRegisterAt,
    paymentPlan
  });

  return res.status(200).json({
    status: 'success',
    data: newPost,
  });
});

const registerPostCandidate = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError('Post not found'));
  }
  const candidate = post.candidate.filter((v) => {
    return String(v.user._id) !== String(req.user._id);
  });
  candidate.push({
    user: req.user._id,
    text: req.body.text,
    price: req.body.price,
  });

  post.candidate = candidate;

  const updatedPost = await post.save();
  const finalPost = await updatedPost.populate('candidate.user', '-password');

  return res.status(200).json({
    status: 'success',
    data: finalPost,
  });
});

const unRegisterPostCandidate = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(new AppError('Post not found'));
  }
  post.candidate = post.candidate.filter((v) => {
    return String(v.user._id) !== String(req.user._id);
  });

  const updatedPost = await post.save();
  return res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError('Post not found'));
  }

  if (req.body.taskTagId) {
    const taskTag = await TaskTag.findById(req.body.taskTagId);
    if (!taskTag) {
      return next(new AppError('Task Tag not found'));
    }
  }

  if (req.body.workLocationId) {
    const workLocation = await TaskTag.findById(req.body.workLocationId);
    if (!workLocation) {
      return next(new AppError('Work location not found'));
    }
  }

  let photos = undefined;
  if (req.files && req?.files?.photos) {
    const validateResult = imageValidate(req.files.photos);
    if (validateResult.error) {
      return next(new AppError(validateResult.error));
    }
    try {
      const uploadedFiles = [];
      const photoArr = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];

      for (let i = 0; i < photoArr.length; i++) {
        const file = photoArr[i];
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'postImages',
        });
        uploadedFiles.push(result.url);
      }
      photos = uploadedFiles;
    } catch (error) {
      console.error(error);
      return next(new AppError('Failed to upload files.'));
    }
  }
  const photoLinkArr = JSON.parse(req.body.photos);
  if (!photos && photoLinkArr) {
    const deletedPhotos = post.photos.filter(v => !photoLinkArr.includes(v));
    if (deletedPhotos.length > 0) { 
      try {
        deletedPhotos.forEach(async v => {
          await cloudinary.uploader.destroy(v);
        })
      } catch (error) {
        console.error(error);
        return next(new AppError('Failed to delete files.'));
      }
    }
    post.photos = photoLinkArr;
  } else if (photos && photoLinkArr) {
    post.photos = [...(post.photos.length === 0 ? [] : post.photos), ...photos];
  }

  post.text = req.body.text || post.text;
  post.address = req.body.address || post.address;
  post.taskTag = req.body.taskTagId || post.taskTag;
  post.workLocation = req.body.workLocationId || post.workLocation;
  post.workTime = req.body.workTime ? JSON.parse(req.body.workTime)  : post.workTime;
  post.closeRegisterAt = req.body.closeRegisterAt || post.closeRegisterAt;
  post.paymentPlan = req.body.paymentPlan || post.paymentPlan;
  
  const updatedPost = await post.save();
  return res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndRemove({ _id: req.params.id });

  if (!post) {
    return next(new AppError('Post not found'));
  }

  return res.status(200).json({
    status: 'success',
    data: post,
  });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  registerPostCandidate,
  unRegisterPostCandidate,
  getAppliedPosts,
  getPostsRelatedToTask
};
