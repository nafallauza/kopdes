import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MapPin, CheckCircle2 } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';
import SectionTitle from '../SectionTitle/SectionTitle';

const LegalitasCard = () => {
  const { kopdesData } = useKopdes();

  const legalItems = [
    {
      title: "Nomor Badan Hukum",
      val: kopdesData.legal.badanHukum,
      sub: "Kementerian Hukum & HAM RI",
      icon: FileText
    },
    {
      title: "Wilayah Operasional",
      val: kopdesData.legal.wilayahKerja,
      sub: "Izin Usaha Kabupaten",
      icon: MapPin
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          subtitle="Kepastian Hukum"
          title="Legalitas & Badan Hukum"
          highlight="Resmi"
          description="Kopdes Merah Putih beroperasi secara sah dan memenuhi seluruh regulasi perundang-undangan Republik Indonesia."
          badge="Resmi & Legal"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {legalItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-7 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-red-50 text-primary border border-red-100 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6 stroke-[2]" />
                  </div>
                  
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.title}</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 leading-snug">{item.val}</h4>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-200 flex items-center gap-2 text-xs text-primary font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item.sub}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default LegalitasCard;
