-- Add quiz version and macro area result to quiz_responses
alter table public.quiz_responses
  add column if not exists quiz_version text,
  add column if not exists macro_area_result jsonb;
