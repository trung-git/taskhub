const express = require('express');
const {
  getPosts,
  createPost,
  getPostById,
} = require('../controllers/postController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.route('/')
  .get(getPosts)
  .post(restrictTo('Finder'),createPost);

router.get('/:id', getPostById);

module.exports = router;
