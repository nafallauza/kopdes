import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const FeatureCard = ({ title, description, iconName, index }) => {
  const IconComponent = Icons[iconName] || Icons.CheckCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-primary-50/50 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-125 group-hover:bg-primary-100/50 transition-all duration-500 pointer-events-none"></div>

      <div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-primary-700 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-primary-600/30">
          <IconComponent className="w-8 h-8 stroke-[2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors duration-200 mb-3">
          {title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="w-12 h-1 rounded-full bg-slate-200 mt-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent transition-all duration-500"></div>
    </motion.div>
  );
};

export default FeatureCard;
