import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { statisticsData } from '../../data/dummyData';

const StatisticCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-emerald-200 border border-white/20 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-md"
          >
            Dampak Real & Terukur
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white font-poppins"
          >
            Pencapaian & Integritas Koperasi Kami
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => {
            const IconComponent = Icons[stat.icon] || Icons.CheckCircle;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative bg-white/10 backdrop-blur-md border border-white/15 p-8 rounded-3xl text-center group hover:bg-white/15 transition-all duration-300 shadow-xl"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/15 text-accent flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-primary-800 transition-all duration-300 shadow-md">
                  <IconComponent className="w-7 h-7 stroke-[2]" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-poppins text-white tracking-tight mb-2">
                  {inView ? (
                    <CountUp end={stat.count} duration={2.5} separator="." />
                  ) : (
                    '0'
                  )}
                  <span className="text-accent ml-0.5">{stat.suffix}</span>
                </div>

                <h3 className="text-lg font-bold text-emerald-100 font-poppins mb-1">
                  {stat.label}
                </h3>

                <p className="text-xs text-emerald-200/80 font-medium">
                  {stat.subtext}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default StatisticCard;
