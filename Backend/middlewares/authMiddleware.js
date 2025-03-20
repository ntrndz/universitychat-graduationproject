const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Bearer token

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    req.user = decoded; // Kullanıcı bilgilerini req.user içine ekliyoruz
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
// 🔥 Sadece Maintainer yetkisi olanlar erişebilir
const maintainerMiddleware = (req, res, next) => {
    if (!req.user || req.user.role_id !== 3) {
        return res.status(403).json({ success: false, message: 'Access denied. Maintainer role required.' });
    }
    next();
};

module.exports = {authMiddleware,maintainerMiddleware};
