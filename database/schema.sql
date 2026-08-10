-- ============================================================
-- DATABASE SCHEMA: KOPERASI TANI PANGAN MANDIRI
-- Engine: MySQL 8.0+ / MariaDB 10.5+
-- ============================================================

CREATE DATABASE IF NOT EXISTS `koperasi_tani_pangan_mandiri` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `koperasi_tani_pangan_mandiri`;

-- 1. Tabel Users (Autentikasi User & Multi-Role)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `phone` VARCHAR(20) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN', 'PENGURUS', 'ANGGOTA') DEFAULT 'ANGGOTA',
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel Anggota (Profil Lengkap Anggota Koperasi)
CREATE TABLE IF NOT EXISTS `anggota` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `no_anggota` VARCHAR(30) UNIQUE NOT NULL,
  `nik` VARCHAR(16) UNIQUE NOT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `kategori` ENUM('PETANI', 'UMKM', 'PETERNAK', 'UMUM') DEFAULT 'PETANI',
  `alamat` TEXT NOT NULL,
  `desa` VARCHAR(50) NOT NULL,
  `kecamatan` VARCHAR(50) NOT NULL,
  `kabupaten` VARCHAR(50) DEFAULT 'Subang',
  `foto_ktp` VARCHAR(255) NULL,
  `status_keanggotaan` ENUM('PENDING', 'AKTIF', 'NON_AKTIF') DEFAULT 'PENDING',
  `tanggal_bergabung` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabel Simpanan (Simpanan Pokok, Wajib, Sukarela, Tabungan Tani)
CREATE TABLE IF NOT EXISTS `simpanan` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `anggota_id` INT UNSIGNED NOT NULL,
  `jenis_simpanan` ENUM('POKOK', 'WAJIB', 'SUKARELA', 'TABUNGAN_TANI') NOT NULL,
  `jumlah` DECIMAL(15,2) NOT NULL,
  `keterangan` VARCHAR(255) NULL,
  `status_bayar` ENUM('PENDING', 'LUNAS', 'BATAL') DEFAULT 'LUNAS',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabel Pinjaman / Pembiayaan Usaha
CREATE TABLE IF NOT EXISTS `pinjaman` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `anggota_id` INT UNSIGNED NOT NULL,
  `no_pengajuan` VARCHAR(50) UNIQUE NOT NULL,
  `jumlah_pembiayaan` DECIMAL(15,2) NOT NULL,
  `tenor_bulan` INT NOT NULL,
  `nisbah_bagi_hasil` DECIMAL(5,2) NOT NULL,
  `tujuan_pembiayaan` TEXT NOT NULL,
  `status_pengajuan` ENUM('DRAFT', 'PROSES', 'DISETUJUI', 'DITOLAK', 'LUNAS') DEFAULT 'PROSES',
  `tanggal_cair` DATE NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabel Kategori (Produk & Berita)
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nama_kategori` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(60) UNIQUE NOT NULL,
  `tipe` ENUM('PRODUK', 'BERITA', 'GALERI') NOT NULL
) ENGINE=InnoDB;

-- 6. Tabel Produk (Katalog Produk Hasil Tani & Saprotan)
CREATE TABLE IF NOT EXISTS `produk` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT UNSIGNED NOT NULL,
  `nama_produk` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(180) UNIQUE NOT NULL,
  `harga` DECIMAL(12,2) NOT NULL,
  `stok` INT DEFAULT 0,
  `satuan` VARCHAR(20) DEFAULT 'Kg',
  `deskripsi` TEXT NULL,
  `gambar` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 7. Tabel Berita / Artikel
CREATE TABLE IF NOT EXISTS `berita` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT UNSIGNED NOT NULL,
  `judul` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) UNIQUE NOT NULL,
  `ringkasan` TEXT NOT NULL,
  `konten` LONGTEXT NOT NULL,
  `gambar_cover` VARCHAR(255) NULL,
  `penulis` VARCHAR(100) DEFAULT 'Sekretariat KTPM',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 8. Tabel Galeri
CREATE TABLE IF NOT EXISTS `galeri` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT UNSIGNED NOT NULL,
  `judul_foto` VARCHAR(150) NOT NULL,
  `url_gambar` VARCHAR(255) NOT NULL,
  `tanggal_kegiatan` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 9. Tabel Kontak & Pesan Masuk
CREATE TABLE IF NOT EXISTS `kontak` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `kategori_keperluan` VARCHAR(50) NOT NULL,
  `pesan` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. Tabel Pengajuan Layanan Online
CREATE TABLE IF NOT EXISTS `pengajuan` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nama_pengaju` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `jenis_layanan` VARCHAR(100) NOT NULL,
  `status` ENUM('MENUNGGU', 'PROSES', 'SELESAI') DEFAULT 'MENUNGGU',
  `catatan` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
