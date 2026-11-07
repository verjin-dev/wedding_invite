import { lazy, Suspense, useState } from 'react';
import { MotionConfig } from 'framer-motion';
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
import Scripture from './components/Scripture';
import ScrollProgress from './components/ScrollProgress';
import SlideGate from './components/SlideGate';

const Admin = lazy(() => import('./components/Admin'));

export default function App() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  if (window.location.pathname.startsWith('/admin')) return <Suspense fallback={<main className="block">Loading administration...</main>}><Admin /></Suspense>;
  return <MotionConfig reducedMotion="user"><div className="site">
    {!invitationOpened && <SlideGate onOpened={() => setInvitationOpened(true)} />}
    <ScrollProgress />
    <Navigation />
    <main>
      <Hero />
      <OurStory />
      <Scripture />
      <CoupleSection />
      <Families />
      <Gallery />
      <FormalInvite />
      <EventCard kind="ceremony" />
      <EventCard kind="reception" />
      <Countdown />
      <VenueDirections />
      <SaveTheDate />
    </main>
    <Footer />
  </div></MotionConfig>;
}
