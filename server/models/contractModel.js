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
    status: {
      type: String,
      enum: {
        values: ["invitation", "discuss", "start", "end", "finish"]
      },
      default: "invitation"
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    workTime: {
      type: {
        from: Date,
        to: Date,
      },
      required: [true, 'work Time can not empty!'],
    },
    expireAt: {
      type: Date,
      expires: 0
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
