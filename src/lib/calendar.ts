import { weddingConfig } from '../data/wedding';

const title = `Wedding \u2013 ${weddingConfig.couple.displayNames}`;
const location = `${weddingConfig.ceremony.venue}, ${weddingConfig.ceremony.location}`;
const start = new Date(`${weddingConfig.wedding.date}T${weddingConfig.wedding.ceremonyTime24}:00+05:30`);
const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const startStamp = stamp(start);

/** Creates a Google Calendar draft using only the confirmed start time. */
export function googleCalendarUrl() {
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: startStamp, details: weddingConfig.brand.tagline, location, ctz: weddingConfig.wedding.timezone });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const escapeText = (value: string) => value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** A valid iCalendar event containing the confirmed ceremony start and no guessed end time. */
export function downloadIcs() {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//VJ Wedding//Verjin and Jesmi//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', 'UID:vj-wedding-20270517@vjwedding', `DTSTAMP:${stamp(new Date())}`, `DTSTART:${startStamp}`,
    `SUMMARY:${escapeText(title)}`, `LOCATION:${escapeText(location)}`, `DESCRIPTION:${escapeText(weddingConfig.brand.tagline)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([`${lines.join('\r\n')}\r\n`], { type: 'text/calendar;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'verjin-and-jesmi.ics'; document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}
