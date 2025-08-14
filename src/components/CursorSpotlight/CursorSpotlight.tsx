import React, { useEffect, useRef } from 'react';
import { root, lens, ring } from './CursorSpotlight.css';

/**
 * CursorSpotlight renders a fixed full-screen overlay that follows the cursor
 * using CSS vars to position a radial gradient. It's desktop-only via media query.
 */
const CursorSpotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let latestX = -200;
    let latestY = -200;
    let ticking = false;

    const setVars = () => {
      ticking = false;
      el.style.setProperty('--spotlight-x', `${latestX}px`);
      el.style.setProperty('--spotlight-y', `${latestY}px`);
    };

    const onMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(setVars);
      }
    };

    // Only attach on desktop-like pointers
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove as any);
    };
  }, []);

  return (
    <div aria-hidden className={root} ref={ref}>
      <div className={lens} />
      <div className={ring} />
    </div>
  );
};

export default CursorSpotlight;
