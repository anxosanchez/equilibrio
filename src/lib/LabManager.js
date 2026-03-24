/**
 * LabManager.js - REFACTOR PREMIUM
 * Xestión de estados con simulación de axitación e retardo.
 */

import { calculateLogPh, getMolarityFromPh, calculateChromateEquilibrium } from './CoreChemicalEngine';

export const INITIAL_TUBES = [
  { id: 1, type: "CHROMATE", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 1 (Control)", isMixing: false },
  { id: 2, type: "CHROMATE", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 2 (+HCl)", isMixing: false },
  { id: 3, type: "CHROMATE", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 3 (+NaOH)", isMixing: false },
  { id: 4, type: "CHROMATE", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 4 (Extra)", isMixing: false },
  { id: 5, type: "COPPER", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 5 (Control)", isMixing: false },
  { id: 6, type: "COPPER", ph: 7, hMolarity: 1e-7, conc: 0.1, history: [], title: "Tubo 6 (+NH3)", isMixing: false },
];

export function addReagentToTube(tube, reagent) {
  let newHMolarity = tube.hMolarity;
  const currentVol = 10; // mL

  if (reagent === "HCl") {
    // Engade H+
    newHMolarity = (tube.hMolarity * currentVol + 1.0 * 0.05) / (currentVol + 0.05);
  } else if (reagent === "NaOH") {
    // Reduce H+ (simplificado: Kw = [H+][OH-] = 10^-14)
    const ohMolarity = (1e-7 * currentVol + 1.0 * 0.05) / (currentVol + 0.05);
    newHMolarity = 1e-14 / ohMolarity;
  }

  const newPh = calculateLogPh(newHMolarity);
  let equilibriumRatio = tube.equilibriumRatio || 0;

  if (tube.type === "CHROMATE") {
    equilibriumRatio = calculateChromateEquilibrium(newPh);
  } else if (tube.type === "COPPER") {
    if (reagent === "NH3") equilibriumRatio = Math.min(1, equilibriumRatio + 0.25);
    if (reagent === "HCl") equilibriumRatio = Math.max(0, equilibriumRatio - 0.25);
  }

  return {
    ...tube,
    hMolarity: newHMolarity,
    ph: newPh,
    equilibriumRatio,
    isMixing: true, // Comeza a axitación
    history: [...tube.history, { reagent, timestamp: Date.now() }]
  };
}
