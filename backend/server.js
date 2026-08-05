require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactRoutes = require('./routes/contact');
const app = express();

app.use(cors()); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use('/api/contact', contactRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: ' API CWS Backend is running smoothly.' });
});

app.use((err, req, res, next) => {
  console.error(" Erreur serveur :", err.stack || err.message);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    error: err.message || "Une erreur interne est survenue.",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Serveur CWS lancé sur http://localhost:${PORT}`);
  console.log(` Mode envoi d'email configuré pour : ${process.env.EMAIL_USER}`);
});