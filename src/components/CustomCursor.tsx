'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringRef2 = useRef<HTMLDivElement>(null);
  const ringRef3 = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorClass, setCursorClass] = useState('');

  useEffect(() => {
    // Only run on desktop/devices with a fine pointer (no touch screens)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ring2 = ringRef2.current;
    const ring3 = ringRef3.current;
    if (!dot || !ring || !ring2 || !ring3) return;

    // Set initial position off-screen to avoid jump
    gsap.set([dot, ring, ring2, ring3], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power4.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power4.out' });

    const xRingTo2 = gsap.quickTo(ring2, 'x', { duration: 0.32, ease: 'power4.out' });
    const yRingTo2 = gsap.quickTo(ring2, 'y', { duration: 0.32, ease: 'power4.out' });

    const xRingTo3 = gsap.quickTo(ring3, 'x', { duration: 0.44, ease: 'power4.out' });
    const yRingTo3 = gsap.quickTo(ring3, 'y', { duration: 0.44, ease: 'power4.out' });

    const onMouseMove = (e: MouseEvent) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
      xRingTo2(e.clientX);
      yRingTo2(e.clientY);
      xRingTo3(e.clientX);
      yRingTo3(e.clientY);

      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (interactiveEl) {
        const cursorType = interactiveEl.getAttribute('data-cursor');
        const customText = interactiveEl.getAttribute('data-cursor-text');

        if (customText) {
          setCursorText(customText);
        }

        if (cursorType) {
          setCursorClass(cursorType);
        } else {
          setCursorClass('hovered');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor]');
      if (interactiveEl) {
        setCursorClass('');
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className={`custom-cursor-container hidden pointer-events-none sm:block ${cursorClass}`}>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ring-1 ${cursorClass}`}>
        {cursorText && <span className="text-white text-[9px] font-black">{cursorText}</span>}
      </div>
      <div ref={ringRef2} className={`custom-cursor-ring ring-2 ${cursorClass}`} />
      <div ref={ringRef3} className={`custom-cursor-ring ring-3 ${cursorClass}`} />
    </div>
  );
}
