const db = require('../config/db.config');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllKategori = async (req, res, next) => {
  try {
    const [rows] = await db.execute('SELECT * FROM kategori ORDER BY id ASC');
    return successResponse(res, 'Daftar kategori berhasil diambil', rows);
  } catch (err) {
    next(err);
  }
};
