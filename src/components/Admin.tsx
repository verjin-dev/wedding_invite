import { useState, type FormEvent } from 'react';
import { Check, Download, Lock, LogOut, MessageSquareQuote, Phone, RefreshCw, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

type RSVPRow = { id: string; full_name: string; phone: string | null; attendance: string; guest_count: number; message: string | null; created_at: string };
type Filter = 'all' | 'attending' | 'declined';

const filters: [Filter, string][] = [['all', 'All'], ['attending', 'Attending'], ['declined', 'Declined']];

export default function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [message, setMessage] = useState('');
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  async function load() {
    if (!supabase) return false;
    const { data, error } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
    if (error) { setMessage(error.message); return false; }
    setRows(data ?? []);
    return true;
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!supabase) { setMessage('Supabase environment variables are missing.'); return; }
    setBusy(true); setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setBusy(false); setMessage(error.message); return; }
    const loaded = await load();
    setBusy(false);
    if (loaded) { setPassword(''); setReady(true); }
  }

  async function refresh() { setBusy(true); await load(); setBusy(false); }

  async function signOut() {
    await supabase?.auth.signOut();
    setRows([]); setReady(false); setEmail(''); setPassword(''); setMessage('');
  }

  const csv = () => {
    const content = ['Name,Phone,Attendance,Guests,Message,Submitted', ...rows.map(r => [r.full_name, r.phone ?? '', r.attendance, r.guest_count, r.message ?? '', r.created_at].map(x => '"' + String(x).replaceAll('"', '""') + '"').join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'wedding-rsvps.csv'; link.click();
    URL.revokeObjectURL(url);
  };

  if (!ready) return <main className="admin-gate">
    <section className="admin-signin">
      <a className="admin-back" href="/">← VJ Wedding</a>
      <span className="admin-lock" aria-hidden="true"><Lock size={18} /></span>
      <p className="eyebrow">Private administration</p>
      <h1 className="admin-signin-title">Admin sign in</h1>
      <form className="admin-form" onSubmit={login}>
        <label>Email<input type="email" value={email} autoComplete="username" onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} autoComplete="current-password" onChange={e => setPassword(e.target.value)} required /></label>
        <button className="pill solid admin-submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <p className="admin-error" role="status" aria-live="polite">{message}</p>
    </section>
  </main>;

  const attending = rows.filter(r => r.attendance === 'attending');
  const declined = rows.filter(r => r.attendance === 'declined');
  const guests = attending.reduce((n, r) => n + r.guest_count, 0);
  const notes = rows.filter(r => r.message).length;
  const shown = filter === 'all' ? rows : rows.filter(r => r.attendance === filter);
  const stats: [string, number][] = [['Responses', rows.length], ['Attending guests', guests], ['Declined', declined.length], ['Messages', notes]];

  return <main className="admin">
    <header className="admin-head">
      <div>
        <p className="eyebrow">VJ Wedding</p>
        <h1 className="admin-title">RSVP dashboard</h1>
      </div>
      <div className="admin-actions">
        <button className="pill" onClick={refresh} disabled={busy}><RefreshCw size={15} /> {busy ? 'Refreshing…' : 'Refresh'}</button>
        <button className="pill" onClick={csv} disabled={!rows.length}><Download size={15} /> Export CSV</button>
        <button className="pill" onClick={signOut}><LogOut size={15} /> Sign out</button>
      </div>
    </header>

    <div className="admin-stats">
      {stats.map(([label, value]) => <div className="admin-stat" key={label}>
        <strong>{value}</strong><span>{label}</span>
      </div>)}
    </div>

    <div className="admin-filters">
      {filters.map(([key, label]) => <button key={key} type="button" className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>
        {label} <i>{key === 'all' ? rows.length : key === 'attending' ? attending.length : declined.length}</i>
      </button>)}
    </div>

    {message && <p className="admin-error" role="status">{message}</p>}

    {shown.length === 0
      ? <p className="admin-empty">{rows.length === 0 ? 'No responses yet. They will appear here as guests reply.' : 'No responses match this filter.'}</p>
      : <div className="admin-table">{shown.map(r => <article className="admin-row" key={r.id}>
        <div className="admin-row-head">
          <h2>{r.full_name}</h2>
          <span className={`admin-badge ${r.attendance}`}>{r.attendance === 'attending' ? <Check size={13} /> : <X size={13} />}{r.attendance === 'attending' ? 'Attending' : 'Declined'}</span>
        </div>
        <div className="admin-meta">
          <span><Users size={14} /> {r.guest_count} {r.guest_count === 1 ? 'guest' : 'guests'}</span>
          {r.phone && <a href={`tel:${r.phone}`}><Phone size={14} /> {r.phone}</a>}
          <time dateTime={r.created_at}>{new Date(r.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </div>
        {r.message && <blockquote className="admin-note"><MessageSquareQuote size={15} aria-hidden="true" />{r.message}</blockquote>}
      </article>)}</div>}
  </main>;
}
