import { gsap, ScrollTrigger, reducedMotionQuery } from './core';

export function initIntro() {
  const root = document.documentElement;
  const intro = document.querySelector<HTMLElement>('[data-cinematic-intro]');
  const logo = intro?.querySelector<HTMLImageElement>('img');
  const motion = window.matchMedia(reducedMotionQuery);
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  const targets = '.hero-title > span > span, .hero-eyebrow, .hero-summary, .hero-actions .arrow-link, .hero-rail, .scroll-cue, .site-header, [data-hero-media]';
  let timeline: gsap.core.Timeline | undefined;
  let disposed = false;
  const finish = () => {
    timeline?.kill();
    if (window.__alIntroFallback) window.clearTimeout(window.__alIntroFallback);
    root.classList.remove('al-intro-pending');
    if (intro) gsap.set(intro, { autoAlpha: 0, pointerEvents: 'none' });
    gsap.set(targets, { clearProps: 'all' });
    try { sessionStorage.setItem('al-intro-seen', 'true'); } catch { /* Storage is optional. */ }
    ScrollTrigger.refresh();
  };
  const onMotion = () => { if (motion.matches) finish(); };
  motion.addEventListener('change', onMotion);
  const cleanup = () => {
    disposed = true;
    finish();
    motion.removeEventListener('change', onMotion);
  };
  if (!intro || !logo || motion.matches || !root.classList.contains('al-intro-pending')) {
    finish();
    return cleanup;
  }
  // Decode the real asset before starting its recognition interval.
  logo.decode().then(() => {
    if (disposed || motion.matches || !root.classList.contains('al-intro-pending')) return;
    const distance = mobile ? 10 : 20;
    gsap.set('[data-hero-media]', { clipPath: 'inset(0 0 0 100%)' });
    gsap.set('.hero-title > span > span', { yPercent: 105 });
    gsap.set('.hero-eyebrow, .hero-summary, .hero-actions .arrow-link, .hero-rail, .scroll-cue', { y: distance, autoAlpha: 0 });
    gsap.set('.site-header', { autoAlpha: 0 });
    timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: finish });
    timeline
      .fromTo('.intro-accent', { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 0.7, duration: 0.5 }, 0.12)
      .fromTo(logo, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.7 }, 0.32)
      .to('.intro-accent', { autoAlpha: 0, duration: 0.4 }, 1.65)
      .add('hero', 2.0)
      .to(intro, { autoAlpha: 0, duration: 0.8 }, 'hero')
      .to('[data-hero-media]', { clipPath: 'inset(0 0 0 0%)', duration: 0.95 }, 'hero')
      .to('.hero-title > span > span', { yPercent: 0, duration: 0.8, stagger: 0.1 }, 'hero+=0.1')
      .to('.hero-eyebrow, .hero-summary, .hero-actions .arrow-link', { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 }, 'hero+=0.25')
      .to('.site-header', { autoAlpha: 1, duration: 0.5 }, 'hero+=0.35')
      .to('.hero-rail, .scroll-cue', { y: 0, autoAlpha: 1, duration: 0.4 }, 'hero+=0.8');
    if (mobile) timeline.timeScale(1.2);
  }).catch(finish);
  return cleanup;
}
