const Subscriber = require('../models/Subscriber');

exports.subscribeNewsletter = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'L\'adresse email est requise.'
            });
        }

        // Vérifie les doublons
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Cet email est déjà inscrit aux actualités CWS.'
            });
        }

        // Sauvegarde dans MongoDB Atlas
        await Subscriber.create({ email });

        res.status(201).json({
            success: true,
            message: 'Merci ! Vous êtes bien inscrit aux actualités CWS.'
        });

    } catch (error) {
        // Passe l'erreur au middleware global de ton server.js
        next(error);
    }
};