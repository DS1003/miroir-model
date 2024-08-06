import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

class AuthController {
  static async register(req, res) {
    const { firstName, lastName, email, password, gender, phone, role } = req.body;
    try {
      const user = new User({ firstName, lastName, email, password, gender, phone, role });
      await user.save();
      const token = user.getSignedJwtToken();
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Email ou mot de passe invalide' });
      }
      const token = user.getSignedJwtToken();
      res.json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "L'email n'a pas pu être envoyé" });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

      await user.save();

      const resetUrl = `http://localhost:3000/api/auth/resetpassword/${resetToken}`;

      const message = `
        <h1>Vous avez demandé une réinitialisation de mot de passe</h1>
        <p>Veuillez suivre ce lien pour réinitialiser votre mot de passe</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: 'Demande de réinitialisation de mot de passe',
          text: message,
        });

        res.status(200).json({ success: true, data: 'Email envoyé' });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(500).json({ success: false, message: "L'email n'a pas pu être envoyé" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
  }

  static async resetPassword(req, res) {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ success: false, message: 'Jeton invalide' });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      const token = user.getSignedJwtToken();

      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur serveur', error });
    }
  }
}

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez 'gmail' comme service
    auth: {
      user: process.env.EMAIL_USER,
      pass: "zssaamwobxqznise",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await transporter.sendMail(mailOptions);
};


export default AuthController;
