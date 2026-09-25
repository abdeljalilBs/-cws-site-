// src/utils/cloudinary.js
export const getCloudinaryUrl = (publicId, options = {}) => {
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

    // Options par défaut pour optimiser automatiquement
    const defaultOptions = {
        quality: 'auto',      // Compression automatique intelligente
        fetchFormat: 'auto',  // Sert WebP/AVIF selon le navigateur
        ...options
    };

    // Construction de l'URL avec transformations
    const transformations = Object.entries(defaultOptions)
        .map(([key, value]) => `${key}_${value}`)
        .join(',');

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};