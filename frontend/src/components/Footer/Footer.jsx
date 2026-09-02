import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Flag, ShieldCheck } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const Footer = () => {
  const { kopdesData } = useKopdes();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          
          {/* Column 1: Logo & Brief Profile */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={kopdesData.logo}
                alt={kopdesData.name}
                className="h-11 w-auto object-contain bg-white p-1 rounded-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-none text-white uppercase">
                  KOPDES {kopdesData.namaKoperasi || 'Desa Anda'}
                </span>
                <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mt-1">
                  Koperasi Desa Merah Putih
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {kopdesData.description}
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>Badan Hukum Resmi: {kopdesData.legal?.badanHukum}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Profil Kopdes
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="text-slate-400 hover:text-white transition-colors">
                  Unit Layanan Usaha
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-slate-400 hover:text-white transition-colors">
                  Galeri Dokumentasi
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-slate-400 hover:text-white transition-colors">
                  Portal Admin Kopdes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Social Media */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              Kontak Kantor Sekretariat
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{kopdesData.kontak?.alamat}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{kopdesData.kontak?.telepon} / {kopdesData.kontak?.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{kopdesData.kontak?.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Media Sosial Resmi</p>
              <div className="flex items-center gap-2.5">
                <a
                  href={kopdesData.kontak?.sosialMedia?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-primary transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={kopdesData.kontak?.sosialMedia?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-primary transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={kopdesData.kontak?.sosialMedia?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-primary transition-colors flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
          <p>© {new Date().getFullYear()} KOPDES {kopdesData.namaKoperasi || 'Desa Anda'}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-2">
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>Koperasi Desa Merah Putih Indonesia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
