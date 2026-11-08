import { gsap } from './core';
export function initScrollReveals() {
 const queries = gsap.matchMedia();
 queries.add('(prefers-reduced-motion: no-preference)', () => {
  // Core typography remains readable throughout native, reversible scrolling.
  document.querySelectorAll<HTMLElement>('[data-reveal], [data-statement]').forEach(element => {
   gsap.from(element, { y: 28, ease: 'none', scrollTrigger: { trigger: element, start: 'top 95%', end: 'top 65%', scrub: 1 } });
  });
  const image = document.querySelector('[data-story-media] img');
  if (image) gsap.from(image, { scale: 1.04, ease: 'none', scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: 1 } });
 });
 return () => queries.revert();
}
