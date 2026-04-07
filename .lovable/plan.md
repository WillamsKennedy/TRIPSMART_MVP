

## Plano: Avaliações, Custos Reais e Remoção de Menções ao n8n

### 1. Criar tabelas de avaliação para hospedagens e atividades

Duas novas tabelas no banco de dados:

- **`accommodation_reviews`**: `id`, `user_id`, `accommodation_name`, `city_id`, `score` (1-5), `comment`, `created_at`
- **`activity_reviews`**: `id`, `user_id`, `activity_name`, `city_id`, `score` (1-5), `comment`, `created_at`

Ambas com RLS: qualquer autenticado pode ler, apenas o próprio usuário pode inserir/atualizar sua avaliação.

### 2. Adicionar UI de avaliação

- **StepSummary.tsx**: Após o roteiro ser gerado/exibido, cada atividade e a hospedagem selecionada terão um componente de estrelas (1-5) clicável + campo de comentário opcional. As avaliações são salvas no banco ao clicar.
- **StepAccommodation.tsx**: Exibir a média de avaliações de outros usuários em cada hospedagem (se houver dados no banco).
- **StepCity.tsx**: Exibir a média de avaliações de outros usuários em cada atividade (se houver dados no banco).

### 3. Estimativa de custos real via n8n

Atualmente o `costBreakdown` vem do JSON gerado pelo n8n no `generate-itinerary`. O plano é:

- Garantir que o `generate-itinerary` do n8n já retorne `costBreakdown` com valores baseados nos parâmetros reais (orçamento, dias, pessoas, hospedagem selecionada).
- No frontend, **substituir** os valores de hospedagem do `costBreakdown` pelo custo real calculado (`pricePerNight * days`), e somar os `avgCostPerPerson` das atividades selecionadas × pessoas. Assim a estimativa é híbrida: dados reais do planejamento + estimativas do n8n para alimentação/extras.

### 4. Remover todas as menções a "n8n" no frontend

Arquivos afetados e mudanças:

| Arquivo | Mudança |
|---|---|
| `StepCity.tsx` | Renomear `fetchSpotsFromN8n` → `fetchSpots`. Remover comentário "n8n not configured yet". Trocar mensagem "Configure o webhook get-tourist-spots no n8n" → "Não foi possível carregar as atividades. Tente novamente." |
| `StepSummary.tsx` | Trocar mensagem "Configure o webhook generate-itinerary no n8n." → "Não foi possível gerar o roteiro. Tente novamente mais tarde." |
| `StepAccommodation.tsx` | Nenhuma menção visível a n8n (apenas o invoke interno, que permanece como está) |

### 5. Componente reutilizável de avaliação

Criar `src/components/StarRating.tsx` — componente com 5 estrelas clicáveis, exibe a nota atual, permite alterar. Props: `value`, `onChange`, `readOnly`, `size`.

### Resumo dos arquivos a criar/editar

- **Criar**: 1 migration SQL, `src/components/StarRating.tsx`
- **Editar**: `StepSummary.tsx`, `StepAccommodation.tsx`, `StepCity.tsx`

