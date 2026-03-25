/**
 * CoreChemicalEngine.js - REFACTOR PREMIUM
 * Lóxica científica avanzada: pH logarítmico e estados de equilibrio.
 */

export const EQUILIBRIUM_CONSTANTS = {
  CHROMATE: {
    K: 1e14,
    colors: {
      reactant: "#FFD700", // Amarelo
      product: "#FF8C00",   // Laranxa
    }
  },
  COPPER: {
    K: 1.1e13,
    colors: {
      reactant: "#ADD8E6", // Azul claro
      product: "#00008B",   // Azul escuro
    }
  }
};

/**
 * Calcula o pH logarítmico basado na molaridade de H+.
 * pH = -log10[H+]
 */
export function calculateLogPh(molarityH) {
  return -Math.log10(molarityH);
}

/**
 * Devolve a molaridade de H+ a partir do pH.
 * [H+] = 10^-pH
 */
export function getMolarityFromPh(ph) {
  return Math.pow(10, -ph);
}

/**
 * Aplica un reactivo e devolve a nova molaridade de H+ ou OH-.
 */
export function calculateNewMolarity(currentMolarity, reagent, volume) {
  const dropVol = 0.05; // 50uL
  const dropMolarity = 1.0; // 1M
  
  // N1V1 + N2V2 = NtotalVtotal
  const newMolarity = (currentMolarity * volume + dropMolarity * dropVol) / (volume + dropVol);
  return newMolarity;
}

export function calculateChromateEquilibrium(ph) {
  // Punto de viraxe logarítmico arredor de pH 6.5
  // Se pH < 6.5 (Ácido) -> transition debe ser alta (cara a Dicromato)
  return 1 / (1 + Math.exp(ph - 6.5)); 
}
