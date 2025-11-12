'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { medicamentosIOT, sedoanalgesiaData, contextosClinicosData } from '@/app/data/medications';
import { calculateDose, calculateSedationDose, getMedicationRecommendation, formatNumber } from '@/app/lib/calculations';

export default function Calculator() {
  const [weight, setWeight] = useState(0);
  const [selectedContexts, setSelectedContexts] = useState<Set<string>>(new Set());
  
  const toggleContext = (id: string) => {
    const newContexts = new Set(selectedContexts);
    if (newContexts.has(id)) {
      newContexts.delete(id);
    } else {
      newContexts.add(id);
    }
    setSelectedContexts(newContexts);
  };
  
  const medications = medicamentosIOT;
  const grouped = medications.reduce((acc: any, med) => {
    if (!acc[med.categoria]) acc[med.categoria] = [];
    acc[med.categoria].push(med);
    return acc;
  }, {});
  
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>OmniMed</span>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <div className="container">
          <div className="page-header">
            <Link href="/" className="back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 19-7-7 7-7"/><path d="m19 12-7 0"/>
              </svg>
              Voltar
            </Link>
            <h1>Calculadora de Medicamentos para IOT</h1>
          </div>
          
          <div className="weight-section">
            <div className="card">
              <div className="card__body">
                <div className="form-group">
                  <label className="form-label" htmlFor="patient-weight">Peso do Paciente (kg)</label>
                  <input 
                    type="number" 
                    id="patient-weight" 
                    className="form-control" 
                    placeholder="Ex: 70"
                    min="1"
                    max="300"
                    step="0.1"
                    value={weight || ''}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="clinical-context">
            <div className="card">
              <div className="card__body">
                <h3>Contexto Clínico</h3>
                <p className="context-description">Selecione as condições relevantes para receber recomendações personalizadas:</p>
                <div className="context-checkboxes">
                  {contextosClinicosData.map(context => (
                    <div key={context.id} className="context-checkbox">
                      <input 
                        type="checkbox" 
                        id={context.id}
                        checked={selectedContexts.has(context.id)}
                        onChange={() => toggleContext(context.id)}
                      />
                      <label htmlFor={context.id}>{context.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="medications-section">
            {Object.keys(grouped).sort().map(category => (
              <div key={category} className="medication-category">
                <h2 className="category-title">{category}</h2>
                <div className="medications-grid">
                  {grouped[category].map((med: any) => {
                    const rec = getMedicationRecommendation(med, selectedContexts);
                    const dose = calculateDose(med, weight, selectedContexts);
                    let badge = '';
                    let badgeClass = '';
                    if (rec === 'recommended') { badge = 'Recomendado'; badgeClass = 'recommended'; }
                    else if (rec === 'contraindicated') { badge = 'Contraindicado'; badgeClass = 'contraindicated'; }
                    else if (rec === 'caution') { badge = 'Cautela'; badgeClass = 'caution'; }
                    
                    return (
                      <div key={med.id} className="medication-card">
                        <div className="medication-header">
                          <h3 className="medication-name">{med.nome}</h3>
                          {badge && <span className={`recommendation-badge ${badgeClass}`}>{badge}</span>}
                        </div>
                        <div className="medication-info">
                          <p><strong>Concentração:</strong> {med.concentracaoTexto}</p>
                          <p><strong>Dose:</strong> {dose ? dose.formula : med.doseFormula}</p>
                        </div>
                        {dose && (
                          <div className="dose-calculation">
                            <strong>Volume: {formatNumber(dose.volumeML)} mL</strong>
                          </div>
                        )}
                        <p className="medication-notes">{med.notes}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="sedation-section">
            <div className="card">
              <div className="card__body">
                <h2>Sedoanalgesia Pós-Intubação</h2>
                <p>Medicamentos para sedação e analgesia contínua após o procedimento:</p>
                <div id="sedation-drugs">
                  {sedoanalgesiaData.map(drug => {
                    const doseRange = calculateSedationDose(drug.doseMin, drug.doseMax, weight);
                    return (
                      <div key={drug.id} className="sedation-card">
                        <h3 className="sedation-name">{drug.nome}</h3>
                        <div className="sedation-info">
                          <p><strong>Diluição:</strong> {drug.diluicao}</p>
                          <p><strong>Concentração final:</strong> {drug.concentracaoFinal}</p>
                          <p><strong>Infusão:</strong> {drug.infusaoMlH}</p>
                          {drug.alternativa && <p><strong>Alternativa:</strong> {drug.alternativa}</p>}
                          {drug.observacao && <p><strong>Observação:</strong> {drug.observacao}</p>}
                        </div>
                        {doseRange && (
                          <div className="dose-range">
                            <strong>Dose calculada: {formatNumber(doseRange.minDose)} - {formatNumber(doseRange.maxDose)} {drug.unidade}/kg/h</strong>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="sedation-tips">
                  <div className="tip-box">
                    <h4>💡 Dica para Baixa Disponibilidade de Bombas</h4>
                    <p>Em cenários com poucas bombas de infusão disponíveis, priorize Fentanil ou Cetamina que podem ser utilizados puros em BIC (Bomba de Infusão Contínua).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>© 2024 OmniMed. Desenvolvido para profissionais de saúde.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
