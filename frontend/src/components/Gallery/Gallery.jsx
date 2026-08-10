import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Calendar, Tag } from 'lucide-react';
import { galleryData } from '../../data/dummyData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeModalImage, setActiveModalImage] = useState(null);

  const categories = ['Semua', 'Pertanian', 'UMKM', 'Kegiatan', 'Teknologi', 'Kemitraan'];

  const filteredGallery = selectedCategory === 'Semua'
    ? galleryData
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-soft hover:shadow-card-hover border border-slate-100 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveModalImage(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-slate-950 text-xs font-extrabold self-start mb-2">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                    <h4 className="text-white font-bold text-base leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {item.date}
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 block group-hover:hidden sm:hidden bg-white">
                  <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider">{item.category}</span>
                  <h4 className="text-slate-900 font-bold text-sm line-clamp-1 mt-0.5">{item.title}</h4>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={activeModalImage.image}
                  alt={activeModalImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white">
                <span className="px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-bold uppercase">
                  {activeModalImage.category}
                </span>
                <h3 className="text-xl font-bold mt-2 font-poppins">{activeModalImage.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{activeModalImage.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
