-- ============================================================
-- SEED DATA: KOPERASI TANI PANGAN MANDIRI
-- ============================================================

USE `kopdes`;

-- Seed Categories
INSERT INTO `kategori` (`id`, `nama_kategori`, `slug`, `tipe`) VALUES
(1, 'Hasil Tani', 'hasil-tani', 'PRODUK'),
(2, 'Saprotan', 'saprotan', 'PRODUK'),
(3, 'Olahan UMKM', 'olahan-umkm', 'PRODUK'),
(4, 'Pengumuman', 'pengumuman', 'BERITA'),
(5, 'Inovasi Tani', 'inovasi-tani', 'BERITA'),
(6, 'Pertanian', 'pertanian', 'GALERI');

-- Seed User Admin
-- Password is 'admin123'
INSERT INTO `users` (`id`, `username`, `password`, `role`, `is_active`) VALUES
(1, 'admin', '$2a$10$902zJxejfLAjvPTuLA864.BoRIdD5dkRz7nv4GCfuVv2v8dq0whCq', 'ADMIN', 1);
