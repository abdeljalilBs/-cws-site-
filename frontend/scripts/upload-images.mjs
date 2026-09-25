// frontend/scripts/upload-images.mjs
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qupvgw44',
    api_key: process.env.CLOUDINARY_API_KEY || '612882419684551',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ CORRECTION ICI : Le bon chemin vers tes images
const SOURCE_DIR = path.join(__dirname, '../src/assets');
const CLOUDINARY_FOLDER = 'cws-site';

async function uploadFile(filePath, relativePath) {
    try {
        const publicId = `${CLOUDINARY_FOLDER}/${relativePath.replace(/\.[^/.]+$/, '')}`;

        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: CLOUDINARY_FOLDER,
            public_id: path.basename(publicId),
            overwrite: true,
            resource_type: 'auto'
        });

        console.log(`✅ Uploadé: ${relativePath} → ${result.public_id}`);
        return result;
    } catch (error) {
        console.error(`❌ Erreur pour ${relativePath}:`, error.message);
        return null;
    }
}

async function uploadDirectory(dirPath, baseDir = dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.relative(baseDir, fullPath);

        if (entry.isDirectory()) {
            await uploadDirectory(fullPath, baseDir);
        } else if (/\.(jpg|jpeg|png|webp|gif|mp4|mov|avi)$/i.test(entry.name)) {
            await uploadFile(fullPath, relativePath);
        }
    }
}

// Lancement
console.log(` Scan du dossier: ${SOURCE_DIR}`);
console.log(`☁️  Destination Cloudinary: ${CLOUDINARY_FOLDER}\n`);

uploadDirectory(SOURCE_DIR)
    .then(() => console.log('\n🎉 Migration terminée !'))
    .catch(err => console.error('💥 Erreur fatale:', err));