// backend/controllers/contactController.js
const asyncHandler = require("express-async-handler");
const { sendEmail } = require('../services/mailer');
const { saveOtp, getOtp, deleteOtp } = require('../store/otpStore');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- CONTRÔLEUR 1 : ENVOYER L'OTP ---
exports.sendOtp = asyncHandler(async (req, res) => {
  const { email, firstName } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("L'adresse email est requise.");
  }

  const otp = generateOTP();

  // Calcul du temps d'expiration en SECONDES pour Redis (ex: 10 minutes = 600 secondes)
  const expiryMinutes = process.env.OTP_EXPIRY_MINUTES || 10;
  const expiryInSeconds = expiryMinutes * 60;

  // Sauvegarde dans Redis
  await saveOtp(email, otp, expiryInSeconds);

  console.log(`[DEBUG] OTP sauvegardé pour ${email} : ${otp}`);

  // Template HTML pour l'email d'OTP (Design Premium CWS)
  const otpHtml = `
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
      <p style="font-size: 13px; color: #888;">Ce code est valable pendant ${expiryMinutes} minutes.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; font-size: 12px; color: #666;">
        <p>20, Rue Marie de Lorraine, 37700 La Ville-aux-Dames</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: "Votre code de validation - CWS",
    html: otpHtml
  });

  res.status(200).json({ message: "Code envoyé avec succès !" });
});

// --- CONTRÔLEUR 2 : VÉRIFIER L'OTP ET NOTIFIER LE CLIENT ---
exports.verifyContact = asyncHandler(async (req, res) => {
  const { email, otp, formData } = req.body;

  // Récupération du code depuis Redis
  const storedCode = await getOtp(email);

  // Logs de débogage pour voir ce qui se passe dans le terminal
  console.log("--- DEBUG VERIFICATION ---");
  console.log("Email reçu :", email);
  console.log("Code dans Redis :", storedCode, typeof storedCode);
  console.log("Code saisi (Postman) :", otp, typeof otp);
  console.log("--------------------------");

  // Avec Redis, si le code a expiré, il est supprimé automatiquement, donc storedCode sera null
  if (!storedCode) {
    res.status(400);
    throw new Error("Aucun code trouvé ou code expiré. Veuillez en demander un nouveau.");
  }

  // ✅ CORRECTION ICI : On force la comparaison en String pour éviter les bugs de type
  if (String(storedCode) !== String(otp)) {
    res.status(400);
    throw new Error("Le code saisi est incorrect.");
  }

  // ✅ Le code est bon, on nettoie Redis
  await deleteOtp(email);

  // --- 1. EMAIL DE CONFIRMATION POUR L'UTILISATEUR (Le Prospect) ---
  const userConfirmationHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #121212; color: #f5f5f5; padding: 40px 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #e0d5c1; font-size: 32px; letter-spacing: 2px; margin: 0; text-transform: uppercase;">CWS</h1>
      </div>
      <h2 style="color: #ffffff; font-weight: 300;">Merci ${formData.firstName} !</h2>
      <p style="line-height: 1.6; color: #cccccc;">Nous avons bien reçu votre demande concernant : <strong style="color:#e0d5c1;">${formData.requestType}</strong>.</p>
      <p style="line-height: 1.6; color: #cccccc;">Notre équipe va étudier votre profil et reviendra vers vous très rapidement au <strong>${formData.phone}</strong> ou par retour de mail.</p>
      <p style="line-height: 1.6; color: #cccccc; margin-top: 30px;">À très vite chez Coach Wellness Sports.</p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; text-align: center; font-size: 12px; color: #666;">
        <p>20, Rue Marie de Lorraine, 37700 La Ville-aux-Dames | 06 77 88 44 69</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: "Confirmation de votre demande - Coach Wellness Sports",
    html: userConfirmationHtml
  });

  // --- 2. EMAIL D'ALERTE POUR LE CLIENT (La Salle CWS) ---
  const clientAlertHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border-left: 5px solid #e0d5c1;">
        <h2 style="color: #121212; margin-top: 0;">🔥 Nouvelle demande de contact (Site Web)</h2>
        <p>Un prospect vient de valider son formulaire de contact sur le site CWS.</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        
        <p><strong>👤 Nom :</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>📧 Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>📱 Téléphone :</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
        <p><strong>🎯 Type de demande :</strong> ${formData.requestType}</p>
        
        <div style="background-color: #fafafa; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <strong>💬 Message du prospect :</strong><br><br>
          <em>"${formData.message}"</em>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #888;">Pensez à recontacter ce prospect rapidement pour maintenir l'image premium et humaine de la salle.</p>
      </div>
    </div>
  `;

  await sendEmail({
    to: process.env.CLIENT_EMAIL,
    subject: `🔥 Nouveau Prospect CWS : ${formData.firstName} ${formData.lastName}`,
    html: clientAlertHtml
  });

  console.log(`--- NOUVELLE DEMANDE CONTACT VALIDEE : ${formData.firstName} ${formData.lastName} ---`);

  res.status(200).json({ message: "Validation réussie ! Nous reviendrons vers vous très vite." });
});