const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {authMiddleware } = require('../middlewares/authMiddleware'); // Token doğrulama için

// 🛡️ Auth middleware uyguluyoruz:
router.use(authMiddleware);

// 📥 Mesaj gönderme
router.post('/send', messageController.sendMessage);

// 📥 Kullanıcılar arası mesajları çekme
router.get('/:userId', messageController.getMessagesBetweenUsers);

// 📥 Mesajı okundu olarak işaretleme
router.patch('/read/:messageId', messageController.markMessageAsRead);

module.exports = router;
