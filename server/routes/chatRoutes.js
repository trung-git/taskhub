const express = require('express');
const router = express.Router();
const chatController = require('./../controllers/chatController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/', chatController.getChats);
router.get('/:chatId', chatController.getChatById);

router.delete('/:chatId', chatController.deleteChat);

module.exports = router;
