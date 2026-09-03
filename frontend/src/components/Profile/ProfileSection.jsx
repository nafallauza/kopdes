import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, ExternalLink, Building2 } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';
import SectionTitle from '../SectionTitle/SectionTitle';

const ProfileSection = () => {
  const { kopdesData } = useKopdes();

  return (
    <section id="tentang" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div id="profil-section" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          subtitle="Profil Lembaga"
          title="Tentang Koperasi Desa"
          highlight="Merah Putih"
          description="Lembaga ekonomi berbasis kekeluargaan yang didirikan untuk mengangkat harkat ekonomi warga desa."
          badge="Profil Resmi"
        />

        {/* Section 1: Story & Brand Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left Text Story */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              Mewujudkan Kesejahteraan Warga Melalui Tata Kelola Usaha Terpadu
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {kopdesData.description}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Kehadiran Kopdes Merah Putih menjadi wujud komitmen bersama antara pemerintah dan masyarakat desa dalam menciptakan ekosistem usaha pedesaan yang sehat, mandiri, dan transparan.
            </p>

            {/* Quick Status Cards */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Wilayah Operasional</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{kopdesData.legal.wilayahKerja}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Status Keanggotaan</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{kopdesData.legal.statusKeanggotaan}</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Brand Badge Image Frame */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50 p-7 rounded-xl border border-slate-200 text-center">
              <img
                src={kopdesData.logo}
                alt={kopdesData.name}
                className="h-24 sm:h-28 w-auto object-contain mx-auto mb-4"
              />
              <h4 className="text-base font-bold text-slate-900">{kopdesData.name}</h4>
              <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">{kopdesData.tagline}</p>
              
              <div className="w-full mt-5 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Badan Hukum:</strong> {kopdesData.legal.badanHukum}</p>
                <p><strong>Wilayah Kerja:</strong> {kopdesData.legal.wilayahKerja}</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section 2: Address & Google Maps Embed Integration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Address Details & Google Maps Button */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-slate-200 text-xs font-bold text-slate-800">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span>Lokasi Sekretariat Kopdes</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">Alamat Kantor Resmi</h3>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                {kopdesData.kontak.alamat}
              </p>

              <div className="pt-2">
                <a
                  href={kopdesData.kontak.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary-700 shadow-sm transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Interactive Google Maps Iframe */}
            <div className="lg:col-span-7">
              <div className="w-full h-64 sm:h-72 rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-200">
                <iframe
                  title="Google Maps Lokasi Kopdes"
                  src={kopdesData.kontak.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProfileSection;
