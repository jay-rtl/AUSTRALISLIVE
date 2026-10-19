import { gsap } from './core';

export function initTeamMotion() {
  const root = document.querySelector<HTMLElement>('.our-team');
  if (!root) return;
  const media = gsap.matchMedia();
  // Visible HTML is the baseline. No opacity or visibility gates on core content.
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      root.querySelectorAll('[data-team-reveal]').forEach((section) => {
        gsap.from(section.children, { y: 16, duration: .75, stagger: .06, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 90%', once: true } });
      });
      root.querySelectorAll('[data-team-portrait]').forEach((portrait) => {
        gsap.from(portrait, { y: 20, duration: .9, ease: 'power2.out',
          scrollTrigger: { trigger: portrait, start: 'top 90%', once: true } });
      });
      root.querySelectorAll('[data-team-line]').forEach((line) => {
        gsap.from(line, { scaleX: .2, duration: .9, ease: 'power2.out',
          scrollTrigger: { trigger: line, start: 'top 90%', once: true } });
      });
    }, root);
    return () => context.revert();
  });
  media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      root.querySelectorAll('.team-portrait img').forEach((image) => {
        gsap.fromTo(image, { scale: 1.04, yPercent: -1 }, { scale: 1.04, yPercent: 1, ease: 'none',
          scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: .6 } });
      });
    }, root);
    return () => context.revert();
  });
  window.addEventListener('pagehide', () => media.revert(), { once: true });
}
