const Post = require('../models/post');

exports.createPost = async (req, res) => {
const { user, content } = req.body;
  
  if (!user || !content) {
    return res.status(400).json({ message: 'User ID and content are required' });
  }
  try {
    const newPost = new Post({
      user: req.body.user,
      content: req.body.content,
      createdAt: Date.now(),
      lastupdatedAt: Date.now(),
      likes: 0,
      comments: [
        // {
        //   user: req.body.user,
        //   content: req.body.content,
        //   createdAt: Date.now(),
        //   lastupdatedAt: Date.now(),
        //   likes: 0
        // },
      ],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', error: err });
  }
};
