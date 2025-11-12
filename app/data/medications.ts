import { Medication, ClinicalContext, SedationDrug } from '@/app/types';

export const medications: Medication[] = [
  {
    id: 1,
    name: 'Fentanil',
    category: 'IOT',
    dosePerKg: 3,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Cautela',
      'choque-sepsico': 'Contraindicado',
      'trauma-moderado': 'Recomendado',
      'parada-cardiaca': 'Contraindicado',
      'sedacao-analgesia': 'Recomendado',
    },
  },
  {
    id: 2,
    name: 'Etomidato',
    category: 'IOT',
    dosePerKg: 0.3,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Recomendado',
      'choque-sepsico': 'Recomendado',
      'trauma-moderado': 'Recomendado',
      'parada-cardiaca': 'Recomendado',
      'sedacao-analgesia': 'Contraindicado',
    },
  },
  {
    id: 3,
    name: 'Cetamina',
    category: 'IOT',
    dosePerKg: 1.5,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Recomendado',
      'choque-sepsico': 'Recomendado',
      'trauma-moderado': 'Recomendado',
      'parada-cardiaca': 'Recomendado',
      'sedacao-analgesia': 'Recomendado',
    },
  },
  {
    id: 4,
    name: 'Propofol',
    category: 'IOT',
    dosePerKg: 2,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Contraindicado',
      'choque-sepsico': 'Contraindicado',
      'trauma-moderado': 'Cautela',
      'parada-cardiaca': 'Contraindicado',
      'sedacao-analgesia': 'Recomendado',
    },
  },
  {
    id: 5,
    name: 'Midazolam',
    category: 'IOT',
    dosePerKg: 0.1,
    recommendations: {
      'intubacao-sequencia-rapida': 'Cautela',
      'hemorragia': 'Cautela',
      'choque-sepsico': 'Contraindicado',
      'trauma-moderado': 'Cautela',
      'parada-cardiaca': 'Contraindicado',
      'sedacao-analgesia': 'Recomendado',
    },
  },
  {
    id: 6,
    name: 'Succinilcolina',
    category: 'Bloqueador Neuromuscular',
    dosePerKg: 1,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Recomendado',
      'choque-sepsico': 'Recomendado',
      'trauma-moderado': 'Recomendado',
      'parada-cardiaca': 'Recomendado',
      'sedacao-analgesia': 'Contraindicado',
    },
  },
  {
    id: 7,
    name: 'Rocurônio',
    category: 'Bloqueador Neuromuscular',
    dosePerKg: 1.2,
    recommendations: {
      'intubacao-sequencia-rapida': 'Recomendado',
      'hemorragia': 'Recomendado',
      'choque-sepsico': 'Recomendado',
      'trauma-moderado': 'Recomendado',
      'parada-cardiaca': 'Recomendado',
      'sedacao-analgesia': 'Contraindicado',
    },
  },
];

export const sedationDrugs: SedationDrug[] = [
  {
    id: 1,
    name: 'Fentanil',
    doseMcg: 50,
    dilutionVolume: 10,
    dilutionSaline: 10,
  },
  {
    id: 2,
    name: 'Midazolam',
    doseMg: 5,
    dilutionVolume: 1,
    dilutionSaline: 1,
  },
  {
    id: 3,
    name: 'Cetamina',
    doseMg: 50,
    dilutionVolume: 1,
    dilutionSaline: 1,
  },
];

export const clinicalContexts: ClinicalContext[] = [
  { id: 1, name: 'Intubação em Sequência Rápida', code: 'intubacao-sequencia-rapida' },
  { id: 2, name: 'Hemorragia', code: 'hemorragia' },
  { id: 3, name: 'Choque Séptico', code: 'choque-sepsico' },
  { id: 4, name: 'Trauma Moderado', code: 'trauma-moderado' },
  { id: 5, name: 'Parada Cardíaca', code: 'parada-cardiaca' },
  { id: 6, name: 'Sedação/Analgesia', code: 'sedacao-analgesia' },
];
