import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import Hero from '../components/Hero/Hero';
import ProfileSection from '../components/Profile/ProfileSection';
import VisiMisi from '../components/Profile/VisiMisi';
import LegalitasCard from '../components/Profile/LegalitasCard';
import PengurusSection from '../components/Profile/PengurusSection';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import { useKopdes } from '../context/KopdesContext';

const Home = () => {
  const { kopdesData } = useKopdes();
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Unit Usaha Terpadu"
            title="Layanan Utama Koperasi"
            highlight="Desa"
            description="Beberapa unit usaha prioritas Kopdes Merah Putih yang melayani kebutuhan warga desa."
            badge="Unit Layanan"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-700 font-bold text-xs shadow-sm transition-colors"
            >
              <span>Lihat Seluruh Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
