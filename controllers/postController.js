const Post = require('../models/post');
const User = require('../models/user');


exports.createPost = async (req, res) => {
    const { userId, content } = req.body;
    const mediaUrls = req.files ? req.files.map(file => file.path) : []; // Utilisez l'URL ou le chemin selon votre configuration
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      if (user.type !== 'Tailleur') {
        return res.status(403).json({ message: 'Seuls les Tailleurs peuvent publier' });
      }
  
      const newPost = new Post({
        user: userId,
        content,
        media: mediaUrls // Enregistrez les URL des fichiers
      });
  
      await newPost.save();
  
      res.status(201).json({ message: 'Publication créée avec succès', post: newPost });
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  };
  
  
  
exports.updatePost = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    post.content = content;
    post.lastupdatedAt = Date.now();
    await post.save();

    res.status(200).json({ message: 'Post mis à jour avec succès', post });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }

}

exports.deletePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Accès interdit' }); 
    }

    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du post:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};



exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'nom prenom email');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.addComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const comment = {
      user: userId,
      content,
      createdAt: Date.now(),
      lastupdatedAt: Date.now(),
      likes: 0,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Commentaire ajouté avec succès', post });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
exports.updateComment = async (req, res) => {
  const { postId, commentId, userId, content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    comment.content = content;
    comment.lastupdatedAt = Date.now();
    await post.save();

    res.status(200).json({ message: 'Commentaire mis à jour avec succès', post });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
}

exports.deleteComment = async (req, res) => {
    const { postId, commentId, userId } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      const comment = post.comments.id(commentId);
  
      if (!comment) {
        return res.status(404).json({ message: 'Commentaire non trouvé' });
      }
  
      if (comment.user.toString() !== userId) {
        return res.status(403).json({ message: 'Accès interdit' });
      }
  
      // Utilisez `pull` pour retirer le commentaire du tableau des commentaires
      post.comments.pull(commentId);
      await post.save();
  
      res.status(200).json({ message: 'Commentaire supprimé avec succès', post });
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  };
  
exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    post.likes += 1;

    await post.save();

    res.status(200).json({ message: 'Post liké avec succès', post });
  } catch (error) {
    console.error('Erreur lors du like du post:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }

}

exports.unlikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    post.likes -= 1;

    await post.save();

    res.status(200).json({ message: 'Post non liké avec succès', post });
  } catch (error) {
    console.error('Erreur lors du non like du post:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }

}

exports.likeComment = async (req, res) => {
  const { postId, commentId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    
  

    comment.likes += 1;


    await post.save();

    res.status(200).json({ message: 'Commentaire liké avec succès', post });
  } catch (error) {
    console.error('Erreur lors du like du commentaire:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
}
exports.unlikeComment = async (req, res) => {
  const { postId, commentId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

   
    comment.likes -= 1;

    await post.save();

    res.status(200).json({ message: 'Commentaire Unlike avec succès', post });
  } catch (error) {
    console.error('Erreur lors du Unlike du commentaire:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
}

exports.sharePost = async (req, res) => {
    const { userId, postId, content } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

  
      const originalPost = await Post.findById(postId);
  
      if (!originalPost) {
        return res.status(404).json({ message: 'Publication originale non trouvée' });
      }
  
      const newPost = new Post({
        user: userId,
        content: content || originalPost.content,
        sharedFrom: postId
      });
  
      await newPost.save();
  
      res.status(201).json({ message: 'Publication partagée avec succès', post: newPost });
    } catch (error) {
      console.error('Erreur lors du partage de la publication:', error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  };