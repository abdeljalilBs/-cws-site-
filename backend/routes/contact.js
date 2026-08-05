// backend/routes/contact.js
const express = require('express');
const router = express.Router();

// On importe les fonctions depuis le contrôleur
const { sendOtp, verifyContact } = require('../controllers/contactController');

// Route 1 : Envoi du code
router.post('/send-otp', sendOtp);

// Route 2 : Vérification et validation finale
router.post('/verify-contact', verifyContact);

module.exports = router;