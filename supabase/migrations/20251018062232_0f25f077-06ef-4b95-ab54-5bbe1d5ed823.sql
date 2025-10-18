-- Tabela para armazenar respostas do quiz e leads
CREATE TABLE quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  
  -- Dados do lead
  name text NOT NULL,
  email text NOT NULL,
  
  -- Respostas do quiz (armazenadas como JSON)
  answers jsonb NOT NULL,
  
  -- Resultado da IA
  ai_recommendation jsonb NOT NULL,
  
  -- Tracking do upsell
  clicked_upsell boolean DEFAULT false,
  upsell_clicked_at timestamptz
);

-- Index para buscar por email
CREATE INDEX idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses(created_at DESC);

-- RLS: Permitir inserção pública (quiz é público)
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quiz responses"
  ON quiz_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Para admin/analytics futuro (opcional)
CREATE POLICY "Service role can view all responses"
  ON quiz_responses
  FOR SELECT
  TO service_role
  USING (true);