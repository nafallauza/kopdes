const mysql = require('mysql2/promise');
async function run() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kopdes'
  });
  
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS profil_koperasi (
        id INT UNSIGNED PRIMARY KEY DEFAULT 1,
        nama_koperasi VARCHAR(150) NOT NULL,
        singkatan VARCHAR(50) NOT NULL,
        logo_url VARCHAR(255) NULL,
        deskripsi TEXT NULL,
        visi TEXT NULL,
        legal_json JSON NULL,
        kontak_json JSON NULL,
        pengurus_json JSON NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    
    // Insert initial data if table is empty
    const [rows] = await db.query('SELECT id FROM profil_koperasi WHERE id = 1');
    if (rows.length === 0) {
      await db.query(`
        INSERT INTO profil_koperasi 
        (id, nama_koperasi, singkatan, logo_url, deskripsi, visi, legal_json, kontak_json, pengurus_json)
        VALUES (
          1,
          'Koperasi Tani Pangan Mandiri',
          'KOPDES',
          'https://via.placeholder.com/150x150.png?text=Logo+Kopdes',
          'Koperasi desa yang berfokus pada ketahanan pangan dan kesejahteraan petani lokal. Kami menjembatani hasil panen petani langsung ke konsumen.',
          'Menjadi pilar ketahanan pangan desa dan memajukan kesejahteraan petani melalui ekosistem digital dan perdagangan adil.',
          '{"badanHukum": "No. 123/BH/KDK/2020", "wilayahKerja": "Kecamatan Nusantara"}',
          '{"alamat": "Jl. Tani Subur No. 12, Desa Mandiri, Kec. Nusantara, Kab. Agro", "googleMapsLink": "https://maps.google.com", "googleMapsEmbedUrl": "", "telepon": "+62 812-3456-7890", "whatsapp": "+62 812-3456-7890", "email": "info@koptani-mandiri.com", "jamKerja": "Senin - Jumat (08:00 - 16:00)", "sosialMedia": {}}',
          '{"ketua": {"nama": "Bpk. Haryanto", "foto": ""}, "sekretaris": {"nama": "Ibu Siti Aminah", "foto": ""}, "bendahara": {"nama": "Bpk. Budi Santoso", "foto": ""}, "pengawas": {"nama": "Bpk. Ridwan", "foto": ""}}'
        )
      `);
      console.log('Inserted default profile data');
    } else {
      console.log('Profile table already exists and populated');
    }
    console.log('Database altered successfully');
  } catch (err) {
    console.error(err);
  }
  await db.end();
}
run();
