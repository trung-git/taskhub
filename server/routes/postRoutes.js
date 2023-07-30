const express = require('express');
const {
  getPosts,
  createPost,
  getPostById,
  registerPostCandidate,
  unRegisterPostCandidate,
} = require('../controllers/postController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.use(protect);
router.route('/').get(getPosts).post(restrictTo('Finder'), createPost);

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

router.get('/:id', getPostById);

module.exports = router;
