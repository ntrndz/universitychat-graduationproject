const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Access Token oluşturma fonksiyonu
const generateAccessToken = (user) => {
  const payload = {
    user_id: user.user_id, // 🔥 Güncellendi
    email: user.email,
    role_id: user.role_id || (user.role ? user.role.role_id : null),
  };

  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiration,
    issuer: authConfig.jwtIssuer,
    audience: authConfig.jwtAudience,
  });
};

// Refresh Token oluşturma fonksiyonu
const generateRefreshToken = (user) => {
  const payload = {
    user_id: user.user_id, // 🔥 Güncellendi
    email: user.email,
  };

  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtRefreshExpiration,
    issuer: authConfig.jwtIssuer,
    audience: authConfig.jwtAudience,
  });
};

// Token doğrulama fonksiyonu
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token bulunamadı');
  }

  try {
    return jwt.verify(token, authConfig.jwtSecret);
  } catch (error) {
    console.error('Token doğrulama hatası:', error.message);
    throw new Error('Geçersiz veya süresi dolmuş token');
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
