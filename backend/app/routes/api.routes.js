const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const anggotaController = require('../controllers/anggota.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Anggota Routes
router.get('/anggota', verifyToken, anggotaController.getAllAnggota);
router.get('/anggota/:id', verifyToken, anggotaController.getAnggotaById);

module.exports = router;
