-- Add journey tracking events for full funnel analytics
create table if not exists public.quiz_journey_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  quiz_session_id text not null,
  step text not null,
  page_path text,
  quiz_version text,
  home_variant text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  landing_path text,
  quiz_response_id uuid,
  order_id uuid,
  metadata jsonb
);

create unique index if not exists idx_quiz_journey_events_session_step
  on public.quiz_journey_events(quiz_session_id, step);
create index if not exists idx_quiz_journey_events_created_at
  on public.quiz_journey_events(created_at desc);
create index if not exists idx_quiz_journey_events_step
  on public.quiz_journey_events(step);
create index if not exists idx_quiz_journey_events_session
  on public.quiz_journey_events(quiz_session_id);

alter table public.quiz_journey_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'quiz_journey_events'
      and policyname = 'Anyone can insert journey events'
  ) then
    create policy "Anyone can insert journey events"
      on public.quiz_journey_events
      for insert
      to anon
      with check (true);
  end if;
end $$;
