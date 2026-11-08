import { gsap } from './core';
export function initHeroMotion() {
 const hero = document.querySelector('.cinematic-hero');
 const media = hero?.querySelector('[data-hero-media]');
 if (!hero || !media) return () => undefined;
 const queries = gsap.matchMedia();
 queries.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
  gsap.to(media, { y: 24, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
 });
 return () => queries.revert();
}
