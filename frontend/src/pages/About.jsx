import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import StatisticCard from '../components/StatisticCard/StatisticCard';
import Partner from '../components/Partner/Partner';
import CTA from '../components/CTA/CTA';
import { profileData, keunggulanData } from '../data/dummyData';
import { Target, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import FeatureCard from '../components/FeatureCard/FeatureCard';

const About = () => {
  return (
    <div className="pt-24 lg:pt-32">
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-slate-950/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-4"
          >
            Tentang Koperasi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Sejarah, Visi & Komitmen Kami
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Mengenal lebih dekat Koperasi Tani Pangan Mandiri dalam memajukan kedaulatan pangan dan perekonomian pedesaan.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase text-primary-600 tracking-wider">Perjalanan 15 Tahun</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-poppins leading-tight">
                Dari Kelompok Tani Kecil Menjadi Koperasi Digital Terpercaya
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {profileData.description}
              </p>
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-3">
                <h4 className="font-bold text-emerald-900 font-poppins flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Legalitas & Pengawasan Resmi
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <li>• Izin Usaha Koperasi No. 503/KOP-142/2011</li>
                  <li>• Terdaftar Resmi di Kementerian Koperasi & UKM RI</li>
                  <li>• Sertifikasi Pengawas Syariah No. 042/DSN-MUI/2018</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-slate-100">
                <img
                  src={profileData.image}
                  alt="Tentang Koperasi Tani Pangan Mandiri"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Landasan Operasional"
            title="Visi & Misi Strategis"
            badge="Prinsip Utama"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mb-6 shadow-md">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-poppins mb-3">{profileData.visi.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed">{profileData.visi.description}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft">
              <div className="w-14 h-14 rounded-2xl bg-accent text-slate-900 flex items-center justify-center mb-6 shadow-md">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-poppins mb-3">Misi Utama Kami</h3>
              <div className="space-y-3">
                {profileData.misi.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <p className="text-slate-600 text-sm">{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Keunggulan"
            title="6 Nilai Utama Koperasi"
            badge="Keunggulan"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keunggulanData.map((item, idx) => (
              <FeatureCard key={item.id} title={item.title} description={item.description} iconName={item.icon} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <StatisticCard />
      <Partner />
      <CTA />
    </div>
  );
};

export default About;
