# Animation modules

Homepage motion is split by responsibility:

- `intro.ts`: first-session cinematic entrance and replay behavior
- `hero.ts`: scroll transition and fine-pointer parallax
- `reveals.ts`: editorial reveals, statement progression, and image masks
- `services.ts`: restrained desktop service interaction
- `core.ts`: GSAP registration and shared helpers
- `home.ts`: lifecycle orchestration and cleanup

Every module preserves visible HTML without JavaScript and respects `prefers-reduced-motion`.
