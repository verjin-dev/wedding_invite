import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Countdown from './components/Countdown';
import CoupleSection from './components/CoupleSection';
import EventCard from './components/EventCard';
import Footer from './components/Footer';
import Families from './components/Families';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import OurStory from './components/OurStory';
import SaveTheDate from './components/SaveTheDate';
import VenueDirections from './components/VenueDirections';
import FormalInvite from './components/FormalInvite';
import RSVP from './components/RSVP';
import Scripture from './components/Scripture';
import Timeline from './components/Timeline';
import DoorGate from './components/DoorGate';
import ScrollProgress from './components/ScrollProgress';
import MusicToggle from './components/MusicToggle';
import Blessing from './components/Blessing';

const Admin = lazy(() => import('./components/Admin'));

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  // GSAP and Anime.js load after the doors open, so they never delay the first paint.
  useEffect(() => {
    if (!invitationOpened) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    void import('./lib/scrollEffects').then(effects => { if (!cancelled) cleanup = effects.initScrollEffects(); });
    return () => { cancelled = true; cleanup?.(); };
  }, [invitationOpened]);
  if (window.location.pathname.startsWith('/admin')) return <Suspense fallback={<main className="block">Loading administration...</main>}><Admin /></Suspense>;
  return <MotionConfig reducedMotion="user"><div className="site">
    <AnimatePresence>{!invitationOpened && <DoorGate key="gate" onOpened={() => setInvitationOpened(true)} />}</AnimatePresence>
    <ScrollProgress />
    <MusicToggle />
    <Navigation />
    <main>
      <Hero revealed={invitationOpened} />
      <OurStory />
      <Timeline />
      <Scripture />
      <CoupleSection />
      <Families />
      <Gallery />
      <FormalInvite />
      <SaveTheDate />
      <EventCard kind="ceremony" />
      <EventCard kind="reception" />
      <Countdown />
      <VenueDirections />
      <RSVP />
      <Blessing />
    </main>
    {/* Bringing the doors back replays the opening; the music keeps playing through it. */}
    <Footer onReplay={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setInvitationOpened(false); }} />
  </div></MotionConfig>;
}
