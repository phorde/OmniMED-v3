import { Medication, DoseCalculation, SedationDoseRange } from '@/app/types';

/**
 * Format a number in Brazilian locale (pt-BR)
 */
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Calculate medication dose based on patient weight
 */
export function calculateDose(
  medication: Medication,
  weight: number,
  selectedContexts: Set<string>
): DoseCalculation | null {
  if (!weight || weight <= 0) return null;

  const hasChoque = selectedContexts.has('choque');

  let dosePerKg = medication.dosePorKg;
  let formula = medication.doseFormula;

  // Check for dose adjustment (e.g., in shock scenarios)
  if (
    hasChoque &&
    medication.doseAdjustmentIn &&
    medication.doseAdjustmentIn.includes('choque')
  ) {
    dosePerKg = medication.dosePorKgAjustada || medication.dosePorKg;
    formula = medication.doseFormulaAjustada || medication.doseFormula;
  }

  const totalDose = dosePerKg * weight;
  const volumeML = totalDose / medication.concentracaoMgMl;

  return {
    formula,
    totalDose: Math.round(totalDose * 100) / 100,
    volumeML: Math.round(volumeML * 10) / 10,
  };
}

/**
 * Calculate sedation dose range based on patient weight
 */
export function calculateSedationDose(
  doseMin: number,
  doseMax: number,
  weight: number
): SedationDoseRange | null {
  if (!weight || weight <= 0) return null;

  const minDose = doseMin * weight;
  const maxDose = doseMax * weight;

  return {
    minDose: Math.round(minDose * 100) / 100,
    maxDose: Math.round(maxDose * 100) / 100,
    unit: 'unit',
  };
}

/**
 * Get medication recommendation based on clinical context
 */
export type RecommendationType = 'recommended' | 'contraindicated' | 'caution' | 'neutral';

export function getMedicationRecommendation(
  medication: Medication,
  contexts: Set<string>
): RecommendationType {
  const contextArray = Array.from(contexts);

  // Check contraindications first
  if (
    medication.contraindicatedIn &&
    medication.contraindicatedIn.some((ctx) => contextArray.includes(ctx))
  ) {
    return 'contraindicated';
  }

  // Check cautions
  if (
    medication.cautionIn &&
    medication.cautionIn.some((ctx) => contextArray.includes(ctx))
  ) {
    return 'caution';
  }

  // Check preferences
  if (
    medication.preferredIn &&
    medication.preferredIn.some((ctx) => contextArray.includes(ctx))
  ) {
    return 'recommended';
  }

  return 'neutral';
}

/**
 * Validate patient weight
 */
export function validateWeight(weight: number): boolean {
  return weight > 0 && weight <= 300; // Reasonable bounds for adult patients
}
