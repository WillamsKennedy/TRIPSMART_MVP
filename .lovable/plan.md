

## Plano: Mobile, roteiro automático, avaliações no histórico, estado do planner e hotéis com link/avaliações

### 1. Ajustes mobile

- **Planner.tsx**: Navbar mais compacta em mobile (padding menor, logo menor). BudgetBar visível em mobile (atualmente `hidden sm:block`).
- **StepSummary.tsx**: Cards de custo em coluna única em mobile (`grid-cols-1` em vez de `grid-cols-2`). Botões de ação empilhados. Timeline com padding reduzido. Textos menores em mobile.
- **StepAccommodation.tsx**: Cards de hospedagem com layout empilhado (preço abaixo do nome em mobile).
- **TravelHistory.tsx**: Grid `grid-cols-1` em mobile (já está OK). Sheet full-width em mobile.

### 2. Gerar roteiro automaticamente ao chegar no summary

- **StepSummary.tsx**: Adicionar `useEffect` que chama `generateItinerary()` automaticamente ao montar o componente, removendo o botão "Gerar roteiro com IA" e o bloco de fallback. Exibir um skeleton/loading enquanto carrega.

### 3. Avaliação no histórico

- **TravelHistory.tsx**: No Sheet de detalhes, adicionar seção de avaliação para cada ponto turístico e hospedagem (usando `StarRating`). Buscar avaliações existentes do usuário ao abrir o detalhe. Permitir salvar/atualizar avaliações.

### 4. Persistir estado do planner e opção "continuar de onde parou"

- **Planner.tsx**: Salvar `data` e `step` no `sessionStorage` a cada mudança. Ao clicar no logo/voltar para home, navegar normalmente.
- **Landing.tsx / Index**: Ao detectar estado salvo no sessionStorage, mostrar um banner/botão "Continuar planejamento" que redireciona para `/planejar` restaurando o estado.
- **Planner.tsx**: No `useEffect` inicial, verificar sessionStorage e restaurar `data`/`step` se existir. Limpar sessionStorage ao completar (salvar/compartilhar) ou ao clicar "Nova viagem".

### 5. Hotéis com link de reserva e avaliações de hóspedes

- **StepAccommodation.tsx**: Adicionar campo `bookingUrl` ao card de hospedagem. Se o n8n retornar `bookingUrl`, exibir botão "Reservar" com link externo. As avaliações de hóspedes já estão implementadas (avgRatings). Garantir que apareçam de forma mais proeminente.
- **Tipo `AccommodationDetail`** em `travel.ts`: Adicionar campo opcional `bookingUrl?: string`.

### Arquivos a editar

| Arquivo | Mudanças |
|---|---|
| `src/pages/Planner.tsx` | Persistir estado em sessionStorage, restaurar ao montar |
| `src/pages/Landing.tsx` | Banner "Continuar planejamento" se houver estado salvo |
| `src/components/StepSummary.tsx` | Auto-gerar roteiro no mount, ajustes mobile |
| `src/pages/TravelHistory.tsx` | Seção de avaliação com StarRating no Sheet |
| `src/components/StepAccommodation.tsx` | Link de reserva, layout mobile |
| `src/types/travel.ts` | Adicionar `bookingUrl` ao `AccommodationDetail` |

