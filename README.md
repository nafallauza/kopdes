# Master Template - Website Koperasi Desa (KOPDES)

Template *website* siap pakai yang dirancang khusus untuk Koperasi Desa. Proyek ini dibangun menggunakan arsitektur modern (React + Supabase) yang memungkinkan *deployment* secara masal dan pengelolaan konten mandiri melalui CMS (*Content Management System*) bawaan.

---

## 🛠️ Teknologi yang Digunakan

### Frontend & UI
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **Animasi:** Framer Motion
- **Icons:** Lucide React

### Backend (BaaS)
- **Database & API:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Untuk Login Admin)
- **Storage:** Supabase Storage (Untuk Upload Gambar/Galeri)

---

## 📁 Struktur Direktori Utama

```
kopdes-web/
├── frontend/             # Kode utama aplikasi React (Frontend + CMS)
│   ├── src/
│   │   ├── components/   # Komponen UI (Navbar, Footer, Card, dll)
│   │   ├── context/      # State Management (KopdesContext menghubungkan React ke Supabase)
│   │   ├── pages/        # Halaman Publik & Halaman Admin (CMS)
│   │   └── ...
├── supabase_schema.sql   # Skrip SQL untuk membuat tabel & relasi di Supabase
├── .gitignore
└── README.md
```

## ✨ Fitur Utama (CMS)
Semua data pada *website* bersifat dinamis dan dapat diubah langsung oleh admin koperasi melalui halaman `/admin` tanpa perlu *coding*:
- **Profil Koperasi:** Mengubah nama, legalitas, visi, misi, dan deskripsi.
- **Visual & Branding:** Mengubah foto Hero dan logo koperasi.
- **Kontak & Lokasi:** Mengelola alamat, email, WhatsApp, dan peta (Google Maps Embed).
- **Pengurus:** Menambahkan daftar pengurus (Ketua, Sekretaris, Bendahara, Pengawas) beserta foto dan pesan singkat.
- **Layanan Usaha:** Menambah/mengedit unit layanan usaha koperasi.
- **Galeri Kegiatan:** Mengunggah dan menghapus foto-foto kegiatan koperasi langsung ke Supabase Storage.
