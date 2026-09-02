const mysql = require('mysql2/promise');
async function run() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kopdes'
  });
  
  try {
    await db.query(`ALTER TABLE profil_koperasi ADD COLUMN hero_image VARCHAR(255) NULL;`);
    console.log('Added hero_image column successfully');
  } catch (err) {
    console.error(err);
  }
  await db.end();
}
run();
