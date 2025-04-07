const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const {authMiddleware } = require('../middlewares/authMiddleware'); // Token doğrulama için

// 🛡️ Auth middleware uyguluyoruz:
router.use(authMiddleware);

// 📥 Mesaj gönderme
router.post('/send/:receiver_id', messageController.sendMessage);

// 📥 Kullanıcılar arası mesajları çekme    Sağ ekranda   req.user ile jwtden gelen kullanıcı hesap içndeki kullanıcı req.body ile seçilen kişinin id si alınarak hedef hesap belirlenir.
router.get('/:userId', messageController.getMessagesBetweenUsers);

// 📥 Mesajı okundu olarak işaretleme
router.patch('/read/:messageId', messageController.markMessageAsRead);

// Sohbeti olan kişileri getir
router.get('/conversations', messageController.getConversations);


module.exports = router;
