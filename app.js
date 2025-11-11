// OmniMed Application JavaScript

// Application data
const medicamentosIOT = [
  {
    id: 'fentanil',
    nome: 'Fentanil',
    categoria: '1 - PRÉ-MEDICAÇÃO',
    concentracaoTexto: '50 mcg/mL',
    concentracaoMgMl: 0.05,
    doseFormula: '3 mcg/kg',
    dosePorKg: 0.003,
    notes: 'Pode atenuar a resposta simpática na laringoscopia. Útel em HIC e doença cardiovascular.',
    preferredIn: ['hic', 'tce', 'doencacv']
  },
  {
    id: 'etomidato',
    nome: 'Etomidato',
    categoria: '2 - INDUÇÃO/SEDAÇÃO',
    concentracaoTexto: '2 mg/mL',
    concentracaoMgMl: 2,
    doseFormula: '0.3 mg/kg',
    dosePorKg: 0.3,
    doseFormulaAjustada: '0.15 mg/kg',
    dosePorKgAjustada: 0.15,
    doseAdjustmentIn: ['choque'],
    notes: 'Hemodinamicamente estável, ideal para a maioria dos cenários de emergência.',
    preferredIn: ['choque', 'hic', 'tce', 'doencacv']
  },
  {
    id: 'cetamina',
    nome: 'Cetamina',
    categoria: '2 - INDUÇÃO/SEDAÇÃO',
    concentracaoTexto: '50 mg/mL',
    concentracaoMgMl: 50,
    doseFormula: '1-2 mg/kg',
    dosePorKg: 1.5,
    doseFormulaAjustada: '1 mg/kg',
    dosePorKgAjustada: 1.0,
    doseAdjustmentIn: ['choque'],
    notes: 'Propriedades broncodilatadoras e analgésicas. Preserva o drive respiratório.',
    preferredIn: ['choque', 'broncoespasmo'],
    cautionIn: ['hic', 'tce', 'hipertensao', 'doencacv']
  }
];

// Application state
let currentTheme = 'light';
let patientWeight = 0;
let selectedContexts = new Set();

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing app...');
  initializeTheme();
  setupEventListeners();
  populateContextCheckboxes();
  renderMedications();
  renderSedationDrugs();
});

// Theme management
function initializeTheme() {
  setTheme('light');
}

function setTheme(theme) {
  console.log('Setting theme to:', theme);
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    if (theme === 'dark') {
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    } else {
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    }
  }
}

function toggleTheme() {
  console.log('Toggle theme called');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

// Navigation
function showPage(pageId) {
  console.log('Showing page:', pageId);
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// Event listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      console.log('Theme toggle clicked');
      e.preventDefault();
      toggleTheme();
    });
  }
  
  // Logo navigation
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      console.log('Logo clicked');
      e.preventDefault();
      showPage('homepage');
    });
  }
  
  // Access calculator button
  const accessCalculatorBtn = document.getElementById('access-calculator');
  if (accessCalculatorBtn) {
    accessCalculatorBtn.addEventListener('click', function(e) {
      console.log('Access calculator clicked');
      e.preventDefault();
      showPage('calculator-page');
    });
  }
}

console.log('OmniMed application loaded successfully');
