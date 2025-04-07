const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Sol kısımda mesajlaşılan kişiler ve grrupları çağıran endpoint
router.get('/', dashboardController.getUserDashboard);

module.exports = router;
