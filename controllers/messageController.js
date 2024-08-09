const mongoose = require('mongoose');
const Message = require('../models/message');
const Conversation = require('../models/conversation');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la recherche de tous les messages:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;

  try {
    const senderUser = await User.findById(sender);
    const recipientUser = await Conversation.findById(conversationId)
      .populate('members')
      .lean();
      
    const isBlocked = recipientUser.members.some(member => 
      member.blockedUsers.includes(senderUser._id)
    );

    if (isBlocked) {
      return res.status(403).json({ message: 'Vous avez été bloqué par cet utilisateur' });
    }

    const newMessage = new Message({ conversationId, sender, text });
    const savedMessage = await newMessage.save();

    res.status(201).json({ message: 'Message envoyé avec succès', savedMessage });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};


exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
