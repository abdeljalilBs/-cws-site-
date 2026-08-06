// api/contact/index.js
const { applyCors } = require('../_cors');

module.exports = async function handler(req, res) {
    if (applyCors(req, res)) return;

    res.status(200).json({
        status: "ok",
        message: "Endpoint /api/contact actif. Utilisez POST /sendOtp ou POST /verifyContact.",
        endpoints: {
            sendOtp: "POST /api/contact/sendOtp",
            verifyContact: "POST /api/contact/verifyContact"
        }
    });
};