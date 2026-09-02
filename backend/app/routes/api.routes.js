const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const anggotaController = require('../controllers/anggota.controller');
const profilController = require('../controllers/profil.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/forgot-password', authController.forgotPassword);

// Profil Routes
router.get('/profil', profilController.getProfil);
router.put('/profil/statis', verifyToken, profilController.updateProfilStatis);
router.put('/profil/dinamis', verifyToken, profilController.updateProfilDinamis);

// Anggota Routes
router.get('/anggota', verifyToken, anggotaController.getAllAnggota);
router.get('/anggota/:id', verifyToken, anggotaController.getAnggotaById);
const kategoriController = require('../controllers/kategori.controller');
const galeriController = require('../controllers/galeri.controller');
const upload = require('../middleware/upload.middleware');

// Kategori Routes
router.get('/kategori', kategoriController.getAllKategori);

// Galeri Routes (POST form-data)
router.post('/galeri', upload.single('gambar'), galeriController.tambahGaleri);

const uploadController = require('../controllers/upload.controller');
// Generic Upload Route (Untuk Profile/Pengurus)
router.post('/upload', upload.single('gambar'), uploadController.uploadImage);

module.exports = router;
