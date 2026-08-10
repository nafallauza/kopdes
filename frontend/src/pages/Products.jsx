import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import CTA from '../components/CTA/CTA';
import { productsData } from '../data/dummyData';
import { Star, ShoppingBag } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', 'Hasil Tani', 'Saprotan', 'Olahan UMKM'];

  const filteredProducts = activeCategory === 'Semua'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

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
            Katalog Produk Desa
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Produk Tani & Olahan Unggulan
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Dukung petani lokal dan UMKM desa dengan mengonsumsi beras organik, pupuk kasgot, minyak VCO, dan madu murni.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary-600 text-white text-[11px] font-bold">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-amber-500 mb-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-700">{item.rating}</span>
                      </div>
                      <span className="text-emerald-600 font-semibold">Stok Ready</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 font-poppins line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    <div className="text-lg font-extrabold text-primary-700 font-poppins">
                      {item.price}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/6282145678900?text=Halo%20Koperasi,%20saya%20tertarik%20pesan%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-primary-600 text-slate-700 hover:text-white font-bold text-xs transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pesan via WA</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Products;
