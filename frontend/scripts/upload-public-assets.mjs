// frontend/scripts/upload-public-assets.mjs
import cloudinary from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qupvgw44',
    api_key: process.env.CLOUDINARY_API_KEY || '612882419684551',
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PUBLIC_DIR = path.join(__dirname, '../public');
const FOLDER = 'cws-site';

// Liste exacte des fichiers à uploader
const FILES_TO_UPLOAD = [
    'image-logo.png',
    'hero-video.mp4',
    'hero-video.webm'
];

async function uploadFile(filename) {
    const filePath = path.join(PUBLIC_DIR, filename);
    // On enlève l'extension pour le publicId (ex: hero-video.mp4 -> cws-site/hero-video)
    const publicId = `${FOLDER}/${path.parse(filename).name}`;

    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: FOLDER,
            public_id: path.parse(filename).name,
            overwrite: true,
            resource_type: 'auto' // Détecte automatiquement image ou vidéo
        });
        console.log(`✅ Uploadé: ${filename} → ${result.public_id}`);
    } catch (error) {
        console.error(`❌ Erreur pour ${filename}:`, error.message);
    }
}

console.log('🚀 Upload des assets du dossier public...\n');

// Exécution parallèle pour aller plus vite
await Promise.all(FILES_TO_UPLOAD.map(uploadFile));

console.log('\n C\'est terminé !');