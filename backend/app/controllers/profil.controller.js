const { successResponse, errorResponse } = require('../utils/responseHandler');
const db = require('../config/db.config');

exports.getProfil = async (req, res, next) => {
  try {
    const [rows] = await db.execute('SELECT * FROM profil_koperasi WHERE id = 1');
    if (rows.length === 0) {
      return errorResponse(res, 'Data profil tidak ditemukan.', 404);
    }
    
    const raw = rows[0];
    
    // Parse JSON safely
    const parseJson = (str) => {
      try { return typeof str === 'string' ? JSON.parse(str) : str; }
      catch { return {}; }
    };

    const data = {
      shortName: raw.singkatan,
      logo: raw.logo_url,
      namaKoperasi: raw.nama_koperasi,
      description: raw.deskripsi,
      legal: parseJson(raw.legal_json),
      visi: raw.visi,
      kontak: parseJson(raw.kontak_json),
      pengurus: parseJson(raw.pengurus_json),
      heroImage: raw.hero_image
    };

    return successResponse(res, 'Berhasil mengambil profil', data);
  } catch (err) {
    next(err);
  }
};

exports.updateProfilStatis = async (req, res, next) => {
  try {
    const { legal, visi, description, namaKoperasi, shortName, logo, heroImage } = req.body;
    
    // Convert objects to JSON string
    const legalJson = legal ? JSON.stringify(legal) : null;
    
    let query = 'UPDATE profil_koperasi SET ';
    let values = [];
    
    if (legalJson) { query += 'legal_json = ?, '; values.push(legalJson); }
    if (visi !== undefined) { query += 'visi = ?, '; values.push(visi); }
    if (description !== undefined) { query += 'deskripsi = ?, '; values.push(description); }
    if (namaKoperasi !== undefined) { query += 'nama_koperasi = ?, '; values.push(namaKoperasi); }
    if (shortName !== undefined) { query += 'singkatan = ?, '; values.push(shortName); }
    if (logo !== undefined) { query += 'logo_url = ?, '; values.push(logo); }
    if (heroImage !== undefined) { query += 'hero_image = ?, '; values.push(heroImage); }
    
    // Remove last comma and space
    query = query.slice(0, -2);
    query += ' WHERE id = 1';
    
    if (values.length > 0) {
      await db.execute(query, values);
    }
    
    return successResponse(res, 'Profil statis berhasil diperbarui');
  } catch (err) {
    next(err);
  }
};

exports.updateProfilDinamis = async (req, res, next) => {
  try {
    const { kontak, pengurus } = req.body;
    
    let query = 'UPDATE profil_koperasi SET ';
    let values = [];
    
    if (kontak) { 
      query += 'kontak_json = ?, '; 
      values.push(JSON.stringify(kontak)); 
    }
    if (pengurus) { 
      query += 'pengurus_json = ?, '; 
      values.push(JSON.stringify(pengurus)); 
    }
    
    query = query.slice(0, -2);
    query += ' WHERE id = 1';
    
    if (values.length > 0) {
      await db.execute(query, values);
    }
    
    return successResponse(res, 'Profil dinamis berhasil diperbarui');
  } catch (err) {
    next(err);
  }
};
