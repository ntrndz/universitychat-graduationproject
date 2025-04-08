// utils/getClientIp.js

const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor) {
      const ips = xForwardedFor.split(',');
      return ips[0].trim();
    }
  
    const rawIp = req.connection?.remoteAddress ||
                  req.socket?.remoteAddress ||
                  req.connection?.socket?.remoteAddress ||
                  null;
  
    // IPv6 localhost'u IPv4'e çevir
    if (rawIp === '::1') return '127.0.0.1';
  
    return rawIp;
  };
  
  module.exports = getClientIp;
  