const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user1_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  user2_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Chat', chatSchema);
