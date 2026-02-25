-- Add missing quiz_responses columns used by API and track paid result delivery
alter table public.quiz_responses
  add column if not exists user_name text,
  add column if not exists user_email text,
  add column if not exists answers_json jsonb,
  add column if not exists riasec_json jsonb,
  add column if not exists result_status text default 'draft',
  add column if not exists paid_at timestamptz;

create index if not exists idx_quiz_responses_user_email on public.quiz_responses(user_email);

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'quiz_responses'
      and column_name in ('name', 'email', 'answers', 'ai_recommendation')
  ) then
    update public.quiz_responses
      set user_name = coalesce(user_name, name),
          user_email = coalesce(user_email, email),
          answers_json = coalesce(answers_json, answers),
          riasec_json = coalesce(riasec_json, ai_recommendation)
      where user_name is null
         or user_email is null
         or answers_json is null
         or riasec_json is null;
  end if;
end $$;

alter table public.orders
  add column if not exists result_email_status text,
  add column if not exists result_email_sent_at timestamptz,
  add column if not exists result_email_error text,
  add column if not exists result_email_id text;

create index if not exists idx_orders_result_email_status on public.orders(result_email_status);
