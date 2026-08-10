# Development Guide - Koperasi Tani Pangan Mandiri

Panduan pengembangan lokal bagi developer tim Frontend & Backend.

---

## 1. Lingkungan Pengembangan (Prerequisites)

- **Node.js**: `v18.x` atau `v20.x` (LTS)
- **npm**: `v9.x` atau `v10.x`
- **Database**: MySQL `8.0` / MariaDB `10.5`

---

## 2. Langkah Setup Pertama Kali

```bash
# Clone repository
git clone <repository-url>
cd pemeri

# Setup Frontend
cd frontend
npm install
npm run dev

# Setup Backend (Terminal Baru)
cd ../backend
cp .env.example .env
npm install
npm run dev
```

---

## 3. Konvensi Kode (Coding Standards)

1. **Frontend**:
   - Komponen React ditulis sebagai Functional Components dengan React Hooks.
   - Menggunakan Tailwind CSS utility classes (bebas inline styles).
   - Seluruh data dummy wajib diletakkan di `frontend/src/data/dummyData.js`.
2. **Backend**:
   - Mengikuti pola Controller-Service-Model.
   - Format response JSON wajib menggunakan `responseHandler.js`.
