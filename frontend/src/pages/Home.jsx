import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';

import Hero from '../components/Hero/Hero';
import ProfileSection from '../components/Profile/ProfileSection';
import VisiMisi from '../components/Profile/VisiMisi';
import LegalitasCard from '../components/Profile/LegalitasCard';
import PengurusSection from '../components/Profile/PengurusSection';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { kopdesData } from '../data/dummyData';

const Home = () => {
  // Show first 3 featured services on home page
  const featuredServices = kopdesData.layanan.slice(0, 3);

  return (
    <>
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. PROFIL DESKRIPSI KOPDES */}
      <ProfileSection />

      {/* 3. VISI & MISI */}
      <VisiMisi />

      {/* 4. BADAN HUKUM & LEGALITAS */}
      <LegalitasCard />

      {/* 5. STRUKTUR PENGURUS & PENGAWAS (KETUA, SEKRETARIS, BENDAHARA, PENGAWAS) */}
      <PengurusSection />

      {/* 6. HIGHLIGHT LAYANAN UTAMA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Unit Usaha Terpadu"
            title="Layanan Utama Koperasi"
            highlight="Desa"
            description="Beberapa unit usaha prioritas Kopdes Merah Putih yang melayani kebutuhan warga desa."
            badge="Unit Layanan"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                iconName={service.icon}
                features={service.features}
                index={idx}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/layanan"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white hover:bg-primary-600 font-bold text-sm shadow-md shadow-red-500/20 transition-all duration-200"
            >
              <span>Lihat Seluruh Layanan ({kopdesData.layanan.length} Unit)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
