import { MotionConfig } from 'framer-motion';
import { useState } from 'react';
import Countdown from './components/Countdown';
import CoupleSection from './components/CoupleSection';
import DawnGate from './components/DawnGate';
import EventCard from './components/EventCard';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import InvitationCard from './components/InvitationCard';
import Navigation from './components/Navigation';
import Sky from './components/Sky';
import OurStory from './components/OurStory';
import Reveal from './components/Reveal';
import RSVP from './components/RSVP';
import VenueDirections from './components/VenueDirections';

export default function App() {
  const [opened, setOpened] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <Sky />
      <DawnGate onOpened={() => setOpened(true)} />
      <div className="site" inert={!opened}>
        <Navigation />
        <main>
          <Hero ready={opened} />
          <InvitationCard />
          <CoupleSection />
          <Countdown />
          <section className="section events" id="events" aria-labelledby="ev-title">
            <Reveal><p className="label">04 - Save the date</p><h2 id="ev-title" className="display"><span>The celebration</span></h2></Reveal>
            <div className="event-grid"><EventCard kind="ceremony" /><EventCard kind="reception" /></div>
          </section>
          <OurStory />
          <Gallery />
          <RSVP />
          <VenueDirections />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
