-- The dashboard can now remove a reply. RLS denies anything no policy allows,
-- so without this a delete request succeeds and removes no rows.
grant delete on public.rsvps to authenticated;
drop policy if exists "Admins can remove RSVP responses" on public.rsvps;
create policy "Admins can remove RSVP responses" on public.rsvps
  for delete to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
