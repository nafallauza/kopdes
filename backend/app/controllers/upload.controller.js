const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Gambar wajib diunggah!', 400);
    }
    
    // Create the URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const url_gambar = `${baseUrl}/uploads/${req.file.filename}`;

    return successResponse(res, 'Gambar berhasil diunggah', {
      url: url_gambar
    }, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(res, 'Gagal mengunggah gambar', 500);
  }
};
