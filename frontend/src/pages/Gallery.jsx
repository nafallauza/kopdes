import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import GalleryCard from '../components/GalleryCard/GalleryCard';
import { useKopdes } from '../context/KopdesContext';
import { X, Calendar, Play } from 'lucide-react';

const Gallery = () => {
  const { kopdesData } = useKopdes();
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="pt-24 lg:pt-32">
      {/* Banner Title */}
      <section className="py-14 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded bg-red-500/20 text-red-300 text-xs font-bold uppercase mb-3 border border-red-500/30">
            Dokumentasi Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Galeri Kopdes Merah Putih
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Dokumentasi foto dan video kegiatan musyawarah, panen raya, pelatihan UMKM, serta pelayanan lapangan.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Momen Lapangan"
            title="Dokumentasi & Aktivitas Desa"
            highlight="Terbaru"
            badge="Dokumentasi Resmi"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-md bg-slate-800 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Tutup Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Frame (Foto vs Video) */}
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
                {activeItem.mediaType === 'video' || (activeItem.url && activeItem.url.includes('youtube')) ? (
                  <iframe
                    src={activeItem.url.replace('watch?v=', 'embed/')}
                    title={activeItem.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Info Details */}
              <div className="p-5 bg-slate-900 text-white border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs text-red-400 font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeItem.date}</span>
                </div>
                <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">{activeItem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
