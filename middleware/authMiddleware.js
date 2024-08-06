// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Non autorisé, échec du jeton' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Non autorisé, pas de jeton' });
  }
};

export const client = (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Non autorisé en tant que client' });
  }
};

export const tailor = (req, res, next) => {
  if (req.user && req.user.role === 'tailor') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Non autorisé en tant que tailleur' });
  }
};
