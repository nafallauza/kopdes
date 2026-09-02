import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';
import SectionTitle from '../SectionTitle/SectionTitle';

const VisiMisi = () => {
  const { kopdesData } = useKopdes();

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          subtitle="Tujuan & Arah Gerak"
          title="Visi & Misi Kopdes"
          highlight="Merah Putih"
          badge="Prinsip Landasan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Visi Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-50 text-primary flex items-center justify-center mb-5 border border-red-100">
                <Target className="w-6 h-6 stroke-[2]" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary">Visi Utama</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-3">
                Kemandirian Ekonomi Desa 2030
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed italic">
                "{kopdesData.visi}"
              </p>
            </div>

            <div className="w-full h-1 bg-primary rounded-full mt-6"></div>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 bg-white p-7 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-50 text-primary flex items-center justify-center mb-5 border border-red-100">
                <Compass className="w-6 h-6 stroke-[2]" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-primary">Misi Kerja</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-5">
                Langkah Nyata Pemberdayaan Anggota
              </h3>

              <div className="space-y-3.5">
                {(typeof kopdesData.misi === 'string' ? kopdesData.misi.split('\n').filter(Boolean) : kopdesData.misi || []).map((misiText, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-red-50 text-primary border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      {misiText}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-1 bg-slate-200 rounded-full mt-6"></div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default VisiMisi;
