-- Create email logs table for tracking all sent emails
CREATE TABLE email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text,
  email_type text NOT NULL,
  quiz_response_id uuid REFERENCES quiz_responses(id),
  sent_at timestamptz DEFAULT now(),
  status text DEFAULT 'sent',
  error_message text,
  resend_email_id text
);

-- Create indexes for better query performance
CREATE INDEX idx_email_logs_user_email ON email_logs(user_email);
CREATE INDEX idx_email_logs_quiz_response ON email_logs(quiz_response_id);
CREATE INDEX idx_email_logs_email_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at DESC);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Only service role can manage email logs
CREATE POLICY "Service role can manage email logs"
ON email_logs FOR ALL
USING (auth.role() = 'service_role');