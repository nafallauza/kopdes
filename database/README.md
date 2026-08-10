# Database Blueprint - Koperasi Tani Pangan Mandiri

Folder ini berisi seluruh rancangan DDL SQL, seed data awal, serta dokumentasi ERD untuk sistem **Koperasi Tani Pangan Mandiri**.

---

## Isi Berkas

- `schema.sql`: Script DDL pembuat tabel basis data MySQL / MariaDB (10 tabel utama).
- `seed.sql`: Script DML data awal (master data kategori, user admin, anggota demo, dan produk).
- `ERD.md`: Diagram relasi entitas Mermaid.

---

## Cara Import ke Database Local

```bash
# 1. Masuk ke terminal MySQL / MariaDB
mysql -u root -p

# 2. Eksekusi file schema.sql
SOURCE c:/Users/VICTUS/Downloads/pemeri/database/schema.sql;

# 3. Eksekusi file seed.sql
SOURCE c:/Users/VICTUS/Downloads/pemeri/database/seed.sql;
```
