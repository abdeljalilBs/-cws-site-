const redis = require('./redis');

const saveOtp = async (email, code, expiresInSeconds) => {
    await redis.set(`otp:${email}`, code, { ex: expiresInSeconds });
};

const getOtp = async (email) => {
    const code = await redis.get(`otp:${email}`);
    return code;
};

const deleteOtp = async (email) => {
    await redis.del(`otp:${email}`);
};

module.exports = { saveOtp, getOtp, deleteOtp };