// api/contact.js
const { sendOtp, verifyContact } = require('../controllers/contactController');

module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Router selon l'action demandée
        const { action } = req.query;

        if (req.method === 'POST') {
            if (action === 'send-otp') {
                return await sendOtp(req, res);
            } else if (action === 'verify-contact') {
                return await verifyContact(req, res);
            } else {
                // Par défaut, on considère que c'est une vérification de contact
                return await verifyContact(req, res);
            }
        } else {
            return res.status(405).json({
                success: false,
                message: 'Méthode non autorisée'
            });
        }
    } catch (error) {
        console.error('Error in contact handler:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Erreur interne du serveur'
        });
    }
};