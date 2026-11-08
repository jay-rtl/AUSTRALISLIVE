import { gsap, ScrollTrigger } from './core';

export function initEditorialMotion() {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('.service-list li, .show-feature__content').forEach(element => {
      gsap.from(element, { y: 24, ease: 'none', scrollTrigger: {
        trigger: element, start: 'top 98%', end: 'top 70%', scrub: 1,
      } });
    });
    document.querySelectorAll<HTMLElement>('.show-feature__art').forEach(element => {
      gsap.fromTo(element, { y: 28, clipPath: 'inset(0 0 8% 0)' }, {
        y: 0, clipPath: 'inset(0 0 0% 0)', ease: 'none', scrollTrigger: {
          trigger: element, start: 'top 98%', end: 'top 68%', scrub: 1,
        },
      });
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
