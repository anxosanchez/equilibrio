import React from 'react';
import { TRANSLATIONS } from '../lib/translations';

const TutorFooter = ({ progress, language }) => {
  const t = TRANSLATIONS[language]?.footer || {};

  return (
    <footer className="footer-layout px-10 py-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-md flex items-center justify-between shrink-0">
      <div className="flex flex-col gap-2 w-1/3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.progress}</span>
          <span className="text-[10px] font-black text-blue-400">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
           <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            style={{ width: `${progress}%` }} 
           />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
           {/* CC Icon */}
           <div className="opacity-50 hover:opacity-100 transition-opacity cursor-help">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Cc_by-nc-sa_euro_icon.svg" 
                alt="CC BY-NC-SA" 
                className="h-6"
              />
           </div>
           
           {/* Credit to the right of icon */}
           <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">(2026) Anxo Sánchez</span>
              <span className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">{TRANSLATIONS[language]?.footer.rights}</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default TutorFooter;
