const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatLineSchema = new Schema(
  {
    chat_id: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    line: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatLine', chatLineSchema);
