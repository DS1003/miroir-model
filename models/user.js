const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: null },
  type: { type: String, enum: ['Tailleur', 'visiteur'], default: 'visiteur' },
  resetPasswordToken: { type: String , default: null },
  resetPasswordExpires: { type: Date, default: Date.now },
  blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  
  // Ajoutez d'autres champs si nécessaire
});

const User = mongoose.model('User', userSchema);
module.exports = User;
