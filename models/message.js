
const mongoose = require('mongoose');

// models/Message.js

const messageSchema = new mongoose.Schema({
  conversationId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'
     },
  sender: {
     type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
  text: {
     type: String, required: true 
    }
    

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
