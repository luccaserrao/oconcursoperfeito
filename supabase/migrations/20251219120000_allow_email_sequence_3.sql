-- Expand automation queue to support 3-step sequences
ALTER TABLE email_automation_queue
  DROP CONSTRAINT IF EXISTS email_automation_queue_email_sequence_number_check;

ALTER TABLE email_automation_queue
  ADD CONSTRAINT email_automation_queue_email_sequence_number_check
  CHECK (email_sequence_number IN (1, 2, 3));
