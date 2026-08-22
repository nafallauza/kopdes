const db = require('../config/db.config');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.tambahGaleri = async (req, res, next) => {
  try {
    const { title, mediaType, url } = req.body;
    let url_gambar = url; 
    
    if (mediaType === 'image') {
      if (!req.file) return errorResponse(res, 'File gambar tidak ditemukan!', 400);
      url_gambar = `http://${req.hostname}:5000/uploads/` + req.file.filename;
    } else if (mediaType === 'video') {
      if (!url) return errorResponse(res, 'URL video tidak boleh kosong!', 400);
    } else {
      if (req.file) url_gambar = `http://${req.hostname}:5000/uploads/` + req.file.filename;
    }

    const query = 'INSERT INTO galeri (kategori_id, judul_foto, url_gambar, tanggal_kegiatan) VALUES (?, ?, ?, CURDATE())';
    
    const [result] = await db.execute(query, [6, title, url_gambar]);

    return successResponse(res, 'Galeri berhasil ditambahkan!', { id: result.insertId, title, url_gambar, mediaType }, 201);
  } catch (err) {
    next(err);
  }
};
