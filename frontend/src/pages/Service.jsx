import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { kopdesData } from '../data/dummyData';


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



        </div>
      </section>
    </div>
  );
};

export default Service;
