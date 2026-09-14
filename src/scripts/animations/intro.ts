import { gsap, ScrollTrigger, reducedMotionQuery } from './core';

export function initIntro() {
  const root = document.documentElement;
  const intro = document.querySelector<HTMLElement>('[data-cinematic-intro]');
  const pending = root.classList.contains('mm-intro-pending');
  const reduced = window.matchMedia(reducedMotionQuery).matches;

  const finish = () => {
    if (window.__mmIntroFallback) window.clearTimeout(window.__mmIntroFallback);
    root.classList.remove('mm-intro-pending');
    if (intro) {
      intro.style.visibility = 'hidden';
      intro.style.pointerEvents = 'none';
    }
    try {
      sessionStorage.setItem('mm-intro-seen', 'true');
    } catch {
      // Storage can be unavailable in strict privacy modes; the intro still completes.
    }
    ScrollTrigger.refresh();
  };

  if (!intro || reduced) {
    finish();
    return () => undefined;
  }

  if (!pending) {
    const returnTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    returnTimeline
      .from('.hero-title > span > span', { yPercent: 105, duration: 0.75, stagger: 0.08 })
      .from('.hero-eyebrow, .hero-summary, .hero-actions', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.07 }, '-=0.48');
    return () => returnTimeline.kill();
  }

  const ring = intro.querySelector<SVGCircleElement>('.intro-ring circle');
  const logo = intro.querySelector<HTMLImageElement>('img');
  const label = intro.querySelector<HTMLElement>('p');
  const sweep = intro.querySelector<HTMLElement>('.intro-sweep');
  const sweepLight = intro.querySelector<HTMLElement>('.intro-sweep i');
  const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]');

  gsap.set(heroMedia, { clipPath: 'inset(0 0 0 100%)', scale: 1.025 });
  gsap.set('.hero-title > span > span', { yPercent: 112, rotate: 0.001 });
  gsap.set('.hero-eyebrow', { y: 14, autoAlpha: 0 });
  gsap.set('.hero-summary', { y: 20, autoAlpha: 0 });
  gsap.set('.hero-actions .arrow-link', { y: 16, autoAlpha: 0 });
  gsap.set('.hero-rail, .scroll-cue', { y: 14, autoAlpha: 0 });
  gsap.set('.site-header', { y: -18, autoAlpha: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: finish,
  });

  timeline
    .to(ring, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' })
    .fromTo(logo, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.7 }, 0.45)
    .to(label, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.88)
    .to(sweep, { autoAlpha: 1, duration: 0.08 }, 0.98)
    .to(sweepLight, { x: '260%', duration: 0.72, ease: 'power2.inOut' }, 0.98)
    .add('hero', 1.9)
    .to(logo, { autoAlpha: 0, scale: 0.9, y: -12, duration: 0.62, ease: 'power2.inOut' }, 'hero')
    .to(intro, { autoAlpha: 0, duration: 0.65, ease: 'power2.inOut' }, 'hero')
    .to(heroMedia, { clipPath: 'inset(0 0 0 0%)', scale: 1, duration: 1.05, ease: 'power3.inOut' }, 'hero')
    .to('.hero-eyebrow', { y: 0, autoAlpha: 1, duration: 0.52, ease: 'power3.out' }, 'hero+=0.2')
    .to('.hero-title > span > span', {
      yPercent: 0,
      rotate: 0,
      duration: 0.88,
      stagger: 0.13,
      ease: 'power4.out',
    }, 'hero+=0.3')
    .to('.hero-summary', { y: 0, autoAlpha: 1, duration: 0.62, ease: 'power3.out' }, 'hero+=0.68')
    .to('.hero-actions .arrow-link', {
      y: 0,
      autoAlpha: 1,
      duration: 0.58,
      stagger: 0.1,
      ease: 'power3.out',
    }, 'hero+=0.86')
    .to('.site-header', { y: 0, autoAlpha: 1, duration: 0.58, ease: 'power3.out' }, 'hero+=0.38')
    .to('.hero-rail, .scroll-cue', { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.08 }, 'hero+=1.02');

  if (window.innerWidth < 768) timeline.timeScale(1.18);

  return () => timeline.kill();
}
