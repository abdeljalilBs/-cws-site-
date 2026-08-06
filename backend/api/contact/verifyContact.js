// api/contact/verifyContact.js
const { applyCors } = require('../_cors');
const { verifyContact } = require('../../controllers/contactController');

module.exports = async function handler(req, res) {
    if (applyCors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }

    try {
        await verifyContact(req, res);
    } catch (error) {
        console.error('Error in verifyContact handler:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Erreur lors de la vérification'
        });
    }
};