import { MotionConfig } from 'framer-motion';
import { useState } from 'react';
import Countdown from './components/Countdown';
import CoupleSection from './components/CoupleSection';
import EventCard from './components/EventCard';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import InvitationCard from './components/InvitationCard';
import Navigation from './components/Navigation';
import OurStory from './components/OurStory';
import Reveal from './components/Reveal';
import RSVP from './components/RSVP';
import VenueDirections from './components/VenueDirections';
import WaxGate from './components/WaxGate';

export default function App() {
  const [opened, setOpened] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <WaxGate onOpened={() => setOpened(true)} />
      <div className="site" inert={!opened}>
        <Navigation />
        <main>
          <Hero ready={opened} />
          <InvitationCard />
          <CoupleSection />
          <Countdown />
          <section className="page events" id="events" aria-labelledby="ev-title">
            <Reveal><p className="note">save the date</p><h2 id="ev-title" className="hand-title sm"><span>Your tickets</span></h2></Reveal>
            <div className="event-grid"><EventCard kind="ceremony" index={0} /><EventCard kind="reception" index={1} /></div>
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
