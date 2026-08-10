# Backend Service - Koperasi Tani Pangan Mandiri

Boilerplate backend API RESTful menggunakan **Node.js, Express, dan JWT Authentication**. Siap dikembangkan oleh backend engineer.

---

## Struktur Folder App

```
backend/
├── app/
│   ├── config/          # Konfigurasi Database & Environment
│   ├── controllers/     # Controller penangan request endpoint
│   ├── middleware/      # Middleware auth JWT & global error handler
│   ├── models/          # Abstraksi model query data
│   ├── routes/          # Definisi routing API v1
│   ├── services/        # Business logic & integrasi (email, payment gateway)
│   ├── utils/           # Helper response JSON standar
│   └── validators/      # Input sanitization & validasi schema
├── uploads/             # Direktori simpan berkas/dokumen upload
├── logs/                # System log audit
├── package.json
└── server.js
```

---

## Cara Menjalankan

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Duplicate file .env.example menjadi .env
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Jalankan dev server dengan nodemon
npm run dev
```
