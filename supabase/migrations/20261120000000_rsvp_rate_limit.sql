-- Server-side protection for the public RSVP form.
-- Each insert is checked before it lands: at most 5 replies per visitor in 10 minutes,
-- the same name cannot be submitted twice within 10 minutes, and the whole form takes
-- at most 60 replies in 10 minutes. Visitors are told apart by a salted hash of their
-- IP address, kept in a private table no API role can read; hashes older than a day are discarded.

create table if not exists public.rsvp_rate (
  visitor text not null,
  created_at timestamptz not null default now()
);
create index if not exists rsvp_rate_visitor_created on public.rsvp_rate (visitor, created_at);
alter table public.rsvp_rate enable row level security;
revoke all on public.rsvp_rate from anon, authenticated;

create or replace function public.rsvp_guard() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare
  headers json := coalesce(nullif(current_setting('request.headers', true), ''), '{}')::json;
  ip text := coalesce(nullif(trim(split_part(headers ->> 'x-forwarded-for', ',', 1)), ''), headers ->> 'x-real-ip', 'unknown');
  v_visitor text := encode(digest(ip || ':vj-wedding-rsvp', 'sha256'), 'hex');
begin
  new.full_name := trim(regexp_replace(new.full_name, '\s+', ' ', 'g'));
  new.phone := nullif(trim(new.phone), '');
  new.message := nullif(trim(new.message), '');
  if new.phone is not null and new.phone !~ '^[0-9+()\- ]{6,32}$' then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;

  delete from public.rsvp_rate where created_at < now() - interval '1 day';
  if (select count(*) from public.rsvp_rate r where r.visitor = v_visitor and r.created_at > now() - interval '10 minutes') >= 5
    or exists (select 1 from public.rsvps s where lower(s.full_name) = lower(new.full_name) and s.created_at > now() - interval '10 minutes')
    or (select count(*) from public.rsvps s where s.created_at > now() - interval '10 minutes') >= 60 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  insert into public.rsvp_rate (visitor) values (v_visitor);
  return new;
end $$;

revoke all on function public.rsvp_guard() from public, anon, authenticated;

drop trigger if exists rsvp_guard on public.rsvps;
create trigger rsvp_guard before insert on public.rsvps
  for each row execute function public.rsvp_guard();
