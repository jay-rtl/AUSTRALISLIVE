import { gsap, ScrollTrigger } from './core';

export function initEditorialMotion() {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('.show-feature__art, .service-list li').forEach(element => {
      gsap.from(element, { y: 24, ease: 'none', scrollTrigger: {
        trigger: element, start: 'top 98%', end: 'top 70%', scrub: 1,
      } });
    });
  });
  const refresh = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
  window.addEventListener('pagehide', () => {
    media.revert();
    window.removeEventListener('load', refresh);
  }, { once: true });
}
