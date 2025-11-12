// OmniMed Application JavaScript

// Application data
const medicamentosIOT = [
    {
        "id": "fentanil",
        "nome": "Fentanil",
        "categoria": "1 PRÉ-MEDICAÇÃO",
        "concentracaoTexto": "50 mcg/mL",
        "concentracaoMgMl": 0.05,
        "doseFormula": "2 mcg/kg",
        "dosePorKg": 0.002,
        "notes": "Pode atenuar a resposta simpática à laringoscopia. Útil em HIC e doença cardiovascular.",
        "preferredIn": ["hic_tce", "doenca_cv"]
    },
    {
        "id": "lidocaina",
        "nome": "Lidocaína 2%",
        "categoria": "1 PRÉ-MEDICAÇÃO",
        "concentracaoTexto": "20 mg/mL",
        "concentracaoMgMl": 20,
        "doseFormula": "1.5 mg/kg",
        "dosePorKg": 1.5,
        "notes": "Atenua a tosse e a resposta à intubação. Importante para pacientes com HIC ou broncoespasmo.",
        "preferredIn": ["hic_tce", "broncoespasmo"]
    },
    {
        "id": "etomidato",
        "nome": "Etomidato",
        "categoria": "2 INDUÇÃO/SEDAÇÃO",
        "concentracaoTexto": "2 mg/mL",
        "concentracaoMgMl": 2,
        "doseFormula": "0.3 mg/kg",
        "dosePorKg": 0.3,
        "doseFormulaAjustada": "0.15 mg/kg",
        "dosePorKgAjustada": 0.15,
        "doseAdjustmentIn": ["choque"],
        "notes": "Hemodinamicamente estável, ideal para a maioria dos cenários de emergência.",
        "preferredIn": ["choque", "hic_tce", "doenca_cv"]
    },
    {
        "id": "cetamina",
        "nome": "Cetamina",
        "categoria": "2 INDUÇÃO/SEDAÇÃO",
        "concentracaoTexto": "50 mg/mL",
        "concentracaoMgMl": 50,
        "doseFormula": "1-2 mg/kg",
        "dosePorKg": 2,
        "doseFormulaAjustada": "1 mg/kg",
        "dosePorKgAjustada": 1.5,
        "doseAdjustmentIn": ["choque"],
        "notes": "Propriedades broncodilatadoras e analgésicas. Preserva o drive respiratório.",
        "preferredIn": ["choque", "broncoespasmo"],
        "cautionIn": ["hic_tce_hipertenso", "doenca_cv"]
    },
    {
        "id": "propofol",
        "nome": "Propofol 1%",
        "categoria": "2 INDUÇÃO/SEDAÇÃO",
        "concentracaoTexto": "1% (10 mg/mL)",
        "concentracaoMgMl": 10,
        "doseFormula": "1.5 mg/kg",
        "dosePorKg": 1.5,
        "notes": "Rápido início. Causa vasodilatação e hipotensão. Bom para broncoespasmo e status epilepticus.",
        "contraindicatedIn": ["choque"],
        "preferredIn": ["broncoespasmo", "status_epilepticus"]
    },
    {
        "id": "midazolam",
        "nome": "Midazolam",
        "categoria": "2 INDUÇÃO/SEDAÇÃO",
        "concentracaoTexto": "5 mg/mL",
        "concentracaoMgMl": 5,
        "doseFormula": "0.1-0.3 mg/kg",
        "dosePorKg": 0.15,
        "notes": "Pode causar hipotensão significativa. Início de ação mais lento.",
        "contraindicatedIn": ["choque"]
    },
    {
        "id": "succinilcolina",
        "nome": "Succinilcolina",
        "categoria": "3 BLOQUEIO NEUROMUSCULAR",
        "concentracaoTexto": "10 mg/mL",
        "concentracaoMgMl": 10,
        "doseFormula": "1 mg/kg",
        "dosePorKg": 1,
        "notes": "Início em 45-60s, duração 6-10 min. Agente de escolha na ausência de contraindicações.",
        "contraindicatedIn": ["risco_hipercalemia"]
    },
    {
        "id": "rocuronio",
        "nome": "Rocurônio",
        "categoria": "3 BLOQUEIO NEUROMUSCULAR",
        "concentracaoTexto": "10 mg/mL",
        "concentracaoMgMl": 10,
        "doseFormula": "1.2 mg/kg",
        "dosePorKg": 1.2,
        "notes": "Início em 45-60s, duração ~45 min. Alternativa quando Succinilcolina é contraindicada. Reversível com Sugammadex.",
        "preferredIn": ["risco_hipercalemia"]
    }
];

const sedoanalgesiaData = [
    {
        "id": "fentanil_sedacao",
        "nome": "Fentanil",
            "diluicao": "Fentanil (50mcg/ml) 20ml + 80ml de SF 0,9%.",        "infusaoMlH": "Iniciar a 5-8 ml/h.",
        "doseFormula": "0,7 a 2 mcg/kg/h",
        "doseMin": 0.7,
        "doseMax": 2,
        "unidade": "mcg"
    },
    {
        "id": "midazolam_sedacao",
        "nome": "Midazolam",
            "diluicao": "Midazolam (5mg/ml) 20ml + 80ml de SF 0,9%.",        "infusaoMlH": "Iniciar a 5-8 ml/h.",
        "doseFormula": "0,02 a 0,2 mg/kg/h",
        "doseMin": 0.02,
        "doseMax": 0.2,
        "unidade": "mg",
        "observacao": "Se estado de mal epiléptico: até 1mg/kg/h"
    },
    {
        "id": "cetamina_sedacao",
        "nome": "Cetamina",
            "diluicao": "Cetamina (50 mg/mL) 10 mL + 240 mL SF 0,9% EV",        "infusaoMlH": "Iniciar EV em BIC a 3-6 ml/h.",
        "doseFormula": "0,3 a 1 mg/kg/h",
        "doseMin": 0.3,
        "doseMax": 1,
        "unidade": "mg"
    },
    {
        "id": "fenta_mida_sedacao",
        "nome": "💡 Dica para Baixa Disponibilidade de Bombas",
            "diluicao": "Fentanil (50mcg/ml) 25ml + Midazolam (5mg/ml) 50ml + 175ml SF 0,9% EV",        "infusaoMlH": "Iniciar EV em BIC a 3-6 ml/h.",
        "doseFormula": "0,3 a 1 mg/kg/h",
        "doseMin": 0.3,
        "doseMax": 1,
        "unidade": "mg"
    }
]
;

const contextosClinicosData = [
    {
        "id": "choque",
        "label": "Instabilidade Hemodinâmica / Choque"
    },
    {
        "id": "risco_hipercalemia",
        "label": "Risco de Hipercalemia"
    },
    {
        "id": "broncoespasmo",
        "label": "Broncoespasmo / Asma"
    },
    {
        "id": "hic_tce",
        "label": "Suspeita de HIC / TCE"
    },
    {
        "id": "doenca_cv",
        "label": "Doença Cardiovascular (DAC, Dissecção Ao)"
    },
    {
        "id": "status_epilepticus",
        "label": "Status Epilepticus"
    }
];

// Application state
let currentTheme = 'light';
let patientWeight = 0;
let selectedContexts = new Set();

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
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
    pages.forEach(page => {
        page.classList.remove('active');
    });
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
    
    // Calculator button
    const accessCalculatorBtn = document.getElementById('access-calculator');
    if (accessCalculatorBtn) {
        accessCalculatorBtn.addEventListener('click', function(e) {
            console.log('Access calculator clicked');
            e.preventDefault();
            showPage('calculator-page');
        });
    }
    
    // Back button
    const backHomeBtn = document.getElementById('back-home');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', function(e) {
            console.log('Back home clicked');
            e.preventDefault();
            showPage('homepage');
        });
    }
    
    // Weight input
    const patientWeightInput = document.getElementById('patient-weight');
    if (patientWeightInput) {
        patientWeightInput.addEventListener('input', function() {
            patientWeight = parseFloat(this.value) || 0;
            console.log('Patient weight changed to:', patientWeight);
            renderMedications();
            renderSedationDrugs();
        });
    }
}

// Clinical context checkboxes
function populateContextCheckboxes() {
    const contextCheckboxes = document.getElementById('context-checkboxes');
    if (!contextCheckboxes) return;
    
    contextCheckboxes.innerHTML = '';
    
    contextosClinicosData.forEach(context => {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'context-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = context.id;
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedContexts.add(context.id);
            } else {
                selectedContexts.delete(context.id);
            }
            console.log('Context changed, selected:', Array.from(selectedContexts));
            renderMedications();
        });
        
        const label = document.createElement('label');
        label.htmlFor = context.id;
        label.textContent = context.label;
        
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        contextCheckboxes.appendChild(checkboxDiv);
    });
}

// Medication recommendations logic
function getMedicationRecommendation(medication, contexts) {
    const contextArray = Array.from(contexts);
    
    // Check contraindications first
    if (medication.contraindicatedIn && medication.contraindicatedIn.some(ctx => contextArray.includes(ctx))) {
        return 'contraindicated';
    }
    
    // Check cautions
    if (medication.cautionIn && medication.cautionIn.some(ctx => contextArray.includes(ctx))) {
        return 'caution';
    }
    
    // Check preferences
    if (medication.preferredIn && medication.preferredIn.some(ctx => contextArray.includes(ctx))) {
        return 'recommended';
    }
    
    return 'neutral';
}

// Format numbers in Brazilian style
function formatNumber(num) {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

// Calculate medication dose
function calculateDose(medication, weight) {
    if (!weight || weight <= 0) return null;
    
    const hasChoque = selectedContexts.has('choque');
    
    let dosePerKg = medication.dosePorKg;
    let formula = medication.doseFormula;
    
    // Check for dose adjustment
    if (hasChoque && medication.doseAdjustmentIn && medication.doseAdjustmentIn.includes('choque')) {
        dosePerKg = medication.dosePorKgAjustada || medication.dosePorKg;
        formula = medication.doseFormulaAjustada || medication.doseFormula;
    }
    
    const totalDose = dosePerKg * weight;
    const volumeML = totalDose / medication.concentracaoMgMl;
    
    return {
        formula,
        totalDose,
        volumeML: Math.round(volumeML * 10) / 10
    };
}

// Render medications
function renderMedications() {
    const medicationsSection = document.getElementById('medications-section');
    if (!medicationsSection) return;
    
    const categories = {};
    
    // Group medications by category
    medicamentosIOT.forEach(med => {
        if (!categories[med.categoria]) {
            categories[med.categoria] = [];
        }
        categories[med.categoria].push(med);
    });
    
    medicationsSection.innerHTML = '';
    
    Object.keys(categories).sort().forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'medication-category';
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        const medicationsGrid = document.createElement('div');
        medicationsGrid.className = 'medications-grid';
        
        categories[category].forEach(medication => {
            const recommendation = getMedicationRecommendation(medication, selectedContexts);
            const dose = calculateDose(medication, patientWeight);
            
            const medicationCard = document.createElement('div');
            medicationCard.className = `medication-card ${recommendation}`;
            
            let badgeText = '';
            let badgeClass = '';
            
            switch (recommendation) {
                case 'recommended':
                    badgeText = 'Recomendado';
                    badgeClass = 'recommended';
                    break;
                case 'contraindicated':
                    badgeText = 'Contraindicado';
                    badgeClass = 'contraindicated';
                    break;
                case 'caution':
                    badgeText = 'Cautela';
                    badgeClass = 'caution';
                    break;
            }
            
            medicationCard.innerHTML = `
                <div class="medication-header">
                    <h3 class="medication-name">${medication.nome}</h3>
                    ${badgeText ? `<span class="recommendation-badge ${badgeClass}">${badgeText}</span>` : ''}
                </div>
                <div class="medication-info">
                    <p><strong>Concentração:</strong> ${medication.concentracaoTexto}</p>
                    <p><strong>Dose:</strong> ${dose ? dose.formula : medication.doseFormula}</p>
                </div>
                ${dose ? `
                    <div class="dose-calculation">
                        <strong>Volume: ${formatNumber(dose.volumeML)} mL</strong>
                    </div>
                ` : ''}
                <p class="medication-notes">${medication.notes}</p>
            `;
            
            medicationsGrid.appendChild(medicationCard);
        });
        
        categoryDiv.appendChild(medicationsGrid);
        medicationsSection.appendChild(categoryDiv);
    });
}

// Calculate sedation dose range
function calculateSedationDose(drug, weight) {
    if (!weight || weight <= 0) return null;
    
    const minDose = drug.doseMin * weight;
    const maxDose = drug.doseMax * weight;
    
    return {
        minDose: Math.round(minDose * 100) / 100,
        maxDose: Math.round(maxDose * 100) / 100,
        unit: drug.unidade
    };
}

// Render sedation drugs
function renderSedationDrugs() {
    const sedationDrugs = document.getElementById('sedation-drugs');
    if (!sedationDrugs) return;
    
    sedationDrugs.innerHTML = '';
    
    sedoanalgesiaData.forEach(drug => {
        const doseRange = calculateSedationDose(drug, patientWeight);
        
        const sedationCard = document.createElement('div');
        sedationCard.className = 'sedation-card';
        
        sedationCard.innerHTML = `
            <h3 class="sedation-name">${drug.nome}</h3>
            <div class="sedation-info">
                <p><strong>Diluição:</strong> ${drug.diluicao}</p>
                <p><strong>Concentração final:</strong> ${drug.concentracaoFinal}</p>
                <p><strong>Infusão:</strong> ${drug.infusaoMlH}</p>
                ${drug.alternativa ? `<p><strong>Alternativa:</strong> ${drug.alternativa}</p>` : ''}
                ${drug.observacao ? `<p><strong>Observação:</strong> ${drug.observacao}</p>` : ''}
            </div>
            ${doseRange ? `
                <div class="dose-range">
                    <strong>Dose calculada: ${formatNumber(doseRange.minDose)} - ${formatNumber(doseRange.maxDose)} ${doseRange.unit}/kg/h</strong>
                </div>
            ` : ''}
        `;
        
        sedationDrugs.appendChild(sedationCard);
    });
}
