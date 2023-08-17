const connectDB = require('../config/db');
connectDB();

const Finder = require('../models/finderModel');
const Tasker = require('../models/taskerModel');
const TaskTag = require('../models/taskTagModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const City = require('../models/cityModel');
const District = require('../models/districtModel');
const Post = require('../models/postModel');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const Wallet = require('../models/walletModel');

const taskTagData = require('./taskTag');
const finderData = require('./finder');
const reviewData = require('./review');
const taskerData = require('./tasker');
const areaData = require('./area');
const postData = require('./post');
const walletData = require('./wallet');
const { messages: messageData, chats: chatData } = require('./chat');

const importData = async () => {
  try {
    await User.collection.deleteMany({});
    await Wallet.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await TaskTag.collection.deleteMany({});
    await Review.collection.deleteMany({});
    await City.collection.deleteMany({});
    await District.collection.deleteMany({});
    await Post.collection.deleteMany({});
    await Message.collection.deleteMany({});
    await Chat.collection.deleteMany({});

    if (process.argv[2] !== '-d') {
      await Wallet.insertMany(walletData);
      await TaskTag.insertMany(taskTagData);
      await City.insertMany(areaData.cities);
      await District.insertMany(areaData.districts);
      await Finder.insertMany(finderData);
      await Review.insertMany(reviewData);
      await Tasker.insertMany(taskerData);
      await Post.insertMany(postData);
      await Message.insertMany(messageData);
      await Chat.insertMany(chatData);

      console.log('Seeder data imported successfully');
      process.exit();
      return;
    }
    console.log('Seeder data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error while processing seeder data', error);
    process.exit(1);
  }
};

importData();
