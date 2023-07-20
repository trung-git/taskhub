const express = require('express');
const router = express.Router();
const chatController = require('./../controllers/chatController');
const { protect } = require('../controllers/authController');

router.use(protect);

router.get('/', chatController.getChats);
router.get('/achieved', chatController.getAchievedChats);
router.get('/:chatId', chatController.getChatById);

router.post('/send', chatController.sendMessage);
router.post('/achieve', chatController.achieveChat);

router.get('/:chatId/messages', chatController.getMessages);

module.exports = router;
