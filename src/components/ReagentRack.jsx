import React from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { Button } from './ui/button';

const REAGENTS = {
  CHROMATE: [
    { id: 'HCl', name: 'HCl 1M', color: '#EF4444' },
    { id: 'NaOH', name: 'NaOH 1M', color: '#3B82F6' },
  ],
  COPPER: [
    { id: 'NH3', name: 'NH3 (aq)', color: '#8B5CF6' },
    { id: 'HCl', name: 'HCl 1M', color: '#EF4444' },
  ]
};

const ReagentRack = ({ onAdd, tubeType }) => {
  const list = REAGENTS[tubeType] || [];

  return (
    <div className="grid grid-cols-1 gap-2">
      {list.map((reagent) => (
        <Button
          key={reagent.id}
          variant="outline"
          onClick={() => onAdd(reagent.id)}
          className="h-auto py-3 px-4 justify-start gap-4 border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all dark:border-slate-800 dark:hover:bg-slate-800 group"
        >
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${reagent.color}15` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: reagent.color }} />
          </div>
          <div className="flex flex-col items-start translate-y-[1px]">
            <span className="text-xs font-bold tracking-tight">{reagent.name}</span>
          </div>
        </Button>
      ))}
      {list.length === 0 && (
        <div className="py-10 flex flex-col items-center opacity-30">
          <Droplet className="w-5 h-5 mb-2" />
          <p className="text-[10px] font-bold uppercase tracking-widest">Sen Selección</p>
        </div>
      )}
    </div>
  );
};

export default ReagentRack;
