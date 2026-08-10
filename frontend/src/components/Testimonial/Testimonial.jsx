import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { testimonialsData } from '../../data/dummyData';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft-lg border border-slate-100 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 lg:gap-12"
            >
              <Quote className="absolute top-6 right-8 w-24 h-24 text-primary-50 fill-primary-50/50 pointer-events-none -rotate-12" />

              <div className="flex flex-col items-center text-center md:w-1/3 flex-shrink-0">
                <div className="relative mb-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-md">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 bg-gradient-to-r from-primary-600 to-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                    Verifikasi
                  </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 font-poppins">{current.name}</h4>
                <p className="text-xs font-semibold text-primary-600 mb-1">{current.role}</p>
                <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>{current.location}</span>
                </div>

                <div className="flex items-center gap-1 mt-3 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="md:w-2/3 flex flex-col justify-between">
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal italic relative z-10">
                  "{current.quote}"
                </p>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Anggota Koperasi Terverifikasi
                  </span>

                  <div className="flex items-center gap-2">
                    {testimonialsData.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'w-8 bg-primary-600' : 'w-2.5 bg-slate-200'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 focus:outline-none z-20"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-200 focus:outline-none z-20"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonial;
