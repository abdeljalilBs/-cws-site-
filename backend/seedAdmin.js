// backend/seedAdmin.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config(); // Pour charger ton .env local

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connecté à MongoDB pour le seed...');

        // Vérifier si un admin existe déjà
        const existingAdmin = await Admin.findOne({ email: 'admin@cws.com' });

        if (!existingAdmin) {
            const admin = await Admin.create({
                name: 'Super Admin',
                email: 'admin@cws.com', // Change ça si tu veux
                password: 'cwsadmin123'  // Change ça par un vrai mot de passe !
            });
            console.log('✅ Admin créé avec succès:', admin.email);
        } else {
            console.log('️ Un admin existe déjà avec cet email.');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
};

seedAdmin();