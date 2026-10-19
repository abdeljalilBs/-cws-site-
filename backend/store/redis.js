const { Redis } = require('@upstash/redis');

const rawUrl = process.env.UPSTASH_REDIS_REST_URL || '';
const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || '';

const cleanUrl = rawUrl.trim().replace(/^["']+|["']+$/g, '');
const cleanToken = rawToken.trim().replace(/^["']+|["']+$/g, '');

if (!cleanUrl || !cleanToken) {
    console.warn("⚠️ UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquant dans les variables d'environnement.");
}

const redis = (cleanUrl && cleanToken) 
    ? new Redis({ url: cleanUrl, token: cleanToken })
    : {
        set: async () => { throw new Error("Service Redis non configuré : UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquant sur le serveur."); },
        get: async () => { throw new Error("Service Redis non configuré : UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquant sur le serveur."); },
        del: async () => { throw new Error("Service Redis non configuré : UPSTASH_REDIS_REST_URL ou UPSTASH_REDIS_REST_TOKEN manquant sur le serveur."); }
    };

module.exports = redis;