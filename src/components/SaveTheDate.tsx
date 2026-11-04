import { CalendarPlus, Download } from 'lucide-react';
import { wedding } from '../data/wedding';
import { Card } from './Reveal';

const events = [
  { ...wedding.ceremony, start: '20270517T103000', end: '20270517T123000' },
  { ...wedding.reception, start: '20270517T170000', end: '20270517T210000' },
] as const;

const title = `${wedding.displayNames} Wedding`;
const place = (e: (typeof events)[number]) => `${e.venue}, ${e.location}`;
const details = events.map((e) => `${e.title}: ${e.time}, ${place(e)}`).join('\n');

const googleUrl = () => {
  const e = events[0];
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${e.start}/${e.end}`,
    ctz: 'Asia/Kolkata',
    details,
    location: place(e),
  });
  return `https://calendar.google.com/calendar/render?${q}`;
};

const icsEscape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&');

const downloadIcs = () => {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'CALSCALE:GREGORIAN',
    ...events.flatMap((e, i) => [
      'BEGIN:VEVENT',
      `UID:wedding-2027-05-17-${i}@verjinwedsjesmi`,
      'DTSTAMP:20260101T000000Z',
      `DTSTART;TZID=Asia/Kolkata:${e.start}`,
      `DTEND;TZID=Asia/Kolkata:${e.end}`,
      `SUMMARY:${icsEscape(`${title} - ${e.title}`)}`,
      `LOCATION:${icsEscape(place(e))}`,
      `DESCRIPTION:${icsEscape(details)}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'save-the-date.ics';
  a.click();
  URL.revokeObjectURL(url);
};

export default function SaveTheDate() {
  return (
    <section className="block" id="save" aria-labelledby="save-title">
      <Card className="save-card">
        <p className="eyebrow">Mark your calendar</p>
        <h2 id="save-title" className="block-title">Save the date</h2>
        <p className="save-date">{wedding.dateLabel}</p>
        <p className="body">Add the ceremony and reception to your calendar so you don’t miss a moment.</p>
        <div className="save-actions">
          <a className="pill solid" href={googleUrl()} target="_blank" rel="noopener noreferrer">
            <CalendarPlus size={16} aria-hidden="true" /> Google Calendar
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" className="pill" onClick={downloadIcs}>
            <Download size={16} aria-hidden="true" /> Apple / Outlook (.ics)
          </button>
        </div>
      </Card>
    </section>
  );
}
