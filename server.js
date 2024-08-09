const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connecté avec succès'))
  .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

const conversationRoutes = require('./routes/conversationRoutes');
app.use('/api/conversations', conversationRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);



app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
