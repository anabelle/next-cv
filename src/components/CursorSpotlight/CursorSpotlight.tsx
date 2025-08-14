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

    // Motion preferences
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduceMotion) {
      // Ensure hidden and do not attach listeners
      el.style.setProperty('--lens-size', '0px');
      return;
    }

    // State
    let raf = 0;
    let latestX = -200;
    let latestY = -200;
    let displayX = -200;
    let displayY = -200;
    let lastTime = performance.now();
    let lastMoveTime = lastTime;
    let prevLatestX = latestX;
    let prevLatestY = latestY;
    // Size dynamics
    const getRootFontSize = (): number => {
      try {
        const v = getComputedStyle(document.documentElement).fontSize;
        const n = parseFloat(v || '16');
        return Number.isFinite(n) && n > 0 ? n : 16;
      } catch {
        return 16;
      }
    };
    const computeMinSize = () => 10 * getRootFontSize(); // 10em minimum
    const computeMaxSize = () =>
      Math.max(
        480,
        Math.min(4096, Math.hypot(window.innerWidth, window.innerHeight) * 1.1),
      );
    let minSize = computeMinSize();
    let maxSize = computeMaxSize();
    const BASE_SIZE = minSize; // start at min
    let currentSize = BASE_SIZE;
    // Speeds / velocity mapping
    const SPEED_SLOW = 10; // px/s or less → grow trend (more sensitive)
    const SPEED_FAST = 380; // px/s or more → shrink trend (even earlier)
    const SPEED_SMOOTH = 0.3; // 0..1 EMA smoothing (more responsive)
    // Position smoothing toward latest
    const POS_SMOOTH = 0.18;
    // Velocity (px/sec) integration
    const VEL_TAU = 0.12; // seconds, faster response of velocity to target
    const V_GROW_MAX = 90; // px/s maximum gentle growth
    const V_SHRINK_MAX = 2000; // px/s maximum shrink when moving fast
    // Optional tiny dwell to avoid instant growth when just stopped
    const DWELL_MS = 400;

    const onResize = () => {
      maxSize = computeMaxSize();
      minSize = computeMinSize();
    };
    window.addEventListener('resize', onResize);

    // Ensure vars are initialized
    el.style.setProperty('--spotlight-x', `${displayX}px`);
    el.style.setProperty('--spotlight-y', `${displayY}px`);
    el.style.setProperty('--lens-size', `${BASE_SIZE}px`);

    const onMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      lastMoveTime = performance.now();
    };

    // Only attach on desktop-like pointers
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    let smoothedSpeed = 0;
    let vel = 0; // current growth velocity in px/s
    const tick = () => {
      const now = performance.now();
      const dt = Math.max(0.001, (now - lastTime) / 1000);

      // Smooth position for a fluid feel
      displayX += (latestX - displayX) * POS_SMOOTH;
      displayY += (latestY - displayY) * POS_SMOOTH;

      // Estimate speed of pointer in px/sec
      const dx = latestX - prevLatestX;
      const dy = latestY - prevLatestY;
      const dist = Math.hypot(dx, dy);
      const speedInstant = dist / dt; // px/sec
      // Smooth speed to reduce target jitter and janky size jumps
      smoothedSpeed += (speedInstant - smoothedSpeed) * SPEED_SMOOTH;
      const speed = smoothedSpeed;
      prevLatestX = latestX;
      prevLatestY = latestY;

      // Compute target velocity from speed: positive when idle, negative when fast
      const idleFor = now - lastMoveTime;
      const s = Math.max(0, speed);
      const u = Math.min(
        1,
        Math.max(0, (s - SPEED_SLOW) / (SPEED_FAST - SPEED_SLOW)),
      );
      let trend = 1 - 2 * u; // 1..-1 (1 idle → grow, -1 fast → shrink)
      if (trend > 0 && idleFor < DWELL_MS) {
        // brief dwell reduces initial grow push right after movement stops
        trend *= Math.max(0, (idleFor / DWELL_MS) ** 2);
      }
      const targetVel =
        trend >= 0
          ? trend * trend * V_GROW_MAX
          : -Math.pow(-trend, 0.5) * V_SHRINK_MAX; // gentler exponent: stronger response earlier

      // Smooth velocity toward target
      const velEase = 1 - Math.exp(-dt / VEL_TAU);
      vel += (targetVel - vel) * velEase;

      // Easing near bounds for a soothing end behavior
      const progress = Math.min(
        1,
        Math.max(0, (currentSize - minSize) / (maxSize - minSize)),
      );
      let boundEase = 1;
      if (vel > 0)
        boundEase =
          (1 - progress) * (1 - progress); // soft as it approaches max (expand)
      else if (vel < 0) boundEase = Math.pow(progress, 0.8); // lighter damping near min for snappier shrink

      const effectiveVel = vel * boundEase;
      currentSize += effectiveVel * dt;

      // Clamp
      if (currentSize <= minSize) {
        currentSize = minSize;
        if (vel < 0) vel = 0; // rest at bound
      }
      if (currentSize >= maxSize) {
        currentSize = maxSize;
        if (vel > 0) vel = 0;
      }

      // Write CSS vars
      el.style.setProperty('--spotlight-x', `${displayX}px`);
      el.style.setProperty('--spotlight-y', `${displayY}px`);
      el.style.setProperty('--lens-size', `${currentSize.toFixed(1)}px`);

      lastTime = now;
      raf = requestAnimationFrame(tick);
    };

    // Start loop
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('resize', onResize);
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
