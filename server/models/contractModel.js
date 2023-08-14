const mongoose = require('mongoose');

const contractModel = new mongoose.Schema(
  {
    finder: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Finder can not empty!'],
    },
    tasker: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Tasker can not empty!'],
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
    },
    address: {
      type: String,
      required: [true, 'Address can not empty!'],
    },
    workLocation: {
      type: mongoose.Types.ObjectId,
      ref: 'District',
      required: [true, 'Work location can not empty!'],
    },
    taskTag: {
      type: mongoose.Types.ObjectId,
      ref: 'Task Tag',
      required: [true, 'Task tag can not empty!'],
    },
    price: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isStart: {
      type: Boolean,
      default: false,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    workTime: {
      type: {
        from: Date,
        to: Date,
      },
      required: [true, 'work Time can not empty!'],
    },
    expiredAt: {
      type: Date,
    },
    description: {
      type: String,
      required: [true, 'Description can not empty!'],
    },
    otherProps: [{ key: { type: String }, value: [{ type: String }] }],
  },
  { timestamps: true }
);

const Contract = mongoose.model('Contract', contractModel);
module.exports = Contract;
