const { successResponse } = require('../utils/responseHandler');

exports.getAllAnggota = async (req, res, next) => {
  try {
    return successResponse(res, 'Daftar anggota berhasil diambil', [
      { id: 1, noAnggota: 'KTPM-2026-0001', nama: 'H. Suryana', desa: 'Kertamukti', status: 'AKTIF' }
    ]);
  } catch (err) {
    next(err);
  }
};

exports.getAnggotaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    return successResponse(res, `Detail anggota ID ${id} ditemukan`, {
      id, noAnggota: 'KTPM-2026-0001', nama: 'H. Suryana', status: 'AKTIF'
    });
  } catch (err) {
    next(err);
  }
};
