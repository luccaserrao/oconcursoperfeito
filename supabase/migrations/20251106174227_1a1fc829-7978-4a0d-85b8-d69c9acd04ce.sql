-- Tabela para agendar envio de emails automatizados
CREATE TABLE email_automation_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_response_id uuid NOT NULL REFERENCES quiz_responses(id),
  user_email text NOT NULL,
  user_name text NOT NULL,
  email_sequence_number integer NOT NULL CHECK (email_sequence_number IN (1, 2)),
  scheduled_for timestamptz NOT NULL,
  sent_at timestamptz,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'skipped', 'failed')),
  skip_reason text,
  created_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX idx_email_queue_scheduled ON email_automation_queue(scheduled_for, status);
CREATE INDEX idx_email_queue_quiz ON email_automation_queue(quiz_response_id);
CREATE INDEX idx_email_queue_status ON email_automation_queue(status);

-- RLS: Apenas service role pode gerenciar
ALTER TABLE email_automation_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage email queue"
ON email_automation_queue FOR ALL
USING (auth.role() = 'service_role');