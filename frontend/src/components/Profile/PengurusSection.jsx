import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';
import SectionTitle from '../SectionTitle/SectionTitle';

const PengurusSection = () => {
  const { kopdesData } = useKopdes();

  const pengurusList = [
    { key: 'ketua', title: 'Ketua Pengurus', badge: 'Ketua', color: 'bg-primary text-white' },
    { key: 'sekretaris', title: 'Sekretaris', badge: 'Sekretaris', color: 'bg-slate-900 text-white' },
    { key: 'bendahara', title: 'Bendahara', badge: 'Bendahara', color: 'bg-slate-800 text-white' },
    { key: 'pengawas', title: 'Ketua Pengawas', badge: 'Pengawas', color: 'bg-red-700 text-white' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          subtitle="Struktur Organisasi"
          title="Struktur Pengurus & Pengawas"
          highlight="Kopdes"
          description="Para pengemban amanah yang bertanggung jawab mengelola operasional dan mengawasi jalannya usaha koperasi."
          badge="Manajemen Resmi"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pengurusList.map((item, index) => {
            const data = kopdesData.pengurus[item.key];
            if (!data) return null;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative aspect-[4/4] bg-slate-100 overflow-hidden border-b border-slate-200">
                    <img
                      src={data.foto}
                      alt={data.nama}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${item.color}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{data.jabatan}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 line-clamp-1">
                      {data.nama}
                    </h4>

                    {data.pesan && (
                      <p className="text-slate-600 text-xs mt-2.5 leading-relaxed italic line-clamp-3">
                        "{data.pesan}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-4 pt-0 border-t border-slate-100 mt-auto">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Pengurus Resmi Kopdes Merah Putih
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PengurusSection;
