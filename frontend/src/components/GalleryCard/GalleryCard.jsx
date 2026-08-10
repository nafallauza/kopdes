import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const GalleryCard = ({ item, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
      onClick={() => onClick(item)}
    >
      <div>
        {/* Media Frame */}
        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-200">
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Caption */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{item.date}</span>
          </div>

          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mb-1.5">
            {item.title}
          </h4>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
