-- ============================================================
-- SEED DATA: KOPERASI TANI PANGAN MANDIRI
-- ============================================================

USE `koperasi_tani_pangan_mandiri`;

-- Seed Categories
INSERT INTO `kategori` (`id`, `nama_kategori`, `slug`, `tipe`) VALUES
(1, 'Hasil Tani', 'hasil-tani', 'PRODUK'),
(2, 'Saprotan', 'saprotan', 'PRODUK'),
(3, 'Olahan UMKM', 'olahan-umkm', 'PRODUK'),
(4, 'Pengumuman', 'pengumuman', 'BERITA'),
(5, 'Inovasi Tani', 'inovasi-tani', 'BERITA'),
(6, 'Pertanian', 'pertanian', 'GALERI');

-- Seed User Admin & Anggota Demo
INSERT INTO `users` (`id`, `username`, `phone`, `password`, `role`, `is_active`) VALUES
(1, 'admin', '082145678900', '$2a$10$wN3s1N2x0L2T...HASHED_MOCK...', 'ADMIN', 1),
(2, 'suryana', '081234567890', '$2a$10$wN3s1N2x0L2T...HASHED_MOCK...', 'ANGGOTA', 1);

-- Seed Anggota
INSERT INTO `anggota` (`id`, `user_id`, `no_anggota`, `nik`, `nama_lengkap`, `kategori`, `alamat`, `desa`, `kecamatan`, `status_keanggotaan`, `tanggal_bergabung`) VALUES
(1, 2, 'KTPM-2026-0001', '3213011508720003', 'H. Suryana', 'PETANI', 'Jl. Sawahluhur No. 12', 'Kertamukti', 'Ciasem', 'AKTIF', '2015-06-10');

-- Seed Produk
INSERT INTO `produk` (`id`, `kategori_id`, `nama_produk`, `slug`, `harga`, `stok`, `satuan`, `deskripsi`) VALUES
(1, 1, 'Beras Pandan Wangi Super (5 Kg)', 'beras-pandan-wangi-super-5kg', 78000.00, 150, 'Pack', 'Beras kualitas premium asli hasil sawah irigasi teknis anggota Koperasi Tani Pangan Mandiri.'),
(2, 2, 'Pupuk Organik Granul Kasgot (25 Kg)', 'pupuk-organik-granul-kasgot-25kg', 65000.00, 200, 'Karung', 'Pupuk fermentasi organik kaya mikroba penyubur tanah hasil olahan limbah pertanian anggota.');
