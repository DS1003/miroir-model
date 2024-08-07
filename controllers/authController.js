const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinary');
const upload = require('../config/multer');

const nodemailer = require('nodemailer');exports.uploadAvatar = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update user's avatar URL
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ message: 'Avatar mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'avatar:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};


exports.register = async (req, res) => {
  const { nom , prenom, email, password, type } = req.body;

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Hachez le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créez un nouvel utilisateur
    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      type,
    });

    await newUser.save();

    // Créez un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ token, userId: newUser._id , message: 'Utilisateur enregisté' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(200).json({ token, userId: user._id , message: 'Connexion reussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur introuvable');
      return res.status(400).json({ message: 'Utilisateur introuvable' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: "zbcbrvjdwkqndagc" ,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Réinitialisation de mot de passe',
      text: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n
      Veuillez cliquer sur le lien suivant, ou copier-coller dans votre navigateur pour compléter le processus:\n\n
      http://${req.headers.host}/reset-password/${token}\n\n
      Si vous ne l'avez pas demandé, veuillez ignorer cet email et votre mot de passe restera inchangé.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Erreur lors de l\'envoi de l\'email:', err);
        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
      }
      console.log('Email de réinitialisation envoyé avec succès');
      res.status(200).json({ message: 'Email de réinitialisation envoyé avec succès' });
    });
  } catch (error) {
    console.error('Erreur du serveur:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token de réinitialisation invalide ou expiré' });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.uploadAvatar = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update user's avatar URL
    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ message: 'Avatar mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'avatar:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.createPost = async (req, res) => {
  const { userId, content } = req.body;
  const mediaUrls = req.files.map(file => file.path);

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
      media: mediaUrls
    });

    await newPost.save();

    res.status(201).json({ message: 'Publication créée avec succès', post: newPost });
  } catch (error) {
    console.error('Erreur lors de la création du post:', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
