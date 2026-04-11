

## Plano: Imagem no hero, imagens nos destinos e StepBudget compacto

### 1. Imagem de fundo de Pernambuco no hero azul

- **Landing.tsx**: Na seção hero (`bg-pe-blue`), adicionar uma imagem de fundo de Pernambuco (ex: Marco Zero ou vista aérea de Recife) com `object-cover` e overlay escuro semi-transparente para manter legibilidade do texto.
- Substituir os blocos decorativos de formas (`bg-pe-red/10`, `bg-pe-gold/10`) pela imagem.

### 2. Imagens reais nos cards de destinos em destaque

- **Landing.tsx**: No array `featuredDestinations`, adicionar campo `imageUrl` usando as URLs já existentes em `pernambucoImages` do `mockData.ts`.
- Na renderização dos cards, substituir o bloco de emoji (`text-7xl`) por uma `<img>` com `object-cover` ocupando a mesma área (`h-40 md:h-48`). Manter o emoji como fallback caso a imagem falhe.

### 3. StepBudget caber na tela sem scroll

- **StepBudget.tsx**: Compactar o layout para caber em ~867px de viewport:
  - Reduzir o título (`text-3xl` em vez de `text-4xl/5xl`) e gaps (`gap-4` em vez de `gap-10`).
  - Tornar os cards de orçamento mais compactos (`p-3` em vez de `p-4`, gap menor).
  - Colocar os contadores (adultos, crianças, quartos, dias) todos numa grid `grid-cols-4` em desktop, compactando o espaço vertical.
  - Remover o toggle de casal como bloco separado — integrá-lo na mesma linha dos contadores.
  - Reduzir tamanho dos botões +/- (`w-8 h-8`).
  - Botão "Continuar" menor (`h-12`).

### Arquivos a editar

| Arquivo | Mudança |
|---|---|
| `src/pages/Landing.tsx` | Imagem de fundo no hero; imageUrl nos cards de destinos |
| `src/components/StepBudget.tsx` | Layout compacto para caber na viewport sem scroll |

