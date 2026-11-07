import { CalendarPlus, Download } from 'lucide-react';
import { weddingConfig } from '../data/wedding';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import { Card } from './Reveal';

export default function SaveTheDate() {
  return <section className="block" id="save" aria-labelledby="save-title"><Card className="save-card">
    <p className="eyebrow">Mark your calendar</p><h2 id="save-title" className="block-title">Save the date</h2>
    <p className="save-date">{weddingConfig.wedding.dateLabel}</p><p className="body">Add the wedding to your calendar. Reception timing will be shared once confirmed.</p>
    <div className="save-actions"><a className="pill solid" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><CalendarPlus size={16}/> Google Calendar</a><button className="pill" type="button" onClick={downloadIcs}><Download size={16}/> Apple / Outlook (.ics)</button></div>
  </Card></section>;
}
