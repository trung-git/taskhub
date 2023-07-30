const Post = require('../models/postModel');
const TaskTag = require('../models/taskTagModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const imageValidate = require('../utils/imageValidation');

const getPosts = catchAsync(async (req, res, next) => {
  const pageNum = Number(req.query.pageNum) || 1;
  const recordsPerPage = Number(process.env.RECORDS_PER_PAGE);

  let findCondition =
    req.user.role === 'Finder'
      ? { user: req.user._id }
      : {
          taskTag: {
            $in: req.user.taskTag.map((v) => {
              return v.taskInfo;
            }),
          },
        };

  const posts = await Post.find(findCondition)
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
});
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
  const text = req.body.text;

  const taskTag = await TaskTag.findById(req.body.taskTag);
  if (!taskTag) {
    return next(new AppError('Invalid Task tag'));
  }

  let photos = undefined;
  if (req.files && req?.files?.photos) {
    const validateResult = imageValidate(req.files.photos);
    if (validateResult.error) {
      return next(new AppError(validateResult.error));
    }
    try {
      const uploadedFiles = [];
      for (let i = 0; i < req.files.photos.length; i++) {
        const file = req.files.photos[i];
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
  const finalPost = await updatedPost.populate('candidate.user','-password');
  
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

module.exports = {
  getPosts,
  getPostById,
  createPost,
  registerPostCandidate,
  unRegisterPostCandidate,
};
