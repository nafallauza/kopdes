# Folder Structure & Architecture Reference

Dokumentasi hierarki struktur direktori dan pembagian tanggung jawab modul.

```
c:\Users\VICTUS\Downloads\pemeri\
├── frontend/                     # SPA React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── assets/               # Aset stasis (gambar, logo, ikon)
│   │   ├── components/           # Komponen UI reusable (Navbar, Hero, Footer, FeatureCard, StatisticCard, Gallery, Partner, CTA, NewsCard, Testimonial, ContactCard, SectionTitle)
│   │   ├── layouts/              # MainLayout wrapper
│   │   ├── pages/                # Page components (Home, About, Services, Products, News, GalleryPage, Contact, Login)
│   │   ├── routes/               # AppRoutes configuration
│   │   ├── hooks/                # Custom React Hooks (useScroll)
│   │   ├── context/              # Global React Context (AuthContext)
│   │   ├── services/             # API Fetch client wrapper
│   │   ├── utils/                # Helper formatter Rupiah & tanggal
│   │   ├── constants/            # Konstanta aplikasi & status HTTP
│   │   ├── data/                 # Dummy data terpusat
│   │   └── styles/               # CSS global & Tailwind directives
│   ├── package.json
│   └── vite.config.js
├── backend/                      # Service Node.js Express REST API
│   ├── app/
│   │   ├── config/               # DB Configuration
│   │   ├── controllers/          # Request Handler Logic
│   │   ├── middleware/           # Auth JWT & Global error handling
│   │   ├── models/               # Query abstraction models
│   │   ├── routes/               # Express API Router
│   │   ├── services/             # Third party integrations
│   │   ├── utils/                # Response helpers
│   │   └── validators/           # Request input validators
│   ├── uploads/                  # Upload directory
│   ├── logs/                     # System log directory
│   ├── package.json
│   └── server.js
├── database/                     # DDL/DML SQL Schemas & ERD
│   ├── schema.sql
│   ├── seed.sql
│   └── ERD.md
├── docs/                         # Technical documentation
│   ├── API.md
│   ├── FolderStructure.md
│   ├── Deployment.md
│   └── DevelopmentGuide.md
└── README.md
```
