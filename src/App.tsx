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
import SaveTheDate from './components/SaveTheDate';
import SlideGate from './components/SlideGate';
import VenueDirections from './components/VenueDirections';

export default function App() {
  const [opened, setOpened] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <SlideGate onOpened={() => setOpened(true)} />
      <div className="site" inert={!opened}>
        <Navigation />
        <main>
          <Hero ready={opened} />
          <section className="bento" id="day" aria-label="Wedding details">
            <InvitationCard />
            <Countdown />
            <EventCard kind="ceremony" />
            <EventCard kind="reception" />
            <CoupleSection />
            <OurStory />
          </section>
          <Gallery />
          <SaveTheDate />
          <VenueDirections />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
