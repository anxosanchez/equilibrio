import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, FlaskConical, Droplets, Activity, FileDown, RefreshCw, ChevronRight, Info
} from 'lucide-react';
import { INITIAL_TUBES, addReagentToTube } from './lib/LabManager';
import TestTube from './components/TestTube';
import ReagentRack from './components/ReagentRack';
import NanoCam from './components/NanoCam';
import LiveGraph from './components/LiveGraph';
import PhDial from './components/PhDial';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { generatePDFReport } from './lib/ReportGenerator';

const App = () => {
  const [tubes, setTubes] = useState(INITIAL_TUBES);
  const [selectedTubeId, setSelectedTubeId] = useState(1);
  const [notification, setNotification] = useState(null);

  const selectedTube = tubes.find(t => t.id === selectedTubeId);

  const handleAddReagent = (reagent) => {
    setTubes(prev => prev.map(t => t.id === selectedTubeId ? { ...t, isMixing: true } : t));

    setTimeout(() => {
      setTubes(prev => {
        const tubeBefore = prev.find(t => t.id === selectedTubeId);
        const updatedTube = addReagentToTube(tubeBefore, reagent);
        
        const finalTubes = prev.map(t => 
          t.id === selectedTubeId ? { ...updatedTube, isMixing: false } : t
        );

        const shiftAmount = Math.abs(updatedTube.equilibriumRatio - (tubeBefore.equilibriumRatio || 0));
        if (shiftAmount > 0.05) {
          showFeedback(`Desprazamento detectado: ${updatedTube.equilibriumRatio > (tubeBefore.equilibriumRatio || 0) ? 'Dereita' : 'Esquerda'}`);
        }

        return finalTubes;
      });
    }, 1200);
  };

  const showFeedback = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 3000);
  };

  const resetExperiment = () => {
    setTubes(INITIAL_TUBES);
    setSelectedTubeId(1);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-blue-100 antialiased flex flex-col dark:bg-[#030712] dark:text-slate-50">
      
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center dark:bg-slate-950/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center dark:bg-white">
            <Beaker className="w-5 h-5 text-white dark:text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">Virtual Lab</span>
            <span className="text-[10px] text-slate-500 font-medium">Le Châtelier Protocol</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="font-medium text-[10px] py-0 px-2 uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            v2.4.0 Alpha
          </Badge>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => generatePDFReport(tubes, [])} className="h-8 px-3 text-xs font-semibold">
              <FileDown className="w-3.5 h-3.5 mr-1.5" /> Exportar
            </Button>
            <Button variant="ghost" size="sm" onClick={resetExperiment} className="h-8 px-3 text-xs font-semibold">
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reiniciar
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Sidebar: Reagents */}
        <div className="col-span-3 space-y-6">
          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
            <CardHeader className="pb-3 px-5">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" /> Reactivos
              </CardTitle>
              <CardDescription className="text-[11px]">Selecciona gotas para engadir ao tubo.</CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ReagentRack onAdd={handleAddReagent} tubeType={selectedTube?.type} />
            </CardContent>
          </Card>
          
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 dark:bg-blue-500/5 dark:border-blue-500/10">
             <div className="flex gap-3">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-blue-900/70 dark:text-blue-400/70">
                  O Principio de <strong>Le Châtelier</strong> indica que o sistema buscará contrarrestar calquera cambio externo.
                </p>
             </div>
          </div>
        </div>

        {/* Center: Visualization Grid */}
        <div className="col-span-6">
          <Card className="h-full border-none shadow-sm shadow-slate-200/50 bg-white/50 backdrop-blur-sm dark:bg-slate-900/20 flex flex-col justify-center items-center p-8 relative overflow-hidden">
             
             {/* Subtle Lab Grid Background */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-[0.01]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

             <div className="grid grid-cols-3 gap-x-12 gap-y-16 relative z-10 w-full justify-items-center">
                {tubes.map(tube => (
                  <TestTube 
                    key={tube.id} 
                    tube={tube} 
                    isSelected={selectedTubeId === tube.id}
                    onClick={() => setSelectedTubeId(tube.id)}
                  />
                ))}
             </div>

             {/* Floor Detail */}
             <div className="mt-12 w-full max-w-lg h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />
          </Card>
        </div>

        {/* Right Sidebar: Analytics */}
        <div className="col-span-3 space-y-6">
          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center">
             <div className="w-full flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">pH Analyser</span>
                <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
             </div>
             <PhDial ph={selectedTube?.ph || 7} />
          </Card>

          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white dark:bg-slate-900 p-0 overflow-hidden h-[240px]">
             <div className="p-5 pb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nano-Cam Output</span>
             </div>
             <div className="relative h-full w-full bg-slate-50 dark:bg-black/20">
                <NanoCam tube={selectedTube} />
                <div className="absolute inset-0 border-t border-slate-100 dark:border-white/5 pointer-events-none" />
             </div>
          </Card>

          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white dark:bg-slate-900 p-5 h-[200px]">
             <LiveGraph tube={selectedTube} />
          </Card>
        </div>

      </main>

      {/* Clean Feedback Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-full shadow-lg flex items-center gap-2 dark:bg-white dark:text-black"
          >
            <ChevronRight className="w-3 h-3 text-blue-400" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="px-6 py-4 flex justify-between items-center border-t border-slate-200 dark:border-slate-800 text-[9px] text-slate-400 font-medium">
         <span>© 2026 Virtual Lab Systems. Todos os dereitos reservados.</span>
         <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Protocolo de Seguridade</span>
            <span className="hover:text-slate-600 cursor-pointer transition-colors">Termos de Uso</span>
         </div>
      </footer>
    </div>
  );
};

export default App;
