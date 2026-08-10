const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseHandler');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Akses ditolak. Token autentikasi tidak ditemukan.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_koperasi_key_2026');
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, 'Token tidak valid atau telah kadaluwarsa.', 403);
  }
};

module.exports = { verifyToken };
