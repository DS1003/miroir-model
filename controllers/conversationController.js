const Conversation = require('../models/conversation');

exports.createConversation = async (req, res) => {
  const { members, isGroup, groupName } = req.body;

  try {
    const newConversation = new Conversation({
      members,
      isGroup,
      groupName
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: { $in: [req.user.id] } });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
};