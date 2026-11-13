import { CalendarPlus, Download } from 'lucide-react';
import { weddingConfig } from '../data/wedding';
import { downloadIcs, googleCalendarUrl } from '../lib/calendar';
import { Card, SplitTitle } from './Reveal';

export default function SaveTheDate() {
  return <section className="block" id="save" aria-labelledby="save-title"><Card className="save-card">
    <p className="eyebrow">Mark your calendar</p><SplitTitle id="save-title" text="Save the date"/>
    <p className="save-date">{weddingConfig.wedding.dateLabel}</p><p className="body">Add the wedding to your calendar. The reception follows at {weddingConfig.reception.time} the same day.</p>
    <div className="save-actions"><a className="pill solid" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer"><CalendarPlus size={16}/> Google Calendar</a><button className="pill" type="button" onClick={downloadIcs}><Download size={16}/> Apple / Outlook (.ics)</button></div>
  </Card></section>;
}
