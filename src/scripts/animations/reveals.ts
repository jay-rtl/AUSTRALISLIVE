import { gsap, reducedMotionQuery, splitWords } from './core';

export function initScrollReveals() {
  const mediaQueries = gsap.matchMedia();

  mediaQueries.add(`(prefers-reduced-motion: no-preference)`, () => {
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
        const direction = index % 3 === 1 ? -1 : 1;
        gsap.from(element, {
          autoAlpha: 0,
          y: 44,
          x: window.innerWidth >= 768 ? 12 * direction : 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      const statement = document.querySelector<HTMLElement>('[data-statement]');
      if (statement) {
        const words = splitWords(statement);
        gsap.to(words, {
          color: (index) => index === words.length - 1 ? '#e6c76a' : '#f5f5f5',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: statement,
            start: 'top 82%',
            end: 'bottom 48%',
            scrub: 0.45,
          },
        });
      }

      document.querySelectorAll<HTMLElement>('[data-project]').forEach((project, index) => {
        const media = project.querySelector<HTMLElement>('.home-project__media');
        if (!media) return;
        gsap.fromTo(media,
          { clipPath: index % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.05,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: media, start: 'top 86%', once: true },
          },
        );
      });

      const storyImage = document.querySelector<HTMLImageElement>('[data-story-media] img');
      if (storyImage) {
        gsap.to(storyImage, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: storyImage,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }

      const aboutMedia = document.querySelector<HTMLElement>('[data-about-media]');
      if (aboutMedia) {
        gsap.fromTo(aboutMedia,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.15,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: aboutMedia, start: 'top 82%', once: true },
          },
        );
      }
    });
    return () => context.revert();
  });

  mediaQueries.add(reducedMotionQuery, () => {
    gsap.set('[data-reveal], [data-project], [data-story-media], [data-about-media]', {
      clearProps: 'all',
      autoAlpha: 1,
    });
  });

  return () => mediaQueries.revert();
}
