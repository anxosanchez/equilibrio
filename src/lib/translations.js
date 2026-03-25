export const TRANSLATIONS = {
  gl: {
    nav: {
      title: "Titor Intelixente Lab",
      subtitle: "Protocolo Le Châtelier",
      badge: "Modo Educativo Ativo",
      export: "Exportar Informe",
      reset: "Reiniciar"
    },
    onboarding: {
      title: "ObxECTIVOS DA PRÁCTICA",
      subtitle: "Benvido ao Laboratorio Virtual Intelixente",
      item1_title: "Predecir Desprazamentos",
      item1_desc: "Aprende a aplicar o Principio de Le Châtelier ante cambios de concentración.",
      item2_title: "Comprobar Reversibilidade",
      item2_desc: "Observa como os sistemas químicos poden volver ao seu estado inicial.",
      button: "Comezar Experimento"
    },
    hypothesis: {
      question: "¿Cara a onde cres que se desprazará o equilibrio ao engadir",
      right: "Dereita (Cara aos produtos)",
      left: "Esquerda (Cara aos reactivos)",
      none: "Non haberá cambios",
      validate: "Validar Hipótese",
      feedback_correct: "¡Correcto! O sistema busca contrarrestar o cambio.",
      feedback_incorrect: "Non exactamente. O sistema intenta opoñerse á perturbación.",
      feedback_rigor: "Coidado! Primeiro debes completar o estudo do Cromato segundo o guión."
    },
    sidebar: {
      title: "Guión de Práctica",
      step: "Paso",
      quote: "A natureza busca sempre o equilibrio, contrarrestando calquera forza que intente rompelo.",
      steps: [
        { title: "Introdución", desc: "Identifica o estado inicial dos tubos de control." },
        { title: "Efecto do pH (Cromato)", desc: "Engade HCl ao Tubo 2 e NaOH ao Tubo 3." },
        { title: "Complexo de Cobre", desc: "Observa a cor inicial do Ion Cobre (II)." },
        { title: "Formación de Aminas", desc: "Engade NH3 ao Tubo 6 para formar o complexo tetraamín-cobre." },
        { title: "Reversibilidade", desc: "Engade HCl ao Tubo 6 para destruír o complexo e volver ao inicio." }
      ]
    },
    reagents: {
      title: "Accións Químicas",
      action: "Engadir pinga",
      empty: "Selecciona un tubo para ver os reactivos",
      tips: {
        HCl_chromate: "O HCl libera ións H+. ¿Como afectará isto ao equilibrio do Cromato/Dicromato?",
        NaOH_chromate: "O NaOH libera OH-, que 'capturan' os H+ do medio. ¿Que sucederá co equilibrio?",
        NH3_copper: "O Amoníaco reacciona co Cobre para formar o complexo tetraamín-cobre (azul escuro).",
        HCl_copper: "O HCl destrúe o complexo ao protonar o amoníaco. ¿Volverá a cor inicial?"
      }
    },
    notebook: {
      title: "Caderno de Notas",
      mode: "Modo Edición",
      empty: "Rexístrate as túas primeiras observacións",
      observation: "Observación",
      placeholder: "Escribe aquí a túa xustificación teórica (ex: Segundo Le Châtelier...)",
      obs_product: "Desprazamento cara á formación de produtos (cambio de cor).",
      obs_reactant: "Desprazamento cara aos reactivos (recuperación de cor)."
    },
    hud: {
      active: "Nano-Cam Activa",
      no_signal: "Sen sinal de entrada...",
      chromate_reactant: "Predominio de ións Cromato (Amarelo). O pH é básico.",
      chromate_product: "Predominio de ións Dicromato (Laranxa). O pH é ácido.",
      chromate_eq: "Estado de equilibrio: Cromato \u21CC Dicromato.",
      copper_reactant: "Ións Cobre (II) hidratados en disolución aquosa.",
      copper_product: "Ións amoníaco capturando o Cobre: [Cu(NH3)4]2+.",
      copper_eq: "Reacción de complexación en curso...",
      monitoring: "Monitorización"
    },
    footer: {
      progress: "Progreso da Práctica",
      rights: "Algúns dereitos reservados"
    },
    tubes: {
      label: "Tubo",
      control: "Control",
      extra: "Extra"
    }
  },
  en: {
    nav: {
      title: "Intelligent Tutor Lab",
      subtitle: "Le Châtelier Protocol",
      badge: "Educational Mode Active",
      export: "Export Report",
      reset: "Reset"
    },
    onboarding: {
      title: "PRACTICE OBJECTIVES",
      subtitle: "Welcome to the Intelligent Virtual Lab",
      item1_title: "Predict Displacement",
      item1_desc: "Learn to apply Le Châtelier's Principle to concentration changes.",
      item2_title: "Check Reversibility",
      item2_desc: "Observe how chemical systems can return to their initial state.",
      button: "Start Experiment"
    },
    hypothesis: {
      question: "Which way do you think the equilibrium will shift upon adding",
      right: "Right (Towards products)",
      left: "Left (Towards reactants)",
      none: "No changes will occur",
      validate: "Validate Hypothesis",
      feedback_correct: "Correct! The system seeks to counteract the change.",
      feedback_incorrect: "Not exactly. The system tries to oppose the perturbation.",
      feedback_rigor: "Careful! First, you must complete the Chromate study according to the script."
    },
    sidebar: {
      title: "Lab Script",
      step: "Step",
      quote: "Nature always seeks equilibrium, counteracting any force that tries to break it.",
      steps: [
        { title: "Introduction", desc: "Identify the initial state of the control tubes." },
        { title: "pH Effect (Chromate)", desc: "Add HCl to Tube 2 and NaOH to Tube 3." },
        { title: "Copper Complex", desc: "Observe the initial color of the Copper (II) ion." },
        { title: "Amine Formation", desc: "Add NH3 to Tube 6 to form the tetraamminecopper complex." },
        { title: "Reversibility", desc: "Add HCl to Tube 6 to destroy the complex and return to start." }
      ]
    },
    reagents: {
      title: "Chemical Actions",
      action: "Add drop",
      empty: "Select a tube to see reagents",
      tips: {
        HCl_chromate: "HCl releases H+ ions. How will this affect the Chromate/Dichromate equilibrium?",
        NaOH_chromate: "NaOH releases OH-, which 'capture' the medium's H+. What will happen to the equilibrium?",
        NH3_copper: "Ammonia reacts with Copper to form the tetraamminecopper complex (dark blue).",
        HCl_copper: "HCl destroys the complex by protonating the ammonia. Will it return to the initial color?"
      }
    },
    notebook: {
      title: "Lab Notebook",
      mode: "Edit Mode",
      empty: "Record your first observations",
      observation: "Observation",
      placeholder: "Write your theoretical justification here (e.g., According to Le Châtelier...)",
      obs_product: "Shift towards product formation (color change).",
      obs_reactant: "Shift towards reactants (color recovery)."
    },
    hud: {
      active: "Nano-Cam Active",
      no_signal: "No input signal...",
      chromate_reactant: "Predominance of Chromate ions (Yellow). pH is basic.",
      chromate_product: "Predominance of Dichromate ions (Orange). pH is acidic.",
      chromate_eq: "Equilibrium state: Chromate \u21CC Dichromate.",
      copper_reactant: "Hydrated Copper (II) ions in aqueous solution.",
      copper_product: "Ammonia ions capturing Copper: [Cu(NH3)4]2+.",
      copper_eq: "Complexation reaction in progress...",
      monitoring: "Monitoring"
    },
    footer: {
      progress: "Practice Progress",
      rights: "Some rights reserved"
    },
    tubes: {
      label: "Tube",
      control: "Control",
      extra: "Extra"
    }
  }
};
