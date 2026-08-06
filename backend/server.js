// Ne charger dotenv qu'en local. Sur Vercel, les variables viennent des Environment Variables du dashboard.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');

const contactRoutes = require('./routes/contact');
// Si tu as déjà créé tes routes OTP, décommente la ligne ci-dessous :
// const otpRoutes = require('./routes/otp');

const app = express();

// --- CORS explicite ---
const allowedOrigins = [
  'https://cws-site.vercel.app',
  'http://localhost:5173', // adapte au port de ton frontend en local
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    // Autorise les requêtes sans origin (Postman, curl, health checks)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/contact', contactRoutes);
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