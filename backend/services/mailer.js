// backend/services/mailer.js
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
require('dotenv').config();

// Fonction générique pour envoyer un email (inspirée de ton exemple)
const sendEmail = asyncHandler(async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER ? process.env.EMAIL_USER.trim().replace(/^["']+|["']+$/g, '') : '',        
      pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim().replace(/^["']+|["']+$/g, '').replace(/\s/g, "") : '',
    },
  });

  const info = await transporter.sendMail({
    from: `"Coach Wellness Sports" <${process.env.EMAIL_USER}>`, 
    to: data.to,
    replyTo: process.env.CLIENT_EMAIL, // Les réponses iront sur teamonecws@gmail.com
    subject: data.subject,
    text: data.text || "",   
    html: data.html || "",   
  });

  console.log("✅ Email CWS envoyé ! Message ID:", info.messageId);
  return info;
});

// Fonction spécifique pour l'OTP avec le design Premium CWS
const sendOtpEmail = async (toEmail, firstName, otp) => {
  const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #121212; color: #f5f5f5; padding: 40px 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #e0d5c1; font-size: 32px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">CWS</h1>
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Coach Wellness Sports</p>
      </div>
      
      <h2 style="color: #ffffff; font-weight: 300;">Bienvenue ${firstName || ''},</h2>
      <p style="line-height: 1.6; color: #cccccc;">Merci pour votre intérêt envers notre salle. Veuillez utiliser le code ci-dessous pour sécuriser et valider votre demande :</p>
      
      <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; background-color: #2a2a2a; padding: 20px; text-align: center; border-radius: 5px; margin: 30px 0; color: #e0d5c1; border: 1px solid #333;">
        ${otp}
      </div>
      
      <p style="font-size: 13px; color: #888;">Ce code est valable pendant ${process.env.OTP_EXPIRY_MINUTES} minutes. Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; font-size: 12px; color: #666;">
        <p>20, Rue Marie de Lorraine, 37700 La Ville-aux-Dames</p>
      </div>
    </div>
  `;

  // On appelle la fonction générique avec les données spécifiques
  return await sendEmail({
    to: toEmail,
    subject: "Votre code de validation - CWS",
    html: htmlTemplate
  });
};

module.exports = { sendEmail, sendOtpEmail };