import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export function splitWords(element: HTMLElement) {
  if (element.dataset.split === 'true') return [...element.querySelectorAll<HTMLElement>('.word')];

  const words = element.textContent?.trim().split(/\s+/) ?? [];
  element.textContent = '';
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    element.append(span);
    if (index < words.length - 1) element.append(' ');
  });
  element.dataset.split = 'true';
  return [...element.querySelectorAll<HTMLElement>('.word')];
}
