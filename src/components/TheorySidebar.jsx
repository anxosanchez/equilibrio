import React from 'react';
import { BookOpen, CheckCircle2, FlaskConical } from 'lucide-react';
import ReagentRack from './ReagentRack';
import { TRANSLATIONS } from '../lib/translations';

const TheorySidebar = ({ currentStep, language, onAddReagent, tubeType }) => {
  const t = TRANSLATIONS[language];
  const steps = t.sidebar.steps;

  return (
    <div className="flex flex-col gap-6 p-6 glass-panel rounded-3xl overflow-hidden self-start">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-5 h-5 text-blue-400" />
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{t.sidebar.title}</h2>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
        {steps.map((step, idx) => {
          const stepId = idx + 1;
          const isActive = stepId === currentStep;
          const isDone = stepId < currentStep;

          return (
            <div 
              key={stepId} 
              className={`p-4 rounded-2xl transition-all duration-500 border ${
                isActive 
                  ? 'bg-blue-600/20 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                  : isDone 
                    ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' 
                    : 'bg-white/5 border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-400' : isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {t.sidebar.step} 0{stepId}
                </span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <h4 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{step.title}</h4>
              {isActive && (
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2 animate-in fade-in slide-in-from-top-1">
                  {step.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* REAGENT PANEL INTEGRATED HERE */}
      <div className="mt-4 pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <FlaskConical className="w-4 h-4 text-purple-400" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.reagents.title}</h3>
        </div>
        <ReagentRack onAdd={onAddReagent} tubeType={tubeType} language={language} />
      </div>

      <div className="mt-4 p-4 rounded-2xl bg-slate-900/50 border border-white/5 shrink-0">
        <p className="text-[10px] font-medium text-slate-500 italic leading-relaxed">
          "{t.sidebar.quote}"
        </p>
      </div>
    </div>
  );
};

export default TheorySidebar;
