# Deployment & Production Guide

Panduan panduan deployment ke server produksi (VPS Ubuntu Server + Nginx + PM2).

---

## 1. Build Frontend

```bash
cd frontend
npm run build
```
Hasil build bundel statis tersimpan di `frontend/dist`.

---

## 2. Setup Nginx Reverse Proxy & Static Host

Contoh konfigurasi Nginx (`/etc/nginx/sites-available/koperasi`):

```nginx
server {
    listen 80;
    server_name koperasi.tanipanganmandiri.com;

    root /var/www/koperasi/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 3. Menjalankan Backend dengan PM2

```bash
cd /var/www/koperasi/backend
npm install --production
pm2 start server.js --name "koperasi-backend"
pm2 save
```
