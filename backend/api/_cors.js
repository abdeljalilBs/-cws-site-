// api/_cors.js  –  helper partagé pour tous les handlers Vercel
const ALLOWED_ORIGINS = [
    'https://cws-site.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
];

/**
 * Applique les headers CORS et répond aux preflight OPTIONS.
 * @returns {boolean} true si la requête était OPTIONS (déjà terminée)
 */
function applyCors(req, res) {
    const origin = req.headers.origin || '';
    const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

    res.setHeader('Access-Control-Allow-Origin', allowed);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return true;
    }
    return false;
}

module.exports = { applyCors };
