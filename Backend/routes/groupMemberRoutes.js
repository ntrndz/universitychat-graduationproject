const express = require('express');
const router = express.Router();
const groupMemberController = require('../controllers/groupMemberController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/add', groupMemberController.addMember);
router.post('/remove', groupMemberController.removeMember);
router.get('/:groupId/members', groupMemberController.getMembersByGroup);

module.exports = router;
