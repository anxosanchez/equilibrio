import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, BrainCircuit, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { TRANSLATIONS } from '../lib/translations';

const TutorModal = ({ isOpen, type, data, language, setLanguage, onConfirm, onClose }) => {
  const [selectedHypothesis, setSelectedHypothesis] = useState(null);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const renderOnboarding = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
          <Rocket className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">{t.onboarding.title}</h2>
          <p className="text-sm text-slate-400 font-medium">{t.onboarding.subtitle}</p>
        </div>
      </div>

      {/* Language Selection Step */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <p className="text-xs font-black text-blue-400 uppercase tracking-widest text-center">
          {language === 'gl' ? 'Selecciona o teu idioma' : 'Select your language'}
        </p>
        <div className="flex justify-center gap-8 py-2">
           <button 
             onClick={() => setLanguage('gl')}
             className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${language === 'gl' ? 'bg-blue-600/30 ring-2 ring-blue-500 shadow-xl' : 'bg-white/5 opacity-40 hover:opacity-100 hover:bg-white/10'}`}
           >
              <div className="w-16 h-10 overflow-hidden rounded-md shadow-md border border-white/10 bg-slate-800">
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Flag_of_Galicia_%28civil%29.svg" alt="GL" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">Galego</span>
           </button>
           <button 
             onClick={() => setLanguage('en')}
             className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${language === 'en' ? 'bg-blue-600/30 ring-2 ring-blue-500 shadow-xl' : 'bg-white/5 opacity-40 hover:opacity-100 hover:bg-white/10'}`}
           >
              <div className="w-16 h-10 overflow-hidden rounded-md shadow-md border border-white/10 bg-slate-800">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="EN" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">English</span>
           </button>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          { icon: BrainCircuit, title: t.onboarding.item1_title, desc: t.onboarding.item1_desc },
          { icon: Info, title: t.onboarding.item2_title, desc: t.onboarding.item2_desc }
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-4 items-start">
            <item.icon className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onClose} className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4">
        {t.onboarding.button}
      </Button>
    </div>
  );

  const renderHypothesis = () => (
    <div className="space-y-6">
       <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
          <BrainCircuit className="w-5 h-5 text-amber-400" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight text-balance">
          {t.hypothesis.question} {data?.reagent}?
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[
          { id: 'RIGHT', label: t.hypothesis.right, icon: Check },
          { id: 'LEFT', label: t.hypothesis.left, icon: Check },
          { id: 'NONE', label: t.hypothesis.none, icon: X }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedHypothesis(opt.id)}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              selectedHypothesis === opt.id 
                ? 'bg-blue-600/20 border-blue-500 text-white' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span className="text-sm font-bold">{opt.label}</span>
          </button>
        ))}
      </div>

      <Button 
        disabled={!selectedHypothesis}
        onClick={() => onConfirm(selectedHypothesis)} 
        className="w-full h-12 bg-white text-black hover:bg-slate-200 font-black rounded-xl"
      >
        {t.hypothesis.validate}
      </Button>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg glass-panel p-8 rounded-[2rem]"
        >
          {type === 'ONBOARDING' ? renderOnboarding() : renderHypothesis()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TutorModal;
