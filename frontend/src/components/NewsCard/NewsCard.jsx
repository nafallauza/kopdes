import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const NewsCard = ({ news, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            {news.category}
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-500" />
              <span>{news.date}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-500" />
              <span>{news.readTime}</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-3 leading-snug">
            <Link to={`/berita/${news.id}`}>
              {news.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
            {news.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 sm:px-7 pb-6 pt-0 border-t border-slate-100/60 mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span>{news.author}</span>
        </div>

        <Link
          to={`/berita/${news.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Baca Selengkapnya</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </motion.article>
  );
};

export default NewsCard;
