const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    // Controller stub for backend team to implement logic
    return successResponse(res, 'Login berhasil', {
      token: 'jwt_mock_token_12345',
      user: { id: 1, phone, role: 'ANGGOTA' }
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, phone, password, category } = req.body;
    return successResponse(res, 'Pendaftaran akun anggota berhasil', {
      id: 1, name, phone, category
    }, 201);
  } catch (err) {
    next(err);
  }
};
