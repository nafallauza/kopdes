-- ============================================================
-- DATABASE SCHEMA: KOPERASI TANI PANGAN MANDIRI
-- Engine: MySQL 8.0+ / MariaDB 10.5+
-- ============================================================

CREATE DATABASE IF NOT EXISTS `kopdes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kopdes`;

-- 1. Tabel Users (Hanya Admin untuk CMS)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) UNIQUE NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN') DEFAULT 'ADMIN',
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel Kategori (Produk & Berita)
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nama_kategori` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(60) UNIQUE NOT NULL,
  `tipe` ENUM('PRODUK', 'BERITA', 'GALERI') NOT NULL
) ENGINE=InnoDB;

-- 3. Tabel Produk (Katalog Produk Hasil Tani & Saprotan)
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

-- 4. Tabel Berita / Artikel
CREATE TABLE IF NOT EXISTS `berita` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT UNSIGNED NOT NULL,
  `judul` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) UNIQUE NOT NULL,
  `ringkasan` TEXT NOT NULL,
  `konten` LONGTEXT NOT NULL,
  `gambar_cover` VARCHAR(255) NULL,
  `penulis` VARCHAR(100) DEFAULT 'Sekretariat',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 5. Tabel Galeri
CREATE TABLE IF NOT EXISTS `galeri` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kategori_id` INT UNSIGNED NOT NULL,
  `judul_foto` VARCHAR(150) NOT NULL,
  `url_gambar` VARCHAR(255) NOT NULL,
  `tanggal_kegiatan` DATE NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 6. Tabel Profil Koperasi
CREATE TABLE IF NOT EXISTS `profil_koperasi` (
  `id` INT UNSIGNED PRIMARY KEY DEFAULT 1,
  `nama_koperasi` VARCHAR(150) NOT NULL,
  `singkatan` VARCHAR(50) NOT NULL,
  `logo_url` VARCHAR(255) NULL,
  `deskripsi` TEXT NULL,
  `visi` TEXT NULL,
  `legal_json` JSON NULL,
  `kontak_json` JSON NULL,
  `pengurus_json` JSON NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
