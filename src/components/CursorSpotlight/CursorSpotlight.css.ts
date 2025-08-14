import { style } from '@vanilla-extract/css';

// Root overlay that holds the lens and ring; desktop-only
export const root = style({
  display: 'none',
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 2147483646,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      display: 'block',
    },
    '(prefers-reduced-motion: reduce)': {
      display: 'none',
    },
  },
});

// The circular lens that applies a backdrop filter (magnifying vibe)
export const lens = style({
  position: 'absolute',
  width: 'var(--lens-size, 280px)',
  height: 'var(--lens-size, 280px)',
  left: 'var(--spotlight-x, -200px)',
  top: 'var(--spotlight-y, -200px)',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  // ensure compositing; tiny bg so backdrop-filter triggers reliably
  backgroundColor: 'rgba(255,255,255,0.002)',
  // vivid but tasteful
  backdropFilter: 'contrast(1.35) saturate(1.6) brightness(1.18)',
  WebkitBackdropFilter: 'contrast(1.35) saturate(1.6) brightness(1.18)',
  boxShadow: '0 0 40px rgba(0,0,0,0.14), 0 18px 44px rgba(0,0,0,0.20)',
  contain: 'paint',
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      // strong fallback: bright center and crisp dim edge for wow effect
      background:
        'radial-gradient(closest-side, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 40%, rgba(0,0,0,0.16) 62%, transparent 70%)',
    },
  },
  '@media': {
    // On dark mode, go brighter and add a soft glow
    '(prefers-color-scheme: dark)': {
      backdropFilter: 'contrast(1.25) saturate(1.5) brightness(1.55)',
      WebkitBackdropFilter: 'contrast(1.25) saturate(1.5) brightness(1.55)',
      boxShadow:
        '0 0 60px rgba(255,255,255,0.22), 0 22px 60px rgba(0,0,0,0.35)',
    },
    // On light mode, keep edge crisp; a slight drop shadow to pop
    '(prefers-color-scheme: light)': {
      backdropFilter: 'contrast(1.4) saturate(1.7) brightness(1.12)',
      WebkitBackdropFilter: 'contrast(1.4) saturate(1.7) brightness(1.12)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.16), 0 16px 48px rgba(0,0,0,0.22)',
    },
  },
});

// A sharp ring to sell the “glass” effect
export const ring = style({
  position: 'absolute',
  width: 'var(--lens-size, 280px)',
  height: 'var(--lens-size, 280px)',
  left: 'var(--spotlight-x, -200px)',
  top: 'var(--spotlight-y, -200px)',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  boxShadow:
    '0 0 0 2px rgba(255,255,255,0.9) inset, 0 0 0 3px rgba(255,255,255,0.15), 0 0 40px rgba(0,0,0,0.18)',
  '@media': {
    '(prefers-color-scheme: dark)': {
      boxShadow:
        '0 0 0 2px rgba(255,255,255,0.92) inset, 0 0 0 3px rgba(0,153,255,0.25), 0 0 60px rgba(0,153,255,0.35), 0 0 36px rgba(0,0,0,0.25)',
    },
    '(prefers-color-scheme: light)': {
      boxShadow:
        '0 0 0 2px rgba(0,0,0,0.28) inset, 0 0 0 3px rgba(0,153,255,0.14), 0 0 40px rgba(0,153,255,0.20), 0 8px 24px rgba(0,0,0,0.18)',
    },
  },
});
