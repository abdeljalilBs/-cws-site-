const express = require('express');
const router = express.Router();
const {
    loginAdmin,
    handleRefreshToken,
    logoutAdmin,
    getAdminProfile,
    getSubscribers,
    deleteSubscriber,
    exportSubscribersCSV
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware'); // ✅ Le middleware s'appelle "protect"

router.post('/login', loginAdmin);
router.post('/refresh-token', handleRefreshToken);
router.post('/logout', logoutAdmin);

// ⚠️ IMPORTANT : /export DOIT être avant /:id
router.get('/subscribers/export', protect, exportSubscribersCSV);  // ✅ Corrigé
router.get('/profile', protect, getAdminProfile);
router.get('/subscribers', protect, getSubscribers);
router.delete('/subscribers/:id', protect, deleteSubscriber);      // ✅ Corrigé

module.exports = router;