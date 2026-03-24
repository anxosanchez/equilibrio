import React from 'react';
import { motion } from 'framer-motion';

const PhDial = ({ ph }) => {
  // Ultra Minimalist PhDial
  // Valor central e un arco sutil
  const angle = ((ph / 14) * 180) - 90;

  const getColor = (v) => {
    if (v < 4) return "#EF4444"; // Ácido
    if (v > 10) return "#3B82F6"; // Básico
    if (v > 6 && v < 8) return "#10B981"; // Neutro
    return "#334155";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24 flex items-end justify-center overflow-hidden">
        {/* Simple Arc */}
        <div className="absolute bottom-0 w-40 h-20 border-t border-slate-200 rounded-t-full dark:border-slate-800" />
        
        {/* Minimalist Needle */}
        <motion.div 
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ originY: "100%" }}
          className="absolute bottom-0 w-[1.5px] h-16 bg-slate-900 z-10 dark:bg-slate-100"
        />

        {/* Center Point */}
        <div className="absolute bottom-[-4px] w-2 h-2 bg-slate-900 rounded-full z-20 dark:bg-slate-100" />
      </div>

      <div className="mt-4 flex flex-col items-center">
        <motion.span 
          animate={{ color: getColor(ph) }}
          className="text-5xl font-light tracking-tighter"
        >
          {ph.toFixed(2)}
        </motion.span>
        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">pH Level</span>
      </div>
    </div>
  );
};

export default PhDial;
