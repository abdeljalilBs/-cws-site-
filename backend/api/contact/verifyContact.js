// api/contact/verifyContact.js
const { verifyContact } = require('../../controllers/contactController');

module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await verifyContact(req, res);
    } catch (error) {
        console.error('Error in verifyContact:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Erreur lors de la vérification'
        });
    }
};