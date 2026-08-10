import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { kopdesData } from '../data/dummyData';
import { Building2, Phone } from 'lucide-react';

const Service = () => {
  // Display max 9 unit services as requested
  const servicesList = kopdesData.layanan.slice(0, 9);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Banner Title */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-slate-900 to-slate-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase mb-4"
          >
            Koperasi Desa Merah Putih
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Unit Layanan & Usaha Koperasi
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Daftar unit layanan usaha resmi Kopdes Merah Putih untuk melayani dan memberdayakan masyarakat desa.
          </p>
        </div>
      </section>

      {/* Services Grid (Max 9) */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Fasilitas & Program Usaha"
            title="Daftar Unit Layanan Usaha"
            highlight="Tersedia"
            description="Kopdes Merah Putih mengelola unit layanan terpilih sesuai kebutuhan sosial-ekonomi warga desa setempat."
            badge="Profil Unit Usaha"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                iconName={service.icon}
                features={service.features}
                index={index}
              />
            ))}
          </div>

          {/* Consultation Box */}
          <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-primary flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-poppins">Butuh Informasi Pengajuan Layanan?</h4>
                <p className="text-xs text-slate-600">Pengurus Kopdes Merah Putih siap melayani konsultasi pendaftaran dan keanggotaan.</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${kopdesData.kontak.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-600 shadow-md shadow-red-500/20 transition-all flex-shrink-0"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Pengurus WA</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Service;
