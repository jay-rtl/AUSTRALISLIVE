import { ScrollTrigger } from './core';
import { initHeroMotion } from './hero';
import { initIntro } from './intro';
import { initScrollReveals } from './reveals';
import { initServiceInteraction } from './services';

export function initHomeExperience() {
  const cleanups = [
    initIntro(),
    initHeroMotion(),
    initScrollReveals(),
    initServiceInteraction(),
  ];

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh, { once: true });

  const cleanup = () => {
    cleanups.forEach((dispose) => dispose());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    window.removeEventListener('load', refresh);
  };
  window.addEventListener('pagehide', cleanup, { once: true });
}
