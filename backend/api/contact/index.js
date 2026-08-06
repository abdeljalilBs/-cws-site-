// api/contact/index.js
module.exports = async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    res.status(200).json({
        status: "ok",
        message: "Endpoint /api/contact actif. Utilisez POST /sendOtp ou POST /verifyContact.",
        endpoints: {
            sendOtp: "POST /api/contact/sendOtp",
            verifyContact: "POST /api/contact/verifyContact"
        }
    });
};