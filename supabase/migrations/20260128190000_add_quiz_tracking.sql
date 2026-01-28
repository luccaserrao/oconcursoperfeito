-- Add tracking for quiz starts and sources
create table if not exists public.quiz_starts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  quiz_session_id text,
  quiz_version text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  landing_path text
);

create index if not exists idx_quiz_starts_created_at on public.quiz_starts(created_at desc);
create index if not exists idx_quiz_starts_source on public.quiz_starts(source);

alter table public.quiz_starts enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'quiz_starts'
      and policyname = 'Anyone can insert quiz starts'
  ) then
    create policy "Anyone can insert quiz starts"
      on public.quiz_starts
      for insert
      to anon
      with check (true);
  end if;
end $$;

alter table public.quiz_responses
  add column if not exists quiz_session_id text,
  add column if not exists source text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists referrer text,
  add column if not exists landing_path text;
