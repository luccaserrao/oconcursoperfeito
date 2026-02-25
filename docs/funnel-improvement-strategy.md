# Plano de ajuste do funil do quiz (baseado em feedback real de comprador)

## Contexto do feedback analisado
Feedback recebido de usuário que comprou o relatório completo:
- Quiz percebido como claro e confiável.
- Dúvida pontual com termos genéricos (ex.: "rotinas operacionais") para público iniciante.
- Percepção de ausência do tema salarial no percurso do quiz.
- Forte gatilho de compra por confiança + curiosidade sobre a origem das informações.

Leitura estratégica: o funil já converte por credibilidade, mas há três oportunidades diretas de crescimento:
1) reduzir carga cognitiva de iniciantes (clareza sem jargão);
2) deixar a proposta salarial explícita e verificável;
3) reforçar transparência metodológica antes do checkout.

---

## Diagnóstico do funil completo (estado atual)

### 1) Landing / pré-quiz
**O que funciona hoje**
- Promessa clara de direcionamento e redução de erro de escolha.
- Prova social e linguagem de benefício.

**Gargalo observado pelo feedback**
- Ainda não antecipa de forma didática que alguns termos do quiz podem parecer técnicos para iniciantes.
- Transparência de metodologia aparece mais forte no fim do funil do que no início.

### 2) Quiz (respostas e experiência)
**O que funciona hoje**
- Estrutura direta e objetiva; percepção de clareza geral positiva.

**Gargalo observado pelo feedback**
- Termos como "rotina operacional" podem ser ambíguos para quem está no começo.
- Falta de glossário inline (definição curta no momento da dúvida).

### 3) Resultado gratuito / tela de oferta
**O que funciona hoje**
- Gera confiança e desperta curiosidade para o relatório completo.

**Gargalo observado pelo feedback**
- Possível desalinhamento entre expectativa de "análise salarial" e percepção do usuário no fluxo.
- Usuário quer entender melhor "de onde vêm as informações" antes/depois de pagar.

### 4) Pós-compra / entrega do relatório
**O que funciona hoje**
- Usuário compra por confiança e vontade de aprofundar.

**Gargalo observado pelo feedback**
- Risco de arrependimento silencioso se o relatório não tornar visíveis:
  - fontes de dados;
  - lógica de recomendação;
  - recorte salarial por carreira/faixa/região.

---

## Plano de ajuste (priorizado)

## Fase 1 — Correções rápidas (1 a 2 semanas)
1. **Adicionar microglossário no quiz (alto impacto, baixo esforço)**
   - Inserir ícone de ajuda/tooltip em termos técnicos.
   - Exemplo de definição: "Rotina operacional = atividades práticas do dia a dia, como fiscalização em campo, atendimento de ocorrência e execução de procedimentos."
   - Objetivo: reduzir dúvidas sem aumentar o número de perguntas.

2. **Reescrever alternativas com linguagem duplamente clara**
   - Formato recomendado: termo técnico + exemplo concreto.
   - Ex.: "Operações e rotina operacional" → "Operações práticas do dia a dia (ex.: fiscalização, patrulhamento, atendimento em campo)".

3. **Sinalizar salário já no resultado gratuito**
   - Inserir bloco "Faixa salarial média da área indicada" com observação: variação por órgão, estado e edital.
   - Não precisa entregar tudo de graça; basta confirmar que o tema existe e será detalhado no relatório completo.

4. **Adicionar bloco curto 'Como chegamos ao seu resultado' antes do CTA pago**
   - 3 bullets:
     - Perfil comportamental (RIASEC + respostas objetivas);
     - Cruzamento com requisitos e rotina dos cargos;
     - Referências públicas de editais/remuneração.

## Fase 2 — Estrutura de confiança e valor (2 a 4 semanas)
5. **Seção de metodologia expandida (acordeão) na oferta**
   - "Quais fontes usamos" (editais, portais oficiais, séries históricas internas).
   - "Como atualizamos" (periodicidade).
   - "Limites da análise" (salário inicial x progressão; variação regional).

6. **Reposicionar proposta salarial no funil**
   - Landing: promessa explícita "compatibilidade + faixa salarial + realidade da rotina".
   - Quiz: 1 pergunta de prioridade (salário, estabilidade, afinidade, qualidade de vida).
   - Oferta: preview de faixa salarial com trava para detalhamento completo.

7. **Pós-compra com onboarding orientado a confiança**
   - Primeiro bloco do relatório: "Como interpretar este diagnóstico".
   - Incluir "o que este relatório não promete" para calibrar expectativa.

## Fase 3 — Otimização com experimentos (4 a 8 semanas)
8. **Teste A/B de clareza de linguagem no quiz**
   - Variante A: texto atual.
   - Variante B: texto com exemplos e microglossário.
   - Métrica principal: taxa de conclusão do quiz.

9. **Teste A/B da transparência metodológica na oferta**
   - Variante A: CTA direto.
   - Variante B: CTA + bloco de fontes/metodologia acima do botão.
   - Métrica principal: conversão para compra.

10. **Teste A/B da ancoragem salarial**
   - Variante A: salário aparece só no relatório.
   - Variante B: preview de faixa salarial no resultado gratuito.
   - Métrica principal: CTR no checkout e taxa de compra.

---

## Backlog de implementação por área

### Produto/UX
- Mapear e marcar no questionário todos os termos com potencial de ambiguidade.
- Definir padrão de "linguagem para iniciantes": frase curta + exemplo.
- Incluir componente de tooltip/glossário reutilizável.

### Conteúdo/Cópia
- Criar glossário com 10–20 termos recorrentes (operacional, conformidade, auditoria, etc.).
- Reescrever promessas de salário com linguagem responsável (sem superpromessa).
- Escrever seção "metodologia e fontes" em duas camadas: curta (antes da compra) e completa (no relatório).

### Dados/Operação
- Definir tabela de fontes salariais e rotina por cargo (com data de atualização).
- Criar rotina de revisão mensal dos dados de remuneração e editais.
- Adicionar campo de "confiança da recomendação" por resultado.

### Analytics
- Instrumentar eventos:
  - `quiz_tooltip_opened`
  - `quiz_term_clarification_used`
  - `salary_preview_viewed`
  - `methodology_section_opened`
  - `methodology_section_opened_before_checkout`
- Criar dashboard por etapa para comparar iniciantes vs. usuários experientes.

---

## KPIs de sucesso
- **Clareza**: queda de dúvidas sobre termos técnicos em pesquisas qualitativas e suporte.
- **Engajamento do quiz**: +5% a +10% na conclusão para perfis iniciantes.
- **Confiança pré-compra**: aumento de abertura da seção de metodologia sem queda de conversão.
- **Conversão paga**: +8% a +15% no take-rate após exposição de salário + metodologia.
- **Qualidade pós-compra**: redução de pedidos de reembolso por desalinhamento de expectativa.

---

## Plano operacional sugerido (30 dias)
- **Semana 1**: revisão de copy das perguntas + microglossário + mapeamento de termos.
- **Semana 2**: bloco de salário no resultado grátis + resumo de metodologia antes do CTA.
- **Semana 3**: disparo dos testes A/B (clareza e metodologia) + instrumentação de eventos.
- **Semana 4**: leitura de dados, decisão de variantes vencedoras e rollout para 100% da base.

---

## Riscos e mitigação
- **Risco:** excesso de texto reduzir ritmo do quiz.
  - **Mitigação:** usar tooltips e exemplos curtos (conteúdo sob demanda).
- **Risco:** foco em salário gerar expectativa irreal.
  - **Mitigação:** comunicar faixas e condicionantes (órgão, região, progressão).
- **Risco:** transparência técnica ficar complexa demais.
  - **Mitigação:** arquitetura em camadas (resumo simples + detalhes expandíveis).

---

## Resultado esperado
Com esses ajustes, o funil mantém o que já funciona (clareza geral e confiança), resolve a fricção de iniciantes (jargão), reforça valor percebido (salário) e aumenta credibilidade decisória (metodologia/fonte), elevando conversão com menor risco de frustração pós-compra.
