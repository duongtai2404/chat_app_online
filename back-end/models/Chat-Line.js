const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatLineSchema = new Schema(
  {
    chat_id: {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    },
    user_Id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatLine', chatLineSchema);
