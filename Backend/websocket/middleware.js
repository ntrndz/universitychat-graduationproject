const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Authentication token missing'));
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    socket.user = decoded;
    next();
  } catch (err) {
    console.error('WebSocket auth error:', err.message);
    next(new Error('Invalid or expired token'));
  }
};

module.exports = socketAuthMiddleware;
