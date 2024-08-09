
const mongoose = require('mongoose');


// models/Conversation.js
const conversationSchema = new mongoose.Schema({
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
],
  isGroup: { 
    type: Boolean, default: false
 },
  groupName: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
