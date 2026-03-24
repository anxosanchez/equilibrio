import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EQUILIBRIUM_CONSTANTS } from '../lib/CoreChemicalEngine';
import Precipitate from './Precipitate';

const TestTube = ({ tube, isSelected, onClick }) => {
  const config = EQUILIBRIUM_CONSTANTS[tube.type];
  const ratio = tube.equilibriumRatio || 0;

  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer flex flex-col items-center group ${isSelected ? 'z-20' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
    >
      {/* Absolute Minimalist Shadow */}
      <div className={`absolute -bottom-1 w-12 h-2 bg-slate-200 blur-md rounded-full transition-all duration-700 ${isSelected ? 'opacity-100 scale-125' : 'opacity-40'} dark:bg-black/40`} />

      {/* Glass Container - Ultra Clean */}
      <motion.div 
        animate={tube.isMixing ? { 
          y: [-1, 1, -1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={{ duration: 0.3, repeat: tube.isMixing ? 4 : 0 }}
        className={`relative w-14 h-44 rounded-b-full border border-slate-200 bg-white/40 backdrop-blur-sm overflow-hidden transition-all duration-700 ${isSelected ? 'border-primary ring-4 ring-primary/5 bg-white/60' : 'hover:border-slate-300'} dark:border-slate-800 dark:bg-slate-900/40`}
      >
        {/* Subtle Vertical Reflection */}
        <div className="absolute top-0 right-3 w-[2px] h-full bg-white/20 blur-[1px]" />
        
        {/* Liquid */}
        <motion.div 
          initial={false}
          animate={{ 
            height: '70%', 
            backgroundColor: ratio > 0.5 ? config.colors.product : config.colors.reactant,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="absolute bottom-0 left-0 right-0"
        >
          {/* Surface Shine */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30" />
          
          {/* Precipitate */}
          {tube.type === "COPPER" && ratio > 0.1 && (
             <Precipitate intensity={ratio} />
          )}
        </motion.div>

        {/* Mixing Indicator overlay */}
        <AnimatePresence>
          {tube.isMixing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-white/10 backdrop-blur-[1px] flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <div className={`mt-4 px-3 py-0.5 rounded-full text-[9px] font-bold tracking-tight transition-all uppercase ${isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
        {tube.title}
      </div>
    </div>
  );
};

export default TestTube;
