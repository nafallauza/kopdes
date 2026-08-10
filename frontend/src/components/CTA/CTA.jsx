import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserPlus, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../../data/dummyData';

const CTA = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden">
      
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-secondary-light/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Mari Bergabung Bersama Kami</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-white leading-tight mb-4">
              Siap Memajukan Ekonomi Desa & Pertanian Anda?
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed font-normal">
              Bergabunglah bersama lebih dari 5,000+ anggota aktif dan rasakan kemudahan pembiayaan syariah, simpanan transparan, serta kepastian pasar bagi produk tani Anda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto flex-shrink-0"
          >
            <Link
              to="/daftar"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-900 bg-accent hover:bg-amber-400 shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:-translate-y-1"
            >
              <UserPlus className="w-5 h-5" />
              <span>Daftar Anggota</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 rounded-2xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5 text-emerald-300" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
