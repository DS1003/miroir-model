const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom , prenom, email, password } = req.body;

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
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Créez un token JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
