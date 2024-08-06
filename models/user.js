const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['Tailleur', 'visiteur'], default: 'visiteur' }
  
  // Ajoutez d'autres champs si nécessaire
});

const User = mongoose.model('User', userSchema);
module.exports = User;
