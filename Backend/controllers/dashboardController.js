const dashboardService = require('../services/dashboardService');

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const dashboardData = await dashboardService.getUserDashboardData(userId);

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
};

module.exports = { getUserDashboard };
