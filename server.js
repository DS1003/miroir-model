<<<<<<< HEAD
import app from './config/app.js';
import authRoutes from './routes/authRoutes.js';
// Importer d'autres routes ici
=======
<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
>>>>>>> 4a122c6 (version auth avec réinitialisation)

app.use('/api/auth', authRoutes);
// Utiliser d'autres routes ici

<<<<<<< HEAD
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
// Middleware
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté'))
.catch(err => console.log(err));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
=======
import app from './config/app.js';
import authRoutes from './routes/authRoutes.js';
// Importer d'autres routes ici

app.use('/api/auth', authRoutes);
// Utiliser d'autres routes ici

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> 75d4480 (version auth avec réinitialisation)
>>>>>>> 4a122c6 (version auth avec réinitialisation)
