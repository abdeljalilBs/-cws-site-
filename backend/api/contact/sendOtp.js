// api/contact/sendOtp.js
const { applyCors } = require('../_cors');
const { sendOtp } = require('../../controllers/contactController');

module.exports = async function handler(req, res) {
    if (applyCors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }

    try {
        await sendOtp(req, res);
    } catch (error) {
        console.error('Error in sendOtp handler:', error);
        res.status(500).json({
            success: false,
            error: error.message || "Erreur lors de l'envoi du code"
        });
    }
};