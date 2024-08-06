const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  const { userId, content } = req.body;

  try {
    // Trouver l'utilisateur par ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le type de l'utilisateur est "Tailleur"
    if (user.type !== 'Tailleur') {
      return res.status(403).json({ message: 'Seuls les Tailleurs peuvent publier' });
    }

    // Créer une nouvelle publication
    const newPost = new Post({
      user: userId,
      content,
    });

    await newPost.save();

    res.status(201).json({ message: 'Publication créée avec succès', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'nom prenom email');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
