import logoImg from '../assets/logo/logo.png';

export const kopdesData = {
  // Brand & Identity
  name: "Koperasi Desa Merah Putih",
  shortName: "Kopdes Merah Putih",
  branchName: "Kopdes Merah Putih - Desa Kertamukti",
  tagline: "Membangun Kemandirian Ekonomi Desa Berbasis Gotong Royong",
  logo: logoImg,

  // General Description
  description: "Koperasi Desa Merah Putih (Kopdes Merah Putih) adalah lembaga ekonomi desa berbasis gotong royong yang berkomitmen memperkuat kedaulatan pangan, mendampingi UMKM lokal, serta menyediakan layanan usaha terpadu bagi warga desa secara profesional, adil, dan terpercaya.",

  // Legal Status / Badan Hukum (2 Items)
  legal: {
    badanHukum: "AHU-0012845.AH.01.26 Tahun 2024",
    wilayahKerja: "Desa Kertamukti, Kec. Ciasem, Kab. Subang, Jawa Barat",
    statusKeanggotaan: "Terdaftar Resmi di Kementerian Koperasi & UKM RI",
  },

  // Vision & Mission
  visi: "Menjadi wadah ekonomi desa yang mandiri, berdaya saing tinggi, dan berlandaskan asas kekeluargaan demi terwujudnya kesejahteraan seluruh warga desa pada tahun 2030.",
  misi: [
    "Menyediakan sarana produksi pertanian dan kebutuhan bahan pokok berkualitas dengan harga adil.",
    "Mengembangkan unit simpan pinjam berbasis tata kelola sehat dan transparan.",
    "Memberikan pendampingan manajemen dan pemasaran bagi para pelaku UMKM dan usaha lokal desa.",
    "Membangun jaringan pemasaran langsung produk unggulan desa ke tingkat kabupaten dan nasional.",
  ],

  // Executive Board / Struktur Pengurus (4 Key Positions)
  pengurus: {
    ketua: {
      nama: "H. Suryana, S.P.",
      jabatan: "Ketua Pengurus",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      pesan: "Kopdes Merah Putih hadir sebagai benteng ekonomi desa untuk memastikan hasil jerih payah warga kembali untuk kesejahteraan bersama."
    },
    sekretaris: {
      nama: "Ahmad Budiman, S.T.",
      jabatan: "Sekretaris",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      pesan: "Kedisiplinan administrasi dan digitalisasi layanan menjadi kunci utama keterbukaan informasi bagi seluruh anggota."
    },
    bendahara: {
      nama: "Hj. Siti Aminah, S.E.",
      jabatan: "Bendahara",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      pesan: "Pengelolaan dana modal usaha dan simpanan anggota dilakukan secara akuntabel, transparan, dan terukur."
    },
    pengawas: {
      nama: "Drs. H. Mulyadi, M.Si.",
      jabatan: "Ketua Pengawas",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      pesan: "Kami memastikan seluruh operasional Kopdes Merah Putih senantiasa mematuhi regulasi hukum dan AD/ART koperasi."
    }
  },

  // Services Units (Max 9 Units)
  layanan: [
    {
      id: "simpan-pinjam",
      title: "Unit Simpan Pinjam Desa",
      icon: "Wallet",
      description: "Layanan simpanan anggota dan pembiayaan modal kerja dengan tata kelola adil, transparan, serta tanpa biaya administrasi tersembunyi.",
      features: ["Simpanan Pokok & Wajib", "Pembiayaan Modal Usaha", "Proses Cepat & Transparan"]
    },
    {
      id: "kios-saprotan",
      title: "Kios Saprotan & Sembako Desa",
      icon: "ShoppingBag",
      description: "Penyediaan benih unggul, pupuk resmi, pestisida, dan pasokan bahan pokok dengan harga distributor bagi anggota.",
      features: ["Harga Distributor Resmi", "Skema Bayar Panen", "Jaminan Kualitas Mutu"]
    },
    {
      id: "offtaker-panen",
      title: "Offtaker & Pemasaran Panen",
      icon: "Wheat",
      description: "Penyerapan langsung hasil pertanian dan perkebunan warga desa untuk disalurkan ke jaringan pasar induk dan industri.",
      features: ["Harga Acuan Adil", "Penimbangan Digital Jujur", "Pembayaran Tepat Waktu"]
    },
    {
      id: "sewa-alsintan",
      title: "Sewa Alat Tani Modern (Alsintan)",
      icon: "Tractor",
      description: "Penyewaan mesin tractor roda 4, combine harvester, dan alat semprot presisi untuk menghemat biaya operasional olah lahan.",
      features: ["Mesin Berperforma Tinggi", "Operator Berpengalaman", "Tarif Sewa Khusus Anggota"]
    },
    {
      id: "klinik-umkm",
      title: "Pendampingan & Klinik UMKM",
      icon: "Store",
      description: "Edukasi kemasan produk, pengurusan izin PIRT/Halal, dan pembukuan keuangan bagi pelaku usaha mikro pedesaan.",
      features: ["Pelatihan Rutin", "Fasilitasi Izin PIRT/Halal", "Konsultasi Usaha Gratis"]
    },
    {
      id: "logistik-desa",
      title: "Unit Distribusi & Logistik",
      icon: "Truck",
      description: "Armada pengangkutan hasil panen dan pasokan sembako langsung dari gudang pusat ke pos-pos Dusun.",
      features: ["Armada Pengangkut Desa", "Pengiriman Tepat Waktu", "Jangkauan Seluruh Dusun"]
    },
    {
      id: "tabungan-berjangka",
      title: "Tabungan Berjangka Qurban & Pendidikan",
      icon: "PiggyBank",
      description: "Program tabungan terencana bagi anggota untuk persiapan hari raya, qurban tahunan, dan biaya sekolah anak.",
      features: ["Akad Amanah", "Bagi Hasil Tahunan", "Setoran Fleksibel"]
    },
    {
      id: "konsultasi-hukum",
      title: "Layanan Legalitas Usaha",
      icon: "ShieldCheck",
      description: "Bantuan fasilitasi legalitas Nomor Induk Berusaha (NIB) dan sertifikasi standar bagi kelompok usaha warga.",
      features: ["Pembuatan NIB Gratis", "Pendampingan Berkas", "Kerjasama Dinas Terkait"]
    },
    {
      id: "layanan-digital",
      title: "Informasi & Layanan Digital Kopdes",
      icon: "Smartphone",
      description: "Kios informasi digital untuk pengecekan data anggota, informasi program bantuan, dan pengajuan layanan.",
      features: ["Portal Informasi Resmi", "Cek Saldo Cepat", "Kirim Pesan WhatsApp"]
    }
  ],

  // Gallery Items
  galeri: [
    {
      id: 1,
      title: "Musyawarah Anggota Tahunan & Pembagian SHU Kopdes Merah Putih",
      caption: "Pelaksanaan Musyawarah Anggota Tahunan (RAT) dihadiri oleh tokoh masyarakat dan pengurus Dinas Koperasi.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      date: "15 Maret 2026"
    },
    {
      id: 2,
      title: "Panen Raya Padi Bersama Kelompok Tani Binaan Kopdes",
      caption: "Kegiatan panen raya padi varietas unggul hasil pendampingan pupuk organik dari unit saprotan Kopdes.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      date: "28 April 2026"
    },
    {
      id: 3,
      title: "Pelatihan Pengemasan Produk Keripik & Sambal UMKM Desa",
      caption: "Workshop desain kemasan modern dan higienitas pangan untuk ibu-ibu pelaku UMKM Desa Kertamukti.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      date: "10 Mei 2026"
    },
    {
      id: 4,
      title: "Penyerahan Unit Alsintan Tractor Roda 4 Baru",
      caption: "Penyerahan operasional Tractor Roda 4 bantuan kemitraan untuk disewakan kepada petani anggota.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
      date: "02 Juni 2026"
    },
    {
      id: 5,
      title: "Penyaluran Sembako Murah Bulan Ramadhan",
      caption: "Pasokan bahan pokok murah berkualitas disalurkan langsung di balai desa untuk seluruh warga.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
      date: "20 Juni 2026"
    },
    {
      id: 6,
      title: "Kunjungan Kerja Tim Pengawas & Dinas Koperasi Kabupaten",
      caption: "Inspeksi rutin dan verifikasi administrasi pembukuan oleh tim pengawas independen.",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      date: "12 Juli 2026"
    }
  ],

  // Contact & Location (with Google Maps Embed & Direct Link)
  kontak: {
    alamat: "Jl. Balai Desa Kertamukti No. 01, RT 04/RW 02, Kec. Ciasem, Kab. Subang, Jawa Barat 41256",
    telepon: "(0260) 450-889",
    whatsapp: "+62 821-2233-4455",
    email: "info@kopdesmerahputih.id",
    jamKerja: "Senin - Sabtu: 08.00 - 15.00 WIB",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126830.07604473855!2d107.65!3d-6.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6945a0b7!2sDesa%20Kertamukti%2C%20Ciasem%2C%20Subang!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    googleMapsLink: "https://maps.google.com/?q=Desa+Kertamukti+Ciasem+Subang",
    sosialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    }
  }
};
