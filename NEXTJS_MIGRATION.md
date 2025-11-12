# OmniMED v3 - Next.js + TailwindCSS + Shadcn/ui Migration Guide

## 📋 Estrutura de Diretórios do Novo Projeto

```
OmniMED-v3-Next/
├── app/                                    # Next.js 14 App Router
│   ├── layout.tsx                         # Layout raiz com providers
│   ├── page.tsx                           # Página inicial (Home)
│   ├── calculator/
│   │   └── page.tsx                       # Página da calculadora
│   └── globals.css                        # Estilos globais + TailwindCSS
│
├── components/                             # Componentes reutilizáveis
│   ├── ui/                               # Componentes Shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   └── theme-toggle.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx                    # Cabeçalho com tema e navegação
│   │   └── Footer.tsx
│   │
│   ├── medications/
│   │   ├── MedicationCard.tsx            # Card reutilizável para medicação
│   │   ├── MedicationList.tsx            # Lista de medicações com filtro
│   │   └── MedicationCategory.tsx        # Agrupamento por categoria
│   │
│   ├── calculators/
│   │   ├── DoseCalculator.tsx            # Calculadora de dose (IOT)
│   │   ├── SedationCalculator.tsx        # Calculadora de sedação/analgesia
│   │   ├── ClinicContextFilter.tsx       # Filtro de contexto clínico
│   │   └── ResultDisplay.tsx             # Exibição de resultados
│   │
│   ├── sedation/
│   │   ├── SedationCard.tsx              # Card para medicações de sedação
│   │   └── SedationList.tsx              # Lista de protocolos de sedação
│   │
│   └── common/
│       ├── Loading.tsx                   # Componente de carregamento
│       └── ErrorBoundary.tsx             # Boundary para erros
│
├── lib/                                    # Utilitários e funções
│   ├── utils.ts                          # Funções utilitárias (cn(), formatNumber())
│   ├── calculator-engine/
│   │   ├── medications.ts                # Dados de medicações (migrado de app.js)
│   │   ├── calculations.ts               # Lógica de cálculo de dose
│   │   ├── recommendations.ts            # Lógica de recomendações
│   │   └── clinical-contexts.ts          # Contextos clínicos
│   │
│   ├── hooks/
│   │   ├── useTheme.ts                   # Hook para gerenciamento de tema
│   │   ├── useCalculator.ts              # Hook para cálculos
│   │   └── useMedications.ts             # Hook para medicações
│   │
│   ├── types/
│   │   ├── medication.ts                 # Tipos de medicação
│   │   ├── calculator.ts                 # Tipos de calculadora
│   │   └── index.ts                      # Exportação de tipos
│   │
│   └── constants/
│       └── calculator.ts                 # Constantes da aplicação
│
├── context/                                # React Context para estado global
│   ├── ThemeContext.tsx                  # Contexto de tema (light/dark)
│   ├── CalculatorContext.tsx             # Contexto de estado da calculadora
│   └── MedicationContext.tsx             # Contexto de medicações
│
├── providers/
│   └── Providers.tsx                      # Wrapper de providers (ThemeProvider, etc)
│
├── styles/
│   └── tailwind.css                       # Configuração customizada do Tailwind
│
├── public/                                 # Arquivos estáticos
│   └── images/
│
├── config/
│   └── site.ts                            # Configurações do site
│
├── .env.local                             # Variáveis de ambiente local
├── .env.example                           # Exemplo de variáveis
├── tailwind.config.ts                    # Configuração TailwindCSS
├── tsconfig.json                         # Configuração TypeScript
├── next.config.js                        # Configuração Next.js
├── package.json                          # Dependências
└── README.md                             # Documentação
```

## 🔄 Mapeamento de Funcionalidades

### Dados Originais (app.js)
- `medicamentosIOT[]` → `lib/calculator-engine/medications.ts`
- `sedoanalgesiaData[]` → `lib/calculator-engine/medications.ts`
- `contextosClinicosData[]` → `lib/calculator-engine/clinical-contexts.ts`

### Lógica de Negócio
- `calculateDose()` → `lib/calculator-engine/calculations.ts`
- `calculateSedationDose()` → `lib/calculator-engine/calculations.ts`
- `getMedicationRecommendation()` → `lib/calculator-engine/recommendations.ts`
- `formatNumber()` → `lib/utils.ts`

### Gerenciamento de Estado
- Tema (light/dark) → `context/ThemeContext.tsx` + localStorage
- Peso do paciente → `useCalculator()` hook
- Contextos clínicos selecionados → `useCalculator()` hook

### Componentes UI
- Cards de medicação → `MedicationCard.tsx`
- Cards de sedação → `SedationCard.tsx`
- Toggle de tema → `ui/theme-toggle.tsx`
- Badges de recomendação → `ui/badge.tsx`

## 🚀 Escalabilidade Futura

### Suporte para Múltiplas Calculadoras
```
app/
├── calculators/                           # Nova página de seleção
│   ├── page.tsx
│   ├── dose/                             # Calculadora de dose (IOT)
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── sedation/                         # Calculadora de sedação
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── shock-protocol/                   # Calculadora de choque
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── sepsis/                           # Calculadora de sepse
│       ├── page.tsx
│       └── layout.tsx
```

### Padrão para Novas Calculadoras

1. **Dados**: Criar arquivo em `lib/calculator-engine/[calculator-name].ts`
2. **Lógica**: Criar arquivo em `lib/calculator-engine/[calculator-name]-calc.ts`
3. **Componente**: Criar componente em `components/calculators/[CalculatorName].tsx`
4. **Hook**: Criar hook em `lib/hooks/use[CalculatorName].ts` (se necessário)
5. **Página**: Criar página em `app/calculators/[calculator-name]/page.tsx`

## 📦 Instalação e Setup

### 1. Clonar e Instalar
```bash
git clone https://github.com/phorde/OmniMED-v3.git
cd OmniMED-v3
npm install
# ou
yarn install
```

### 2. Setup de Shadcn/ui
```bash
npx shadcn-ui@latest init
# Configurar: TypeScript, Tailwind CSS (já configurado), import alias (@/)

# Adicionar componentes necessários
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
```

### 3. Variáveis de Ambiente
```bash
cp .env.example .env.local
```

### 4. Desenvolvimento
```bash
npm run dev
# Acessar em http://localhost:3000
```

### 5. Build para Produção
```bash
npm run build
npm start
```

## 🎨 Decisões de Design

### Por que Next.js?
- **Routing automático**: Estrutura de pastas = rotas
- **SSR/SSG**: Melhor performance e SEO
- **Image Optimization**: Imagens otimizadas automaticamente
- **API Routes**: Backend integrado se necessário
- **Vercel Integration**: Deploy com 1 clique

### Por que TailwindCSS?
- **Utility-first**: Desenvolvimento mais rápido
- **Sem CSS-in-JS**: Melhor performance
- **DarkMode nativo**: Suporte para tema claro/escuro
- **Responsivo por padrão**: Mobile-first
- **Customização fácil**: tailwind.config.ts

### Por que Shadcn/ui?
- **Componentes compostos**: Não é uma biblioteca rígida
- **Código copiado**: Você controla o código
- **Radix UI + Tailwind**: Acessibilidade + estilo
- **TypeScript**: Full type safety
- **Extensível**: Fácil de customizar

## 🔐 Segurança

- Input validation em todos os cálculos
- Tipos TypeScript para validação em compile-time
- CSP headers configurados em `next.config.js`
- Sanitização de dados antes de render

## 📊 Performance

- Code splitting automático
- Image optimization (se houver imagens)
- Bundle size otimizado
- Lazy loading de componentes

## 🧪 Testes (Futuro)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm test
```

## 📝 Notas Importantes

1. **LocalStorage**: Tema persistido em localStorage (client-side)
2. **Performance**: Cálculos permanecem 100% client-side (offline-first)
3. **Compatibilidade**: Funcionalidades idênticas ao app.js original
4. **Escalabilidade**: Pronta para adicionar backend + autenticação

## 🔗 Links Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hooks](https://react.dev/reference/react/hooks)
