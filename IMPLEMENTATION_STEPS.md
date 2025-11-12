# OmniMED v3 - Guia de Implementação Passo-a-Passo

## Fase 1: Setup Inicial do Projeto

### 1.1 Clonar o Repositório
```bash
git clone https://github.com/phorde/OmniMED-v3.git omnimed-v3-next
cd omnimed-v3-next
```

### 1.2 Criar Novo Projeto Next.js
```bash
# Criar estrutura básica do Next.js
npx create-next-app@latest --typescript --tailwind --eslint --app .
```

### 1.3 Instalar Dependências
```bash
npm install

# Instalar Shadcn/ui
npx shadcn-ui@latest init

# Responder:
# - Use TypeScript? Yes
# - Use ESLint? Yes
# - Import alias? Yes (@/)

# Adicionar componentes base
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
```

## Fase 2: Criar Estrutura de Pastas

```bash
mkdir -p app/calculator
mkdir -p components/{ui,layout,medications,calculators,sedation,common}
mkdir -p lib/{calculator-engine,hooks,types,constants}
mkdir -p context
mkdir -p providers
mkdir -p config
```

## Fase 3: Configurar Arquivos Base

### 3.1 `tailwind.config.ts` - Customizar tema
- Adicionar colors customizadas para badges (recommended, caution, contraindicated)
- Configurar dark mode
- Adicionar fontes personalizadas

### 3.2 `tsconfig.json` - Verificar path alias
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 3.3 `next.config.js` - Adicionar headers de segurança
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ],
};
module.exports = nextConfig;
```

## Fase 4: Implementar Lógica de Négócio

### 4.1 Migrar Dados (`lib/calculator-engine/medications.ts`)
- Copiar medicamentosIOT[] de app.js
- Copiar sedoanalgesiaData[] de app.js
- Manter estrutura de objetos

### 4.2 Migrar Lógica (`lib/calculator-engine/calculations.ts`)
- Implementar calculateDose()
- Implementar calculateSedationDose()
- Implementar getMedicationRecommendation()
- Implementar formatNumber()

### 4.3 Definir Tipos (`lib/types/medication.ts`)
```typescript
export interface Medication {
  id: string;
  nome: string;
  categoria: string;
  concentracaoTexto: string;
  concentracaoMgMl: number;
  doseFormula: string;
  dosePorKg: number;
  notes: string;
  preferredIn?: string[];
  contraindicatedIn?: string[];
  cautionIn?: string[];
  doseAdjustmentIn?: string[];
  doseFormulaAjustada?: string;
  dosePorKgAjustada?: number;
}
```

## Fase 5: Criar Contexto e Hooks

### 5.1 Theme Context (`context/ThemeContext.tsx`)
- Gerenciar estado light/dark
- Persistir em localStorage
- Fornecer updateTheme()

### 5.2 Calculator Hook (`lib/hooks/useCalculator.ts`)
- Gerenciar patientWeight
- Gerenciar selectedContexts (Set)
- Fornecer addContext(), removeContext(), clearContexts()

### 5.3 Medications Hook (`lib/hooks/useMedications.ts`)
- Buscar medicações
- Filtrar por categoria
- Calcular doses

## Fase 6: Implementar Componentes

### 6.1 Layout Components
- **Header.tsx**: Logo, tema toggle, navegação
- **Footer.tsx**: Informações, versão

### 6.2 Medication Components
- **MedicationCard.tsx**: Exibir uma medicação
  - Props: medication, dose, recommendation
  - Renderizar badge de recomendação
  - Mostrar volume de dose

- **MedicationList.tsx**: Lista com filtro
  - Props: medications, patientWeight
  - Renderizar por categoria
  - Filtrar por contexto clínico

### 6.3 Calculator Components
- **DoseCalculator.tsx**: Entrada de peso e contexto
  - Input para peso
  - Checkboxes para contextos
  - Botão para calcular

- **ClinicContextFilter.tsx**: Seleção de contextos
  - Lista de checkboxes
  - Método para adicionar/remover

### 6.4 Sedation Components
- **SedationCard.tsx**: Card para cada droga de sedação
- **SedationList.tsx**: Lista com filtro

## Fase 7: Implementar Páginas

### 7.1 Home Page (`app/page.tsx`)
- Botão "Acessar Calculadora"
- Descrição do projeto
- Links para documentação

### 7.2 Calculator Page (`app/calculator/page.tsx`)
- Importar todos os componentes
- State: patientWeight, selectedContexts
- Renderizar: Header, DoseCalculator, MedicationList, SedationList, Footer

## Fase 8: Testes Locais

```bash
# Desenvolver localmente
npm run dev

# Acessar http://localhost:3000

# Testar funcionalidades:
# 1. Toggle tema (light/dark)
# 2. Inserir peso do paciente
# 3. Selecionar contextos clínicos
# 4. Verificar cálculos de dose
# 5. Verificar recomendações de medicação
# 6. Verificar layout responsivo (mobile/desktop)
```

## Fase 9: Build e Deploy

### 9.1 Build Local
```bash
npm run build
npm start
```

### 9.2 Deploy Vercel
```bash
# Conectar repo GitHub
vercel

# Ou via dashboard: https://vercel.com
```

## Fase 10: Documenção

- Atualizar README.md com novo setup
- Documentar componentes criados
- Criar guia de contribuição para novas calculadoras

## Checklist de Implementação

- [ ] Estrutura de pastas criada
- [ ] Configurações iniciais (Tailwind, TypeScript, Next.js)
- [ ] Dados de medicações migrados
- [ ] Lógica de cálculos implementada
- [ ] Tipos TypeScript definidos
- [ ] Context criado
- [ ] Hooks customizados criados
- [ ] Componentes UI criados (Button, Card, Badge, etc)
- [ ] Componentes de layout criados (Header, Footer)
- [ ] Componentes de medicação criados
- [ ] Componentes de calculadora criados
- [ ] Página Home implementada
- [ ] Página Calculator implementada
- [ ] Tema (light/dark) funcionando
- [ ] LocalStorage persistindo tema
- [ ] Cálculos de dose corretos
- [ ] Recomendações exibidas corretamente
- [ ] Responsive design validado
- [ ] Build sem erros
- [ ] Deploy em produção

## Notas Importantes

1. **Preservar Lógica Original**: Não alterar formação de cálculos ou recomendações
2. **Compatibilidade 100%**: Funcionalidades deve ser idênticas ao app.js original
3. **Performance**: Manter cálculos 100% client-side (offline-first)
4. **Escalabilidade**: Estrutura preparada para adicionar novas calculadoras
5. **TypeScript**: Usar tipos para prevenção de erros em compile-time

## Proximas Fases (Futuro)

### Fase 11: Backend + Database
- Implementar API routes (Next.js API)
- Adicionar autenticação (JWT)
- Persistir histórico de cálculos

### Fase 12: No vas Calculadoras
- Padrão para criacao de calculadoras
- Calculadora de Choque
- Calculadora de Sepse
- Calculadora de HIC

### Fase 13: PWA
- Service Workers
- Offline support
- Installável como app

### Fase 14: Mobile App
- React Native ou Flutter
- Sincronização com backend
