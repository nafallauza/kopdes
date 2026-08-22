const { successResponse, errorResponse } = require('../utils/responseHandler');
const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return errorResponse(res, 'Username/Email dan password wajib diisi!', 400);
    }

    const [users] = await db.execute('SELECT * FROM users WHERE username = ? OR email = ?', [username, username]);
    
    if (users.length === 0) {
      return errorResponse(res, 'Username atau Email tidak ditemukan!', 401);
    }

    const user = users[0];

    if (!user.is_active) {
      return errorResponse(res, 'Akun Anda dinonaktifkan!', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Password salah!', 401);
    }

    const secretKey = process.env.JWT_SECRET || 'kopdes_rahasia_super_aman_123';
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '12h' });

    return successResponse(res, 'Login berhasil', {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return errorResponse(res, 'Username, Email, dan password wajib diisi!', 400);
    }

    const [existing] = await db.execute('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) {
      return errorResponse(res, 'Username atau Email sudah digunakan!', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 'ADMIN', 1]
    );

    return successResponse(res, 'Registrasi berhasil', { id: result.insertId, username, email });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { username, newPassword } = req.body;
    
    if (!username || !newPassword) {
      return errorResponse(res, 'Username/Email dan kata sandi baru wajib diisi!', 400);
    }

    const [existing] = await db.execute('SELECT id, username FROM users WHERE username = ? OR email = ?', [username, username]);
    if (existing.length === 0) {
      return errorResponse(res, 'Username atau Email tidak ditemukan!', 404);
    }

    const actualUsername = existing[0].username;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await db.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, actualUsername]
    );

    return successResponse(res, 'Kata sandi berhasil direset', null);
  } catch (err) {
    next(err);
  }
};
