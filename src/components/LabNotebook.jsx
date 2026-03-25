import React from 'react';
import { Notebook, Edit3, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSLATIONS } from '../lib/translations';

const LabNotebook = ({ notes, language, onUpdateNote }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Notebook className="w-5 h-5 text-purple-400" />
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{t.notebook.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t.notebook.mode}</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {notes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale py-10">
               <MessageSquare className="w-12 h-12 mb-4" />
               <p className="text-xs font-bold uppercase tracking-widest text-center">
                  {t.notebook.empty.split(' ').map((w, i) => i === 2 ? <><br/>{w}</> : ` ${w}`)}
               </p>
            </div>
          ) : (
            notes.map((note, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative"
              >
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/[0.07] transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{note.type} • {note.reagent}</span>
                    <span className="text-[10px] text-slate-600 font-mono">#{notes.length - idx}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-5 rounded-xl bg-black/20 border border-white/5">
                      <p className="text-xl text-slate-200 inline leading-relaxed">
                         <strong>{t.notebook.observation}:</strong> {note.observation}
                      </p>
                    </div>

                    <div className="relative">
                      <textarea
                        value={note.justification || ""}
                        onChange={(e) => onUpdateNote(idx, e.target.value)}
                        placeholder={t.notebook.placeholder}
                        className="w-full bg-transparent border border-white/5 rounded-2xl p-6 text-lg text-slate-300 focus:outline-none focus:border-purple-500/50 min-h-[120px] resize-none leading-relaxed"
                      />
                    </div>
                    
                    {note.equation && (
                      <div className="text-sm font-mono p-3 bg-slate-950/80 rounded-lg text-emerald-400 border border-emerald-500/10">
                         {note.equation.split(' ').map((part, i) => (
                            <span key={i} className={part.includes('(') ? 'font-black underline' : ''}>
                               {part}{' '}
                            </span>
                         ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LabNotebook;
