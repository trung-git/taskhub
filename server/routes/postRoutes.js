const express = require('express');
const {
  getPosts,
  createPost,
  getPostById,
  registerPostCandidate,
  unRegisterPostCandidate,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();
router.use(protect);

router.route('/').get(getPosts).post(restrictTo('Finder'), createPost);
router.get('/:id', getPostById);
router.patch('/:id', restrictTo('Finder'), updatePost);
router.delete('/:id', restrictTo('Finder'), deletePost);

router.patch(
  '/register-candidate/:postId',
  restrictTo('Tasker'),
  registerPostCandidate
);
router.patch(
  '/unregister-candidate/:postId',
  restrictTo('Tasker'),
  unRegisterPostCandidate
);

module.exports = router;
