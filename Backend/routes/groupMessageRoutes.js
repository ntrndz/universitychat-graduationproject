const express = require('express');
const router = express.Router();
const groupMessageController = require('../controllers/groupMessageController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/send', groupMessageController.sendGroupMessage);

router.get('/:groupId', groupMessageController.getMessagesByGroup);

module.exports = router;
