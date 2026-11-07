create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 1 and 120),
  phone text check (phone is null or char_length(phone) <= 32),
  attendance text not null check (attendance in ('attending', 'declined')),
  guest_count integer not null check (guest_count between 1 and 10),
  message text check (message is null or char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;
grant insert on public.rsvps to anon, authenticated;
grant select, update on public.rsvps to authenticated;
drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
create policy "Anyone can submit an RSVP" on public.rsvps
  for insert to anon, authenticated with check (true);
drop policy if exists "Admins can view RSVP responses" on public.rsvps;
create policy "Admins can view RSVP responses" on public.rsvps
  for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins can manage RSVP responses" on public.rsvps;
create policy "Admins can manage RSVP responses" on public.rsvps
  for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
