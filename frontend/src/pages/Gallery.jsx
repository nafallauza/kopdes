import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import { kopdesData } from '../data/dummyData';
import { X, Calendar } from 'lucide-react';

const Gallery = () => {
  const [activeItem, setActiveItem] = useState(null);

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
            Dokumentasi Kegiatan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Galeri Kopdes Merah Putih
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Dokumentasi foto dan rekaman kegiatan musyawarah, panen raya, pelatihan UMKM, serta pelayanan lapangan.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Momen Lapangan"
            title="Dokumentasi & Aktivitas Desa"
            highlight="Terbaru"
            badge="Dokumentasi Resmi"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kopdesData.galeri.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onClick={(selected) => setActiveItem(selected)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Tutup Preview"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info Details */}
              <div className="p-6 bg-slate-900 text-white">
                <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeItem.date}</span>
                </div>
                <h3 className="text-lg font-bold font-poppins text-white">{activeItem.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">{activeItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
