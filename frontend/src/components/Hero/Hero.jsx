import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Building2, Flag } from 'lucide-react';
import { kopdesData } from '../../data/dummyData';

const Hero = () => {
  return (
    <section 
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-slate-200"
      style={{
        backgroundImage: 'url("/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-900/70 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-left">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start"
          >
            {/* National Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-red-100 text-xs font-bold mb-5 backdrop-blur-sm">
              <Flag className="w-3.5 h-3.5" />
              <span>{kopdesData.name}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-5">
              Pilar Ekonomi Desa <br className="hidden sm:block" />
              <span className="text-red-400">Berbasis Gotong Royong</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-slate-300 font-normal leading-relaxed max-w-2xl mb-8 text-left">
              Selamat datang di portal resmi <strong className="text-white font-semibold">{kopdesData.branchName}</strong>. Lembaga ekonomi terpadu untuk pelayanan usaha warga, pemberdayaan anggota, dan ketahanan pangan pedesaan.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 w-full sm:w-auto mb-8">
              <a
                href="#profil-section"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-700 shadow-sm transition-colors"
              >
                <span>Profil Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/layanan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm shadow-sm transition-colors"
              >
                <Building2 className="w-4 h-4 text-white" />
                <span>Unit Layanan Usaha</span>
              </Link>
            </div>

            {/* Micro Legal Info */}
            <div className="flex items-center justify-start gap-2 pt-5 border-t border-slate-500/30 w-full text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Badan Hukum Resmi: {kopdesData.legal.badanHukum}</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
