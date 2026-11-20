import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger, svg, utils } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll and tap flourishes layered over the page: GSAP drives what is tied to scrolling,
 * Anime.js draws the footer ornament and the sparkle on taps.
 * Only plain elements are targeted, never the ones Framer Motion already animates.
 * Returns a cleanup function. Does nothing for guests who prefer reduced motion.
 */
export function initScrollEffects(): () => void {
  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const once = (trigger: Element | string, start = 'top 85%') => ({ trigger, start, once: true });

    // The verse lights up word by word as it is scrolled through.
    gsap.fromTo('.verse-word', { opacity: .16, y: 10 }, {
      opacity: 1, y: 0, stagger: .2, ease: 'none',
      scrollTrigger: { trigger: '.scripture', start: 'top 72%', end: 'center 45%', scrub: .6 },
    });

    // Story paragraphs arrive in turn, then the star spins into the rule.
    gsap.from('.story-paragraphs p', { opacity: 0, y: 22, duration: .8, stagger: .14, ease: 'power2.out', scrollTrigger: once('.story-paragraphs', 'top 82%') });
    gsap.from('.story-rule span', { opacity: 0, scale: 0, rotation: -180, duration: 1.1, ease: 'back.out(2)', scrollTrigger: once('.story-rule', 'top 92%') });

    // Portraits and family photos are unveiled from the top, captions follow.
    gsap.utils.toArray<HTMLElement>('.profile-photo, .family-photo').forEach(photo => {
      gsap.fromTo(photo, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.out', scrollTrigger: once(photo) });
      const caption = photo.querySelector('figcaption');
      if (caption) gsap.from(caption, { opacity: 0, y: 24, duration: .8, delay: .7, ease: 'power2.out', scrollTrigger: once(photo) });
    });

    // The love-story line grows down the page as the chapters are read.
    gsap.fromTo('.timeline-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: .6 } });

    // Event facts slide in one after another.
    gsap.utils.toArray<HTMLElement>('.event-content').forEach(content => {
      gsap.from(content.querySelectorAll('.event-time, .event-details p'), { opacity: 0, x: -26, duration: .7, stagger: .13, ease: 'power2.out', scrollTrigger: once(content, 'top 78%') });
    });

    // Countdown units pop in.
    gsap.from('.countdown-band__units li', { opacity: 0, scale: .55, duration: .8, stagger: .1, ease: 'back.out(1.8)', scrollTrigger: once('.countdown-band__units', 'top 88%') });

    // Venue photos settle from a slight zoom while they cross the screen.
    gsap.utils.toArray<HTMLElement>('.venue-reference').forEach(card => {
      const photo = card.querySelector(':scope > img');
      if (photo) gsap.fromTo(photo, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Anime.js: the footer ornament draws itself when it comes into view.
    const flourish = document.querySelector('.footer-flourish');
    let observer: IntersectionObserver | undefined;
    if (flourish) {
      const strokes = svg.createDrawable('.footer-flourish path');
      utils.set(strokes, { draw: '0 0' });
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        animate(strokes, { draw: ['0 0', '0 1'], duration: 2200, delay: stagger(260), ease: 'inOutQuad' });
      }, { threshold: .6 });
      observer.observe(flourish);
    }

    // Anime.js: a small burst of gold sparks where a button or photo is pressed.
    const sparkle = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.pill, .tile, .gallery-filters button')) return;
      const burst = document.createElement('div');
      burst.className = 'tap-burst';
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      for (let i = 0; i < 10; i += 1) burst.appendChild(document.createElement('i'));
      document.body.appendChild(burst);
      animate(burst.children, {
        x: () => utils.random(-64, 64), y: () => utils.random(-72, 28),
        scale: [1, 0], opacity: [1, 0], duration: 750, delay: stagger(14), ease: 'outExpo',
        onComplete: () => burst.remove(),
      });
    };
    document.addEventListener('pointerdown', sparkle);

    return () => {
      observer?.disconnect();
      document.removeEventListener('pointerdown', sparkle);
      document.querySelectorAll('.tap-burst').forEach(node => node.remove());
    };
  });

  // Lazy images change the page height as they load; keep the trigger positions honest.
  let pending = 0;
  const refresh = () => { window.clearTimeout(pending); pending = window.setTimeout(() => ScrollTrigger.refresh(), 200); };
  document.addEventListener('load', refresh, true);

  return () => {
    window.clearTimeout(pending);
    document.removeEventListener('load', refresh, true);
    media.revert();
  };
}
