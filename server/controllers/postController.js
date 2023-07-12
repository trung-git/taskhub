const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../utils/cloudinary');
const imageValidate = require('../utils/imageValidation');

const getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  return res.status(200).json({
    status: 'success',
    data: posts,
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
  let photo = undefined;
  if (req.files && req?.files?.photo) {
    const validateResult = imageValidate(req.files.photo);
    if (validateResult.error) {
      return next(new AppError(validateResult.error));
    }
    try {
      const uploadedFiles = [];
      for (let i = 0; i < req.files.photo.length; i++) {
        const file = req.files.photo[i];
        const result = await cloudinary.uploader.upload(file.tempFilePath, {folder: 'postImages'});
        uploadedFiles.push(result.url);
      }
      photo = uploadedFiles;
    } catch (error) {
      console.error(error);
      return next(new AppError('Failed to upload files.'));
    }
  }

  const newPost = await Post.create({
    user,
    text,
    photo,
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

  post.candidate.push({
    user: req.user._id,
    text: req.body.text,
  });

  const updatedPost = await post.save();
  return res.status(200).json({
    status: 'success',
    data: updatedPost,
  });
});

module.exports = { getPosts, getPostById, createPost, registerPostCandidate };
