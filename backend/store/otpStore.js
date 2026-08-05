const otpStore = new Map();

const saveOtp = (email, code, expires) => {
    otpStore.set(email, { code, expires });
};

const getOtp = (email) => {
    return otpStore.get(email);
};

const deleteOtp = (email) => {
    otpStore.delete(email);
};

module.exports = { saveOtp, getOtp, deleteOtp };