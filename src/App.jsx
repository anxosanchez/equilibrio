import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Beaker, FileDown, RefreshCw, Info, ChevronRight
} from 'lucide-react';
import { INITIAL_TUBES, addReagentToTube } from './lib/LabManager';
import TestTube from './components/TestTube';
import ReagentRack from './components/ReagentRack';
import NanoCam from './components/NanoCam';
import LiveGraph from './components/LiveGraph';
import PhDial from './components/PhDial';
import TutorModal from './components/TutorModal';
import TheorySidebar from './components/TheorySidebar';
import LabNotebook from './components/LabNotebook';
import TutorFooter from './components/TutorFooter';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { generatePDFReport } from './lib/ReportGenerator';
import { TRANSLATIONS } from './lib/translations';

const EQUATIONS = {
  CHROMATE: {
    HCl: "2CrO4(2-) + 2H(+) \u21CC Cr2O7(2-) + H2O",
    NaOH: "Cr2O7(2-) + 2OH(-) \u21CC 2CrO4(2-) + H2O"
  },
  COPPER: {
    NH3: "[Cu(H2O)6](2+) + 4NH3 \u21CC [Cu(NH3)4](2+) + 6H2O",
    HCl: "[Cu(NH3)4](2+) + 4H(+) \u21CC [Cu(H2O)6](2+) + 4NH4(+)"
  }
};

const App = () => {
  const [language, setLanguage] = useState('gl');
  const [tubes, setTubes] = useState(INITIAL_TUBES);
  const [selectedTubeId, setSelectedTubeId] = useState(1);
  const [notification, setNotification] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [hypothesisData, setHypothesisData] = useState(null);
  const [labNotes, setLabNotes] = useState([]);
  const [progress, setProgress] = useState(0);

  const t = TRANSLATIONS[language];
  const selectedTube = tubes.find(t => t.id === selectedTubeId);

  // Calcula o progreso basado nos pasos e notas
  useEffect(() => {
    const baseProgress = (currentStep - 1) * 20;
    const notesProgress = Math.min(20, labNotes.length * 5);
    setProgress(Math.min(100, baseProgress + notesProgress));
  }, [currentStep, labNotes]);

  const handleAddClick = (reagent) => {
    // Verificación de Rigor Procedimental
    if (selectedTube.type === "COPPER" && reagent === "NH3" && currentStep < 3) {
      showFeedback(t.hypothesis.feedback_rigor);
      return;
    }

    setHypothesisData({ reagent });
  };

  const handleConfirmHypothesis = (prediction) => {
    const reagent = hypothesisData.reagent;
    const isCorrect = validatePrediction(selectedTube.type, reagent, prediction);
    
    setHypothesisData(null);
    
    if (isCorrect) {
      showFeedback(t.hypothesis.feedback_correct);
      executeAddition(reagent);
    } else {
      showFeedback(t.hypothesis.feedback_incorrect);
      // Permitimos continuar despois do erro pedagóxico
      setTimeout(() => executeAddition(reagent), 1500);
    }
  };

  const validatePrediction = (type, reagent, prediction) => {
    if (type === "CHROMATE") {
      if (reagent === "HCl") return prediction === "RIGHT";
      if (reagent === "NaOH") return prediction === "LEFT";
    } else if (type === "COPPER") {
      if (reagent === "NH3") return prediction === "RIGHT";
      if (reagent === "HCl") return prediction === "LEFT";
    }
    return false;
  };

  const executeAddition = (reagent) => {
    setTubes(prev => prev.map(t => t.id === selectedTubeId ? { ...t, isMixing: true } : t));

    setTimeout(() => {
      setTubes(prev => {
        const tubeBefore = prev.find(t => t.id === selectedTubeId);
        const updatedTube = addReagentToTube(tubeBefore, reagent);
        
        // Rexisto no Caderno
        const note = {
          type: tubeBefore.type,
          reagent: reagent,
          observation: updatedTube.equilibriumRatio > tubeBefore.equilibriumRatio 
            ? t.notebook.obs_product 
            : t.notebook.obs_reactant,
          equation: EQUATIONS[tubeBefore.type][reagent],
          justification: ""
        };
        setLabNotes(prevNotes => [note, ...prevNotes]);

        // Actualizar Step se corresponde
        if (currentStep === 2 && tubeBefore.type === "CHROMATE") {
           // Se xa fixo probas en cromato, pasamos a cobre
           if (labNotes.filter(n => n.type === "CHROMATE").length >= 2) setCurrentStep(3);
        }
        if (currentStep === 3 && tubeBefore.type === "COPPER") setCurrentStep(4);
        if (currentStep === 4 && reagent === "HCl" && tubeBefore.type === "COPPER") setCurrentStep(5);

        return prev.map(t => t.id === selectedTubeId ? { ...updatedTube, isMixing: false } : t);
      });
    }, 1200);
  };

  const updateNoteJustification = (idx, text) => {
    setLabNotes(prev => prev.map((n, i) => i === idx ? { ...n, justification: text } : n));
  };

  const showFeedback = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(null), 4000);
  };

  const resetExperiment = () => {
    setTubes(INITIAL_TUBES);
    setSelectedTubeId(1);
    setLabNotes([]);
    setCurrentStep(1);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-blue-500/30 antialiased flex flex-col">
      
      {/* Onboarding & Hypothesis Modals */}
      <TutorModal 
        isOpen={onboardingOpen} 
        type="ONBOARDING" 
        language={language}
        onClose={() => { setOnboardingOpen(false); setCurrentStep(2); }} 
      />
      <TutorModal 
        isOpen={!!hypothesisData} 
        type="HYPOTHESIS" 
        language={language}
        data={hypothesisData}
        onConfirm={handleConfirmHypothesis}
        onClose={() => setHypothesisData(null)}
      />

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Beaker className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight uppercase">{t.nav.title}</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.nav.subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex bg-white/5 rounded-xl border border-white/10 overflow-hidden p-1">
             <button 
               onClick={() => setLanguage('gl')}
               className={`w-10 h-8 flex items-center justify-center rounded-lg transition-all ${language === 'gl' ? 'bg-white/10 ring-1 ring-white/20 shadow-lg' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}`}
             >
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Flag_of_Galicia_%28civil%29.svg" alt="GL" className="w-6 shadow-sm" />
             </button>
             <button 
               onClick={() => setLanguage('en')}
               className={`w-10 h-8 flex items-center justify-center rounded-lg transition-all ${language === 'en' ? 'bg-white/10 ring-1 ring-white/20 shadow-lg' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}`}
             >
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="EN" className="w-6 shadow-sm" />
             </button>
          </div>

          <div className="h-6 w-[1px] bg-white/5" />

          <Badge variant="secondary" className="font-black text-[10px] py-1 px-3 uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {t.nav.badge}
          </Badge>
          <div className="h-6 w-[1px] bg-white/5" />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => generatePDFReport(tubes, [])} className="h-10 px-4 text-xs font-bold hover:bg-white/5">
              <FileDown className="w-4 h-4 mr-2" /> {t.nav.export}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetExperiment} className="h-10 px-4 text-xs font-bold hover:bg-white/5">
              <RefreshCw className="w-4 h-4 mr-2" /> {t.nav.reset}
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-10 grid grid-cols-12 gap-10 max-w-[1920px] mx-auto w-full overflow-hidden">
        
        {/* Left: Theory Sidebar & Reagents */}
        <aside className="col-span-3 h-full overflow-hidden flex flex-col gap-8">
           <TheorySidebar 
             currentStep={currentStep} 
             language={language}
             onAddReagent={handleAddClick}
             tubeType={selectedTube?.type}
           />
        </aside>

        {/* Center: Experiment & Lab Area */}
        <div className="col-span-6 flex flex-col gap-10">
          <section className="flex-grow glass-panel p-10 relative overflow-hidden flex flex-col items-center justify-center rounded-[2.5rem]">
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
             
             <div className="grid grid-cols-3 gap-x-16 gap-y-24 relative z-10 w-full justify-items-center">
                {tubes.map(tube => (
                  <TestTube 
                    key={tube.id} 
                    tube={tube} 
                    language={language}
                    isSelected={selectedTubeId === tube.id}
                    onClick={() => setSelectedTubeId(tube.id)}
                  />
                ))}
             </div>

             <div className="mt-16 w-full max-w-xl h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          </section>
        </div>

        {/* Right: Analytics & Notebook */}
        <div className="col-span-3 flex flex-col gap-8 h-full overflow-hidden">
           <div className="grid grid-cols-1 gap-8 shrink-0">
             <div className="glass-panel p-6 rounded-3xl flex flex-col items-center">
                <PhDial ph={selectedTube?.ph || 7} />
             </div>
             <div className="glass-panel p-0 overflow-hidden h-[200px] rounded-3xl">
                <NanoCam tube={selectedTube} language={language} />
             </div>
           </div>
           
           <div className="flex-grow min-h-0">
              <LabNotebook 
                notes={labNotes} 
                language={language}
                onUpdateNote={updateNoteJustification} 
              />
           </div>
        </div>

      </main>

      {/* Progress & Credits Footer */}
      <TutorFooter progress={progress} language={language} />


      {/* Feedback Overlay */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 bg-white text-black text-sm font-black rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
