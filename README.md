# Koperasi Tani Pangan Mandiri - Full-Stack Monorepo

Enterprise-ready full-stack repository untuk **Koperasi Tani Pangan Mandiri** (KTPM). Dibangun dengan arsitektur modular yang siap diteruskan dan dikembangkan oleh tim developer frontend & backend profesional.

---

## 📁 Struktur Direktori Utama

```
koperasi-app/
├── frontend/             # Single Page Application (React 18 + Vite + Tailwind CSS)
├── backend/              # Node.js + Express REST API Boilerplate
├── database/             # DDL SQL Schema, Seed Data & ERD Diagram
├── docs/                 # Panduan Pengembangan, API Spec & Deployment
├── .gitignore
└── README.md
```

---

## 🛠️ Teknologi Yang Gunakan

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS v3 (Custom Color Palette: `#2E7D32` Primary, `#66BB6A` Secondary, `#F9A825` Accent)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Statistics & Form:** `react-countup`, `react-intersection-observer`, `react-hook-form`

### Backend (Boilerplate)
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Auth:** JWT (JSON Web Token) & bcryptjs
- **Security:** Helmet, CORS, Morgan

### Database
- **Engine:** MySQL 8.0+ / MariaDB 10.5+
- **Schemas:** 10 Tabel Relasional (`users`, `anggota`, `simpanan`, `pinjaman`, `produk`, `berita`, `galeri`, `kategori`, `kontak`, `pengajuan`)

---

## 🚀 Cara Menjalankan Project

### 1. Menjalankan Frontend
```bash
cd frontend
npm install
npm run dev
```
Buka browser pada `http://localhost:3000`.

### 2. Menjalankan Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
API Service berjalan pada `http://localhost:5000`.

### 3. Build Production Frontend
```bash
cd frontend
npm run build
```

---

## 📚 Dokumentasi Lanjutan

- [Dokumentasi API](file:///docs/API.md)
- [Struktur Folder Detail](file:///docs/FolderStructure.md)
- [Panduan Development](file:///docs/DevelopmentGuide.md)
- [Panduan Deployment](file:///docs/Deployment.md)
- [Database ERD & SQL](file:///database/README.md)
