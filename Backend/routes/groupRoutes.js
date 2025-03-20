const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Auth middleware ekliyoruz
router.use(authMiddleware);

// ✅ Grup oluştur
router.post('/create', groupController.createGroup);

// ✅ Tüm grupları getir
router.get('/', groupController.getAllGroups);

// ✅ ID'ye göre grup getir
router.get('/:groupId', groupController.getGroupById);

module.exports = router;
