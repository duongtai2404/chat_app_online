const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
