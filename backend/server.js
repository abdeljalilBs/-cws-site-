require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // <-- 1. AJOUT : Import de cookie-parser

const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletterRoutes');
const adminRoutes = require('./routes/adminRoutes'); // <-- 2. AJOUT : Import des routes admin

const app = express();

console.log('🔍 Vérification de MONGODB_URI...', process.env.MONGODB_URI ? '✅ Présente' : '❌ Absente');

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch((err) => console.error('❌ Erreur connexion MongoDB:', err.message));
} else {
  console.warn('⚠️  MONGODB_URI non défini dans les variables d\'environnement');
}

const allowedOrigins = [
  'https://cws-site.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Très important : permet au navigateur d'envoyer/recevoir les cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // <-- 3. AJOUT : Middleware pour parser les cookies (nécessaire pour le refreshToken)

// --- Routes ---
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes); // <-- 4. AJOUT : Montage des routes admin

// app.use('/api/otp', otpRoutes); // Décommente quand ta route OTP est prête

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API CWS Backend is running smoothly.' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API CWS Backend is running smoothly.' });
});

// --- Gestion des erreurs ---
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack || err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || "Une erreur interne est survenue.",
    message: err.message || "Une erreur interne est survenue.",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// --- Export / démarrage ---
// Toujours exporter l'app : c'est ce que Vercel importe comme handler serverless.
module.exports = app;

// N'écouter un port QUE si le fichier est lancé directement (dev local : `node server.js`).
// Sur Vercel, c'est Vercel qui importe le fichier, donc ce bloc ne s'exécute pas.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Serveur CWS lancé sur http://localhost:${PORT}`);
    console.log(`Mode envoi d'email configuré pour : ${process.env.EMAIL_USER}`);
  });
}