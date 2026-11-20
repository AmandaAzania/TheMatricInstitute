-- Run in Supabase SQL Editor. Auth accounts are managed by Supabase Auth.
create table if not exists public.learner_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null check (char_length(display_name) between 1 and 60),
 tutor_name text not null check (char_length(tutor_name) between 1 and 40),
 goal text not null,
 subjects text[] not null default '{}',
 updated_at timestamptz not null default now()
);
create table if not exists public.study_attempts (
 id bigint generated always as identity primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 subject text not null,
 score integer not null check (score >= 0),
 total integer not null check (total > 0 and score <= total),
 created_at timestamptz not null default now()
);
alter table public.learner_profiles enable row level security;
alter table public.study_attempts enable row level security;
create policy "Read own profile" on public.learner_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own profile" on public.learner_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own profile" on public.learner_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Read own attempts" on public.study_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own attempts" on public.study_attempts for insert to authenticated with check ((select auth.uid()) = user_id);
-- Never add an anonymous read policy for learner profiles or attempts.
