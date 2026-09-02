import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({
  subtitle,
  title,
  highlight,
  description,
  align = 'center',
  badge,
  light = false
}) => {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto';
  
  return (
    <div className={`flex flex-col max-w-3xl mb-10 sm:mb-12 ${alignClass}`}>

      <h2
        className={`text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h2>

      {description && (
        <p
          className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
            light ? 'text-slate-200' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}

      <div
        className={`h-0.5 rounded-full mt-3 bg-primary ${
          align === 'left' ? 'w-12' : 'w-16'
        }`}
      />
    </div>
  );
};

export default SectionTitle;
