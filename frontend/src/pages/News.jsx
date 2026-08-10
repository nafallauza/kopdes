import React from 'react';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard/NewsCard';
import CTA from '../components/CTA/CTA';
import { newsData } from '../data/dummyData';

const News = () => {
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
            Berita & Artikel
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Pusat Informasi & Edukasi Koperasi
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Temukan berita kegiatan terbaru, artikel panduan teknologi pertanian, pengumuman SHU, dan kisah inspiratif UMKM binaan.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <NewsCard key={news.id} news={news} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default News;
