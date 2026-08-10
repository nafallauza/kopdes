import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import CTA from '../components/CTA/CTA';
import { servicesData, faqData } from '../data/dummyData';
import * as Icons from 'lucide-react';
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
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
            Layanan Unggulan
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Solusi Keuangan & Usaha Tani Terpadu
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Simpanan amanah, pembiayaan modal usaha bebas riba, penyediaan pupuk, hingga jaminan penyerapan hasil panen.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const IconComp = Icons[service.icon] || Icons.Wallet;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white rounded-3xl border border-slate-100 p-8 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
                        <IconComp className="w-7 h-7 stroke-[2]" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-accent-50 text-amber-700 text-xs font-bold border border-amber-200">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.shortDesc}</p>

                    <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary-dark flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/daftar"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-all shadow-md"
                  >
                    <span>Ajukan Layanan Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Pertanyaan Umum"
            title="Sering Ditanyakan (FAQ)"
            badge="Bantuan"
          />

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <h4 className="text-base font-bold text-slate-900 font-poppins flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-slate-600 text-sm mt-2 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Services;
