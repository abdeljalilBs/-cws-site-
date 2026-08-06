const { Redis } = require('@upstash/redis');

const rawUrl = process.env.UPSTASH_REDIS_REST_URL || '';
const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || '';

const cleanUrl = rawUrl.trim().replace(/^["']+|["']+$/g, '');
const cleanToken = rawToken.trim().replace(/^["']+|["']+$/g, '');

if (!cleanUrl || !cleanToken) {
    console.warn("⚠️ UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquant dans les variables d'environnement.");
}

const redis = new Redis({
    url: cleanUrl,
    token: cleanToken,
});

module.exports = redis;