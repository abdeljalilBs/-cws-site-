const express = require('express');
const router = express.Router();
const { subscribeNewsletter } = require('../controllers/newsletterController');

// POST /api/newsletter/subscribe
router.post('/subscribe', subscribeNewsletter);

module.exports = router;