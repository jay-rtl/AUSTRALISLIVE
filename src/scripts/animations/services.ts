import { gsap, reducedMotionQuery } from './core';

export function initServiceInteraction() {
  const preview = document.querySelector<HTMLElement>('[data-service-preview]');
  const image = preview?.querySelector<HTMLImageElement>('img');
  const rows = [...document.querySelectorAll<HTMLElement>('[data-service-row]')];
  if (!preview || !image || rows.length === 0) return () => undefined;

  const mediaQueries = gsap.matchMedia();
  mediaQueries.add(`(min-width: 48rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)`, () => {
    const enter = (event: Event) => {
      const row = event.currentTarget as HTMLElement;
      const index = Number(row.dataset.index ?? 0);
      gsap.to(image, {
        yPercent: (index - 1.5) * 1.4,
        scale: 1.018,
        filter: `brightness(${1 + index * 0.025})`,
        duration: 0.55,
        ease: 'power3.out',
      });
    };
    const leave = () => gsap.to(image, { yPercent: 0, scale: 1, filter: 'brightness(1)', duration: 0.55, ease: 'power3.out' });
    rows.forEach((row) => {
      row.addEventListener('pointerenter', enter);
      row.addEventListener('focus', enter);
      row.addEventListener('pointerleave', leave);
      row.addEventListener('blur', leave);
    });
    return () => rows.forEach((row) => {
      row.removeEventListener('pointerenter', enter);
      row.removeEventListener('focus', enter);
      row.removeEventListener('pointerleave', leave);
      row.removeEventListener('blur', leave);
    });
  });

  mediaQueries.add(reducedMotionQuery, () => gsap.set(image, { clearProps: 'all' }));
  return () => mediaQueries.revert();
}
