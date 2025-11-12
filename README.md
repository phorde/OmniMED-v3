# OmniMED - Aplicacao de Suporte Clinico para Medicina de Emergencia

[![Status](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/phorde/OmniMED-v3)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/phorde/OmniMED-v3/releases)

> Sistema clinico inteligente para calculo de medicacoes e protocolos de sedacao analgesia em ambiente de emergencia. Otimizado para escalabilidade em ambientes hospitalares de alta demanda.

**Live Demo:** [omni-med-v3.vercel.app](https://omni-med-v3.vercel.app/)

---

## Indice

- [Visao Geral](#visao-geral)
- [Caracteristicas Principais](#caracteristicas-principais)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Setup Local](#setup-local)
- [Deployment](#deployment)
- [Roadmap de Escalabilidade](#roadmap-de-escalabilidade)
- [Boas Praticas](#boas-praticas)
- [Seguranca](#seguranca)
- [Contribuindo](#contribuindo)
- [Suporte](#suporte)

---

## Visao Geral

OmniMED v3 eh uma aplicacao web desenvolvida para profissionais de saude em unidades de pronto atendimento (UPA) e unidades de terapia intensiva (UTI). A ferramenta fornece:

- **Calculos farmacologicos precisos** baseados no peso do paciente
- **Recomendacoes contextualizadas** de medicacoes conforme cenarios clinicos
- **Protocolos de sedacao-analgesia** com diluicoes otimizadas
- **Interface intuitiva** com modo claro/escuro
- **Acesso rapido** sem necessidade de autenticacao

**Casos de Uso:**
- Intubacao orotraqueal (IOT) em emergencia
- Sedacao analgesia em UTI
- Triagem e protocolos de manejo de choque
- Broncoespasmo e status epilepticus

---

## Caracteristicas Principais

✓ Calculo de dosagem de medicacoes (mcg/kg, mg/kg)
✓ Ajuste automatico de doses em cenarios especiais (choque, HIC)
✓ Filtro por contexto clinico (Choque, Broncoespasmo, TCE, etc)
✓ Badges de recomendacao (Recomendado, Contraindicado, Cautela)
✓ Protocolo de sedacao-analgesia com diluicoes e infusoes
✓ Interface responsiva (mobile-first)
✓ Dark/Light mode com persistencia
✓ Sem dependencias externas (vanilla JavaScript)
✓ Leve e rapido (~15KB)
✓ PWA-ready para uso offline

---

## Arquitetura

### Arquitetura em Camadas

```
┌─────────────────────────────────────────────────┐
│         APRESENTACAO (Frontend)                 │
│  index.html | style.css | app.js               │
│  - Interface responsiva                         │
│  - Tema claro/escuro                           │
│  - Navegacao entre paginas                      │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│         LOGICA DE NEGOCIO (JavaScript)         │
│  - Calculos farmacologicos                     │
│  - Contextos clinicos                          │
│  - Recomendacoes de medicacao                  │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│         DADOS (JSON/DataStructures)             │
│  - medicamentosIOT[]                           │
│  - sedoanalgesiaData[]                         │
│  - contextosClinicosData[]                     │
└─────────────────────────────────────────────────┘
```

### Stack Tecnologico Atual

**Frontend:**
- HTML5 semantico
- CSS3 (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript (ES6+)
- Sem frameworks (zero dependencias)

**Deployment:**
- Vercel (hospedagem + CI/CD)
- GitHub (versionamento)

---

## Estrutura do Projeto

```
OmniMED-v3/
├── app.js                 # Logica principal da aplicacao (482 linhas)
├── index.html             # Estrutura HTML
├── style.css              # Estilos e responsividade
├── README.md              # Documentacao (ESTE ARQUIVO)
├── ARCHITECTURE.md        # Documentacao detalhada de arquitetura
├── SCALING.md             # Roadmap de escalabilidade
├── BEST_PRACTICES.md      # Padroes e boas praticas
└── .gitignore             # Arquivos ignorados pelo Git
```

### Descricao dos Arquivos Base (NAO ALTERAR)

#### `app.js` (15.8 KB)
Contem toda a logica da aplicacao:
- Dados de medicacoes (medicamentosIOT, sedoanalgesiaData, contextosClinicosData)
- Gerenciamento de tema
- Navegacao entre paginas
- Calculos de dosagem
- Recomendacoes contextualizadas
- Renderizacao de cards de medicacao

#### `index.html`
Estrutura HTML semântica:
- Header com logo e botao de tema
- Pagina inicial
- Pagina de calculadora
- Secoes de medicacoes e sedacao
- Checkboxes de contexto clinico

#### `style.css`
Estilos responsivos:
- Grid layout para cards
- Dark/Light mode com CSS variables
- Mobile-first design
- Badges de recomendacao
- Animacoes suaves

---

## Setup Local

### Pre-requisitos

- Navegador moderno (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Python 3.7+ OU Node.js 12+ (para rodar servidor local)
- Git (para clonar repositorio)

### Instalacao

**1. Clonar o repositorio:**

```bash
git clone https://github.com/phorde/OmniMED-v3.git
cd OmniMED-v3
```

**2. Rodar localmente (Opcao 1 - Python):**

```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

**3. Rodar localmente (Opcao 2 - Node.js):**

```bash
# Instalar http-server globalmente
npm install -g http-server

# Rodar servidor
http-server -p 8000
```

**4. Acessar no navegador:**

```
http://localhost:8000
```

---

## Deployment

### Deployment em Producao (Vercel)

A aplicacao esta configurada para Deploy Automatico no Vercel:

**1. Acesso rapido:**
- Live: https://omni-med-v3.vercel.app
- Dashboard: https://vercel.com/dashboard

**2. Workflow automatico:**
- Push para `main` -> Vercel dispara build automaticamente
- Deployment em ~30-60 segundos
- Preview URLs para PRs
- Rollback instantaneo se necessario

**3. Configurar Vercel (primeira vez):**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login e deploy
vercel login
vercel deploy --prod
```

### Deployment Alternativo (GitHub Pages)

```bash
# Criar branch gh-pages
git checkout --orphan gh-pages
git rm -rf .

# Copiar arquivos
git checkout main -- app.js index.html style.css
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Depois, ativar em Settings > Pages > Branch: gh-pages

### Deployment em Ambiente Corporativo

**Docker (se necessario):**

```dockerfile
FROM nginx:alpine
COPY app.js /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build e run
docker build -t omnimed-v3 .
docker run -p 80:80 omnimed-v3
```

---

## Roadmap de Escalabilidade

### Fase 1: MVP Atual ✅
- [x] Calculadora de medicacoes
- [x] Interface intuitiva
- [x] Deploy em Vercel

### Fase 2: Backend e Persistencia (3-6 meses)
**Objetivo:** Suportar multiplos usuarios, auditar alteracoes

```
Tecnologia sugerida:
- Node.js + Express
- MongoDB ou PostgreSQL
- JWT para autenticacao
- API REST documentada com Swagger
```

**Features:**
- Autenticacao de usuarios (email/senha, SSO)
- Historico de calculos por paciente
- Integracao com sistemas hospitalares (FHIR standard)
- Logs de auditoria para compliance
- Dashboard de uso e metricas

**Arquitetura Backend:**
```
api-server/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   └── config/
├── tests/
├── docker-compose.yml
├── .env.example
└── package.json
```

### Fase 3: Mobile e PWA (6-9 meses)
**Objetivo:** Acesso offline e instalacao como app

**Features:**
- Progressive Web App (PWA) - offline-first
- Sincronizacao quando reconectado
- Notificacoes push para lembretes de dose
- Service Workers para cache inteligente
- Manifiesto de instalacao

### Fase 4: IA e Machine Learning (9-12 meses)
**Objetivo:** Recomendacoes inteligentes baseadas em dados

**Features:**
- Predicao de reacoes adversas
- Otimizacao de protocolos por perfil de paciente
- Deteccao de erros de medicacao (double-check)
- Integracao com bancos de dados farmacologicos em tempo real

### Fase 5: Escalabilidade em Producao (12+ meses)
**Objetivo:** Suportar milhares de usuarios simultaneos

**Melhorias:**
- Load balancing (NGINX, AWS ELB)
- Cache distribuido (Redis)
- Database replication (Master-Slave)
- CDN para assets estaticos
- Monitoramento 24/7 (Prometheus, Grafana)
- Auto-scaling com Kubernetes

---

## Boas Praticas

### Padroes de Codigo

**1. Modularizacao**

Atualmente tudo esta em um arquivo. Para escalar:

```javascript
// medication.module.js
export const MedicationService = {
  calculateDose(medication, weight) { /* ... */ },
  getRecommendation(medication, contexts) { /* ... */ }
};

// context.module.js
export const ContextService = {
  getSelectedContexts() { /* ... */ },
  addContext(contextId) { /* ... */ }
};
```

**2. Nomes consistentes**

```javascript
// BOM
const patientWeight = 70;
const medicationDose = calculateDose(medication, patientWeight);

// RUIM
const pw = 70;
const md = calc(med, pw);
```

**3. Documentacao em Codigo**

```javascript
/**
 * Calcula a dose de medicamento baseada no peso do paciente
 * @param {Object} medication - Objeto com dados do medicamento
 * @param {number} weight - Peso do paciente em kg
 * @returns {Object|null} Objeto com totalDose, volumeML, formula ou null
 */
function calculateDose(medication, weight) {
  if (!weight || weight <= 0) return null;
  // ...
}
```

### Performance

**1. Minificacao**
```bash
npx terser app.js -o app.min.js
```

**2. Lazy Loading**
Carregar dados sob demanda em vez de tudo na inicializacao

**3. Cache local**
```javascript
localStorage.setItem('userPreferences', JSON.stringify({theme: 'dark'}));
```

### Seguranca

**1. Input Validation**
```javascript
function validateWeight(weight) {
  if (typeof weight !== 'number') return false;
  if (weight <= 0 || weight > 500) return false;
  return true;
}
```

**2. HTTPS Obrigatorio**
Vercel fornece HTTPS automaticamente

**3. CORS Configuration** (quando tiver backend)
```javascript
app.use(cors({
  origin: ['https://omni-med-v3.vercel.app'],
  credentials: true
}));
```

---

## Seguranca

### Conformidade Regulatoria

Para uso em ambiente hospitalar, considere:

**LGPD (Lei Geral de Protecao de Dados):**
- [ ] Dados de pacientes sao PII (Personally Identifiable Information)
- [ ] Implementar criptografia ponta-a-ponta
- [ ] Politica clara de privacidade
- [ ] Consentimento informado do paciente
- [ ] Direito ao esquecimento (GDPR-like)

**HIPAA (US Health Insurance Portability):**
- [ ] Audit logs de todos os acessos
- [ ] Two-factor authentication
- [ ] Encriptacao em repouso e em transito
- [ ] Business Associate Agreements (BAA)

**Recomendacoes Tecnicas:**
1. Nunca armazenar dados sensveis de paciente localmente
2. Usar tokens JWT com expiracao curta
3. Implementar rate limiting por IP
4. CORS restrictivo (apenas dominios autorizados)
5. CSP (Content Security Policy) headers

### Exemplo de Headers Seguranca

```
# vercel.json ou nginx.conf
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self';
Referrer-Policy: no-referrer-when-downgrade
```

---

## Monitoramento e Logging

### Metricas Importantes

**Performance:**
- Tempo de carregamento pagina (< 2s)
- Latencia de calculo dose (< 100ms)
- Taxa de erro JavaScript

**Negocio:**
- Calculos realizados por dia/mes
- Medicacoes mais consultadas
- Cenarios clinicos mais comuns

### Ferramentas Recomendadas

```
- Sentry: Rastreamento de erros
- Google Analytics: Comportamento do usuario
- Vercel Analytics: Performance do site
- LogRocket: Sessoes de usuario (opcional)
```

---

## Contribuindo

### Como Contribuir

1. Fork o repositorio
2. Criar branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit com mensagens descritivas (`git commit -m 'Add MinhaFeature'`)
4. Push para o branch (`git push origin feature/MinhaFeature`)
5. Abrir Pull Request com descricao detalhada

### Diretrizes de Pull Request

- Testar localmente antes de fazer PR
- Atualizar documentacao se necessario
- Manter compatibilidade com navegadores modernos
- Adicionar comentarios em mudancas complexas
- Nao alterar app.js, index.html ou style.css sem discussao

### Reporte de Bugs

Ao relatar bugs, incluir:
- SO e navegador
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se aplicavel

---

## FAQ

**P: Os dados do paciente ficam armazenados?**
R: Nao. Atualmente tudo eh calculado localmente no navegador. Nenhum dado eh enviado para servidor.

**P: Funciona offline?**
R: Sim. Apos primeiro acesso, a aplicacao pode ser usada sem internet (via cache).

**P: Qual a precisa dos calculos?**
R: Os calculos sao baseados em formulas clinicas consolidadas. Recomenda-se sempre validar com fontes oficiais.

**P: Qual navegador preciso?**
R: Qualquer navegador moderno (Chrome, Firefox, Safari, Edge). Minimo IE 11 com polyfills.

**P: Posso usar em producao hospitalar?**
R: Com cautelas. Recomenda-se auditoria de codigo, testes de seguranca e conformidade regulatoria.

---

## Suporte

### Canais de Comunicacao

- **Issues:** https://github.com/phorde/OmniMED-v3/issues
- **Email:** [admin@omnimed.com] (futuro)
- **Discord:** [servidor comunitario] (futuro)

### Roadmap Publico

Ver issues com label `enhancement` para features planejadas.

---

## Licenca

MIT License - veja arquivo LICENSE para detalhes.

Esta aplicacao foi desenvolvida como ferramenta clinica educacional. 
**Sempre consulte equipe medica e protocolos hospitalares oficiais**.

---

## Autores

- **phorde** - Desenvolvedor principal

---

## Agradecimentos

- Protocolos clinicos da ACEP (American College of Emergency Physicians)
- Comunidade medica de emergencia brasileira
- Todos os contribuidores

---

**Ultima atualizacao:** Novembro 2025
**Versao:** 3.0.0
**Status:** Producao
