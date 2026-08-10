import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

const ServiceCard = ({ title, description, iconName, features, index }) => {
  const IconComponent = Icons[iconName] || Icons.Building2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-red-50 text-primary border border-red-100 flex items-center justify-center mb-4">
          <IconComponent className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="space-y-2 border-t border-slate-100 pt-3.5 mb-2">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-1 bg-red-100 rounded-full mt-2"></div>
    </motion.div>
  );
};

export default ServiceCard;
