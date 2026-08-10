import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Building2, Flag } from 'lucide-react';
import { kopdesData } from '../../data/dummyData';

const Hero = () => {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 border border-red-200 text-primary text-xs font-bold mb-5">
              <Flag className="w-3.5 h-3.5" />
              <span>{kopdesData.name}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-5">
              Pilar Ekonomi Desa <br className="hidden sm:block" />
              <span className="text-primary">Berbasis Gotong Royong</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              Selamat datang di portal resmi <strong className="text-slate-900 font-semibold">{kopdesData.branchName}</strong>. Lembaga ekonomi terpadu untuk pelayanan usaha warga, pemberdayaan anggota, dan ketahanan pangan pedesaan.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="#profil-section"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-700 shadow-sm transition-colors"
              >
                <span>Profil Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-primary" />
                <span>Unit Layanan Usaha</span>
              </Link>
            </div>

            {/* Micro Legal Info */}
            <div className="flex items-center gap-2 pt-5 border-t border-slate-200 w-full text-xs font-semibold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Badan Hukum Resmi: {kopdesData.legal.badanHukum}</span>
            </div>

          </motion.div>

          {/* Right Corporate Image Frame */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Aktivitas Kopdes Merah Putih"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center border-t border-slate-100 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-left">
                  <img src={kopdesData.logo} alt="Logo" className="h-8 w-auto object-contain" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{kopdesData.shortName}</h4>
                    <p className="text-[11px] text-slate-500">{kopdesData.legal.wilayahKerja}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                  Instansi Resmi
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
