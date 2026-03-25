import React from 'react';
import { Droplet, Info } from 'lucide-react';
import { Button } from './ui/button';
import { TRANSLATIONS } from '../lib/translations';

const REAGENTS = (t) => ({
  CHROMATE: [
    { 
      id: 'HCl', 
      name: 'HCl 1M', 
      color: '#EF4444', 
      tip: t.reagents.tips.HCl_chromate 
    },
    { 
      id: 'NaOH', 
      name: 'NaOH 1M', 
      color: '#3B82F6', 
      tip: t.reagents.tips.NaOH_chromate 
    },
  ],
  COPPER: [
    { 
      id: 'NH3', 
      name: 'NH3 (aq)', 
      color: '#8B5CF6', 
      tip: t.reagents.tips.NH3_copper 
    },
    { 
      id: 'HCl', 
      name: 'HCl 1M', 
      color: '#EF4444', 
      tip: t.reagents.tips.HCl_copper 
    },
  ]
});

const ReagentRack = ({ onAdd, tubeType, language }) => {
  const t = TRANSLATIONS[language];
  const list = REAGENTS(t)[tubeType] || [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {list.map((reagent) => (
        <div key={reagent.id} className="group relative">
          <Button
            variant="outline"
            onClick={() => onAdd(reagent.id)}
            className="w-full h-auto py-3 px-4 justify-start gap-3 border-white/5 hover:bg-white/5 transition-all flex flex-col items-start bg-slate-900/40 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${reagent.color}15`, border: `1px solid ${reagent.color}30` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reagent.color }} />
              </div>
              <span className="text-[11px] font-black tracking-tight text-slate-200">{reagent.name}</span>
            </div>
            
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1.5 group-hover:text-blue-400 transition-colors">
               {t.reagents.action}
            </p>
          </Button>

          {/* Pedago-Tooltip */}
          <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-blue-600 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 border border-white/20">
             <div className="flex gap-3">
                <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="text-[11px] text-white font-bold leading-snug">
                   {reagent.tip}
                </p>
             </div>
             {/* Arrow */}
             <div className="absolute top-full left-6 -mt-1 border-8 border-transparent border-t-blue-600" />
          </div>
        </div>
      ))}
      
      {list.length === 0 && (
        <div className="col-span-2 py-6 flex flex-col items-center opacity-30 border border-dashed border-white/10 rounded-2xl bg-white/5">
          <Droplet className="w-6 h-6 mb-2 text-slate-600" />
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 text-center px-4">
            {t.reagents.empty}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReagentRack;
