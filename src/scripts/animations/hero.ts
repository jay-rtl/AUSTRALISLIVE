import { gsap, reducedMotionQuery } from './core';

export function initHeroMotion() {
  const hero = document.querySelector<HTMLElement>('.cinematic-hero');
  const media = document.querySelector<HTMLElement>('[data-hero-media]');
  const image = media?.querySelector<HTMLImageElement>('img');
  if (!hero || !media || !image) return () => undefined;

  const mediaQueries = gsap.matchMedia();

  mediaQueries.add(`(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)`, () => {
    const moveX = gsap.quickTo(image, 'x', { duration: 0.75, ease: 'power3.out' });
    const moveY = gsap.quickTo(image, 'y', { duration: 0.75, ease: 'power3.out' });

    const handlePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      moveX(((event.clientX - rect.left) / rect.width - 0.5) * 12);
      moveY(((event.clientY - rect.top) / rect.height - 0.5) * 8);
    };
    const resetPointer = () => {
      moveX(0);
      moveY(0);
    };

    hero.addEventListener('pointermove', handlePointer, { passive: true });
    hero.addEventListener('pointerleave', resetPointer);
    return () => {
      hero.removeEventListener('pointermove', handlePointer);
      hero.removeEventListener('pointerleave', resetPointer);
    };
  });

  mediaQueries.add(`(min-width: 64rem) and (prefers-reduced-motion: no-preference)`, () => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
    timeline
      .to(image, { scale: 1.055, yPercent: 3, ease: 'none' }, 0)
      .to('.cinematic-hero__copy', { yPercent: 10, autoAlpha: 0.35, ease: 'none' }, 0)
      .to('.scroll-cue', { autoAlpha: 0, ease: 'none' }, 0);
    return () => timeline.kill();
  });

  mediaQueries.add(reducedMotionQuery, () => {
    gsap.set([media, image, '.cinematic-hero__copy', '.scroll-cue'], { clearProps: 'all' });
  });

  return () => mediaQueries.revert();
}
