# API Documentation - Koperasi Tani Pangan Mandiri

Spesifikasi endpoint RESTful API v1 untuk integrasi Frontend & Mobile App.

---

## Base URL

`http://localhost:5000/api/v1`

---

## 1. Authentication Endpoints

### `POST /auth/register`
Mendaftarkan akun anggota baru.

**Request Body:**
```json
{
  "name": "Ahmad Budiman",
  "phone": "082198765432",
  "password": "secretpassword",
  "category": "PETANI"
}
```

### `POST /auth/login`
Autentikasi masuk anggota/pengurus.

**Request Body:**
```json
{
  "phone": "082198765432",
  "password": "secretpassword"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "phone": "082198765432",
      "role": "ANGGOTA"
    }
  }
}
```

---

## 2. Anggota Endpoints

### `GET /anggota`
*(Protected: Authorization Bearer Token)*  
Mengambil daftar anggota terdaftar.

### `GET /anggota/:id`
*(Protected: Authorization Bearer Token)*  
Mengambil detail informasi profil anggota.
