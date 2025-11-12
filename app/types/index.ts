export type Theme = 'light' | 'dark';
export type RecommendationType = 'recommended' | 'contraindicated' | 'caution' | 'neutral';

export interface Medication {
  id: string;
  nome: string;
  categoria: string;
  concentracaoTexto: string;
  concentracaoMgMl: number;
  doseFormula: string;
  dosePorKg: number;
  doseFormulaAjustada?: string;
  dosePorKgAjustada?: number;
  doseAdjustmentIn?: string[];
  notes: string;
  preferredIn?: string[];
  contraindicatedIn?: string[];
  cautionIn?: string[];
}

export interface SedationDrug {
  id: string;
  nome: string;
  diluicao: string;
  concentracaoFinal: string;
  infusaoMlH: string;
  alternativa?: string;
  doseFormula: string;
  doseMin: number;
  doseMax: number;
  unidade: string;
  observacao?: string;
}

export interface ClinicalContext {
  id: string;
  label: string;
}

export interface DoseCalculation {
  formula: string;
  totalDose: number;
  volumeML: number;
}

export interface SedationDoseRange {
  minDose: number;
  maxDose: number;
  unit: string;
}

export interface CalculatorState {
  patientWeight: number;
  selectedContexts: Set<string>;
  currentTheme: Theme;
}
