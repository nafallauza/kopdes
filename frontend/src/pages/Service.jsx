import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { useKopdes } from '../context/KopdesContext';
import { Building2, Phone } from 'lucide-react';

const Service = () => {
  const { kopdesData } = useKopdes();
  const servicesList = kopdesData.layanan.slice(0, 9);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Banner Title */}
      <section className="py-14 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Unit Layanan & Usaha Koperasi
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Daftar unit layanan usaha resmi Kopdes Merah Putih untuk melayani dan memberdayakan masyarakat desa.
          </p>
        </div>
      </section>

      {/* Services Grid (Max 9) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Fasilitas & Program Usaha"
            title="Daftar Unit Layanan Usaha"
            highlight="Tersedia"
            description="Kopdes Merah Putih mengelola unit layanan terpilih sesuai kebutuhan sosial-ekonomi warga desa setempat."
            badge="Profil Unit Usaha"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="mt-12 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-primary border border-red-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Butuh Informasi Pengajuan Layanan?</h4>
                <p className="text-xs text-slate-600">Pengurus Kopdes Merah Putih siap melayani konsultasi pendaftaran dan keanggotaan.</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${kopdesData.kontak.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-700 shadow-sm transition-colors flex-shrink-0"
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
