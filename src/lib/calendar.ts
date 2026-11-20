import { ceremonyStartIso, receptionStartIso, weddingConfig } from '../data/wedding';

export type CalendarEvent = 'ceremony' | 'reception';

const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** The confirmed start of each event. Neither has a confirmed end, so none is guessed. */
const events = {
  ceremony: { uid: 'vj-wedding-20270517', start: ceremonyStartIso, title: `Wedding \u2013 ${weddingConfig.couple.displayNames}`, location: `${weddingConfig.ceremony.venue}, ${weddingConfig.ceremony.location}` },
  reception: receptionStartIso ? { uid: 'vj-reception-20270517', start: receptionStartIso, title: `Wedding reception \u2013 ${weddingConfig.couple.displayNames}`, location: `${weddingConfig.reception.venue}, ${weddingConfig.reception.location}` } : null,
};

/** Creates a Google Calendar draft. Google ignores `dates` without an end, so the start is repeated rather than guessing one. */
export function googleCalendarUrl(kind: CalendarEvent = 'ceremony') {
  const event = events[kind];
  if (!event) return undefined;
  const start = stamp(new Date(event.start));
  const params = new URLSearchParams({ action: 'TEMPLATE', text: event.title, dates: `${start}/${start}`, details: weddingConfig.brand.tagline, location: event.location, ctz: weddingConfig.wedding.timezone });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeText = (value: string) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** A valid iCalendar file holding the ceremony and, while its time is set, the reception; confirmed starts only. */
export function downloadIcs() {
  const now = stamp(new Date());
  const vevents = [events.ceremony, events.reception].flatMap(event => event ? [
    'BEGIN:VEVENT', `UID:${event.uid}@vjwedding`, `DTSTAMP:${now}`, `DTSTART:${stamp(new Date(event.start))}`,
    `SUMMARY:${escapeText(event.title)}`, `LOCATION:${escapeText(event.location)}`, `DESCRIPTION:${escapeText(weddingConfig.brand.tagline)}`,
    'END:VEVENT',
  ] : []);
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//VJ Wedding//Verjin and Jesmi//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', ...vevents, 'END:VCALENDAR'];
  const url = URL.createObjectURL(new Blob([`${lines.join('\r\n')}\r\n`], { type: 'text/calendar;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'verjin-and-jesmi.ics'; document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}
