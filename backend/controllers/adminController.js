const Admin = require('../models/Admin');
const Subscriber = require('../models/Subscriber'); // <-- AJOUT : Import du modèle Subscriber
const jwt = require('jsonwebtoken');
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshtoken');

// @desc    Authentifier l'admin & obtenir les tokens
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            const accessToken = generateToken(admin._id);
            const refreshToken = generateRefreshToken(admin._id);

            await Admin.findByIdAndUpdate(admin._id, { refreshToken });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 72 * 60 * 60 * 1000,
            });

            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                accessToken,
            });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe invalide' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors du login', error: error.message });
    }
};

// @desc    Gérer le refresh de l'access token
// @route   POST /api/admin/refresh-token
// @access  Public
const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
        return res.status(401).json({ message: 'Pas de refresh token' });
    }

    const refreshToken = cookie.refreshToken;

    try {
        const admin = await Admin.findOne({ refreshToken });

        if (!admin) {
            return res.status(403).json({ message: 'Refresh token invalide (non trouvé en base)' });
        }

        // ⚠️ NOTE : Si tu as mis la clé en dur dans jwtToken.js, il faut aussi la mettre en dur ici pour le verify
        // Pour l'instant je laisse process.env.JWT_SECRET, mais si ça bug, remplace par ta clé en dur
        const secretKey = process.env.JWT_SECRET || "cws_cle_secrete_super_compliquee_123456789";

        jwt.verify(refreshToken, secretKey, (err, decoded) => {
            if (err || admin._id.toString() !== decoded.id) {
                return res.status(403).json({ message: 'Refresh token expiré ou invalide' });
            }

            const newAccessToken = generateToken(admin._id);
            res.json({ accessToken: newAccessToken });
        });

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur refresh', error: error.message });
    }
};

// @desc    Logout admin
// @route   POST /api/admin/logout
// @access  Public
const logoutAdmin = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) {
        return res.sendStatus(204);
    }

    const refreshToken = cookie.refreshToken;

    try {
        const admin = await Admin.findOne({ refreshToken });
        if (admin) {
            await Admin.findByIdAndUpdate(admin._id, { $unset: { refreshToken: 1 } });
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });

        res.json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur logout', error: error.message });
    }
};

// @desc    Obtenir le profil de l'admin connecté
// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = async (req, res) => {
    try {
        res.json(req.admin);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur profil', error: error.message });
    }
};

// @desc    Obtenir tous les abonnés newsletter
// @route   GET /api/admin/subscribers
// @access  Private
const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
const deleteSubscriber = async (req, res) => {
    const { id } = req.params;

    try {
        const subscriber = await Subscriber.findById(id);

        if (!subscriber) {
            return res.status(404).json({ message: 'Abonné non trouvé' });
        }

        await Subscriber.findByIdAndDelete(id);
        res.json({ message: 'Abonné supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur lors de la suppression', error: error.message });
    }
};
const exportSubscribersCSV = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });

        // Création de l'en-tête CSV
        let csvContent = "Email,Nom,Date d'inscription\n";

        // Ajout des lignes de données
        subscribers.forEach((sub) => {
            // Échappement des guillemets et gestion des virgules dans les champs
            const email = `"${(sub.email || '').replace(/"/g, '""')}"`;
            const name = `"${(sub.name || '').replace(/"/g, '""')}"`;
            const date = sub.subscribedAt
                ? new Date(sub.subscribedAt).toLocaleString('fr-FR')
                : '';

            csvContent += `${email},${name},${date}\n`;
        });

        // Configuration des headers pour forcer le téléchargement
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=abonnes_newsletter.csv');

        // Ajout du BOM UTF-8 pour que les accents s'affichent correctement dans Excel
        res.send('\ufeff' + csvContent);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'export CSV', error: error.message });
    }
};

module.exports = {
    loginAdmin,
    handleRefreshToken,
    logoutAdmin,
    getAdminProfile,
    getSubscribers,
    deleteSubscriber,      // <-- AJOUT
    exportSubscribersCSV,
};