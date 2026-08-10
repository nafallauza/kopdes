import React from 'react';
import { motion } from 'framer-motion';
import { partnersData } from '../../data/dummyData';
import { Building2, ShieldCheck, Landmark, Wheat, Store } from 'lucide-react';

const partnerIcons = [Building2, Landmark, ShieldCheck, Wheat, Store, Building2];

const Partner = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          Telah Dipercaya & Bekerjasama Dengan Lembaga Resmi
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partnersData.map((partner, index) => {
            const IconComp = partnerIcons[index % partnerIcons.length];
            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 hover:border-primary-200 bg-slate-50/50 hover:bg-white hover:shadow-soft transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-200/60 text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110">
                  <IconComp className="w-6 h-6 stroke-[1.8]" />
                </div>
                
                <h4 className="text-xs font-bold text-slate-600 group-hover:text-primary-700 text-center line-clamp-1 transition-colors">
                  {partner.name}
                </h4>
                <span className="text-[10px] font-semibold text-slate-400 group-hover:text-primary-500 mt-0.5">
                  {partner.category}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Partner;
