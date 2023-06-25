const mongoose = require('mongoose');

const taskTagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title can not empty!'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Task title can not empty!'],
    },
    langKey: {
      type: String,
    },
    avgPrice: {
      type: [Number],
      required: [true, 'Average price can not empty!'],
      validate: {
        validator: function (array) {
          return array.length === 2;
        },
        message: (props) => `Average Price must be an array of 2 number!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const TaskTag = mongoose.model('Task Tag', taskTagSchema);
module.exports = TaskTag;
