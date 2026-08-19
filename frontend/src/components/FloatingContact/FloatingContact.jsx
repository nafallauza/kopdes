import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const FloatingContact = () => {
  const { kopdesData } = useKopdes();
  const isDragging = useRef(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDragging.current = false;
        }, 100);
      }}
      className="fixed bottom-6 right-6 z-[9999] cursor-grab active:cursor-grabbing"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <a
        href={`https://wa.me/${kopdesData.kontak.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (isDragging.current) {
            e.preventDefault();
          }
        }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-lg shadow-[#25D366]/30 text-white transition-colors"
        title="Hubungi Kami"
        draggable={false}
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </motion.div>
  );
};

export default FloatingContact;
