import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EQUILIBRIUM_CONSTANTS } from '../lib/CoreChemicalEngine';
import Precipitate from './Precipitate';
import { TRANSLATIONS } from '../lib/translations';

const TestTube = ({ tube, isSelected, onClick, language }) => {
  const config = EQUILIBRIUM_CONSTANTS[tube.type];
  const ratio = tube.equilibriumRatio || 0;
  const t = TRANSLATIONS[language]?.tubes || { label: "Tubo" };

  // Construír o título dinámico baseado no idioma
  const getTranslatedTitle = () => {
    let suffix = "";
    if (tube.id === 1 || tube.id === 5) suffix = ` (${t.control})`;
    else if (tube.id === 2) suffix = " (+HCl)";
    else if (tube.id === 3) suffix = " (+NaOH)";
    else if (tube.id === 4) suffix = ` (${t.extra})`;
    else if (tube.id === 6) suffix = " (+NH3)";
    
    return `${t.label} ${tube.id}${suffix}`;
  };

  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer flex flex-col items-center group ${isSelected ? 'z-20' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
    >
      {/* Absolute Minimalist Shadow */}
      <div className={`absolute -bottom-2 w-16 h-3 bg-black/60 blur-xl rounded-full transition-all duration-700 ${isSelected ? 'opacity-100 scale-150' : 'opacity-40'}`} />

      {/* Glass Container - Ultra Clean */}
      <motion.div 
        animate={tube.isMixing ? { 
          y: [-1, 1, -1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={{ duration: 0.3, repeat: tube.isMixing ? 4 : 0 }}
        className={`relative w-16 h-56 rounded-b-full border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-700 ${isSelected ? 'border-primary ring-[6px] ring-primary/20 bg-white/10' : 'hover:border-white/20'}`}
      >
        {/* Subtle Vertical Reflection */}
        <div className="absolute top-0 right-4 w-[3px] h-full bg-white/20 blur-[2px]" />
        <div className="absolute top-0 left-3 w-[1px] h-full bg-white/10 blur-[1px]" />
        
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
              className="absolute inset-0 z-10 bg-black/10 backdrop-blur-[1px] flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <div className={`mt-6 px-4 py-1.5 rounded-xl text-[11px] font-black tracking-[0.1em] transition-all uppercase shadow-lg ${isSelected ? 'bg-brand text-white border border-white/20' : 'bg-slate-900/80 text-slate-400 border border-white/5'}`}>
        {getTranslatedTitle()}
      </div>
    </div>
  );
};

export default TestTube;
