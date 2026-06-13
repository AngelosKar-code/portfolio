'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers3, MousePointerClick, Route, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useLanguage } from './LanguageContext';
import Magnetic from './Magnetic';

const icons = [
  <Layers3 key="layers" className="h-5 w-5 text-[#00f0ff]" />,
  <Route key="route" className="h-5 w-5 text-[#00f0ff]" />,
  <MousePointerClick key="pointer" className="h-5 w-5 text-[#00f0ff]" />,
];

// Interactive WebGL gravity field grid
function MiniWebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const particleCount = 225; // 15x15 grid of interaction nodes
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);

    let idx = 0;
    for (let x = 0; x < 15; x++) {
      for (let y = 0; y < 15; y++) {
        const xp = ((x - 7) / 7) * 2.0;
        const yp = ((y - 7) / 7) * 2.0;
        positions[idx * 3] = xp;
        positions[idx * 3 + 1] = yp;
        positions[idx * 3 + 2] = 0;

        initialPositions[idx * 3] = xp;
        initialPositions[idx * 3 + 1] = yp;
        initialPositions[idx * 3 + 2] = 0;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00f0ff, // Cyan point grid
      size: 0.05,
      transparent: true,
      opacity: 0.42,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 3.8;
      mouse.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 3.8;
    };

    const handlePointerEnter = () => {
      mouse.active = true;
      const targetColor = new THREE.Color(0x9d00ff);
      gsap.to(material.color, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 0.35 });
      gsap.to(material, { opacity: 0.9, duration: 0.35 });
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      const targetColor = new THREE.Color(0x00f0ff);
      gsap.to(material.color, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 0.55 });
      gsap.to(material, { opacity: 0.42, duration: 0.55 });
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      const posAttr = geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const ix = initialPositions[i * 3];
        const iy = initialPositions[i * 3 + 1];

        // Rippling wave coordinates
        let z = Math.sin(ix * 1.8 + time * 1.6) * Math.cos(iy * 1.8 + time * 1.2) * 0.12;

        if (mouse.active) {
          const dx = mouse.x - ix;
          const dy = mouse.y - iy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 1.15;
          if (dist < maxDist) {
            const force = (1.0 - dist / maxDist) * 0.32;
            arr[i * 3] = ix + (dx / dist) * force;
            arr[i * 3 + 1] = iy + (dy / dist) * force;
            z += force * 0.72;
          } else {
            arr[i * 3] += (ix - arr[i * 3]) * 0.06;
            arr[i * 3 + 1] += (iy - arr[i * 3 + 1]) * 0.06;
          }
        } else {
          arr[i * 3] += (ix - arr[i * 3]) * 0.06;
          arr[i * 3 + 1] += (iy - arr[i * 3 + 1]) * 0.06;
        }

        arr[i * 3 + 2] = z;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default function ExperienceShowcase() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.showcase-heading',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      );

      gsap.fromTo(
        '.showcase-card',
        { y: 54, opacity: 0, rotateX: -8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.showcase-grid',
            start: 'top 78%',
          },
        },
      );

      gsap.fromTo(
        '.kinetic-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="relative overflow-hidden bg-transparent py-24 text-slate-400 md:py-32 bg-blueprint">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <div className="showcase-heading mb-5 inline-flex items-center gap-2 border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#00f0ff] backdrop-blur-md rounded-lg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.showcase.sectionTag}</span>
          </div>
          <h2 className="showcase-heading max-w-xl text-4xl font-black leading-[0.94] md:text-6xl text-white select-none">
            {t.showcase.title}
          </h2>
          <p className="showcase-heading mt-6 max-w-xl text-sm font-medium leading-7 text-slate-400 md:text-base">
            {t.showcase.subtitle}
          </p>

          <div className="showcase-heading mt-10 border border-white/5 bg-[#020204]/42 backdrop-blur-xl p-5 text-white relative rounded-xl">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <div className="kinetic-bar mb-5 h-1 origin-left bg-[linear-gradient(90deg,#00f0ff,#0055ff,#9d00ff)] rounded-full" />
            <h3 className="font-mono text-sm font-black text-white">{t.showcase.proofTitle}</h3>
            <p className="mt-3 text-xs leading-6 text-slate-400 font-mono">{t.showcase.proofText}</p>
          </div>
        </div>

        <div className="showcase-grid grid gap-5">
          {t.showcase.cards.map((card, index) => (
            <Magnetic key={card.title} strength={0.12}>
              <motion.article
                whileHover={{ y: -5, rotate: index === 1 ? -0.4 : 0.4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="showcase-card group relative overflow-hidden border border-white/5 bg-[#020204]/42 backdrop-blur-xl p-6 shadow-[0_24px_70px_rgba(0,0,0,0.42)] hover:border-[#00f0ff]/35 transition duration-300 rounded-xl"
                data-cursor="hovered"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#00f0ff,#0055ff,#9d00ff)] opacity-0 transition group-hover:opacity-100" />
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center border border-white/5 bg-black/40 text-[#00f0ff] rounded-lg">
                        {icons[index]}
                      </span>
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-white/40">{card.kicker}</span>
                    </div>
                    <h3 className="text-xl font-black md:text-2xl text-white tracking-tight">{card.title}</h3>
                    <p className="mt-3 max-w-xl text-xs font-medium leading-6 text-slate-400">{card.body}</p>
                  </div>
                  <div className="w-fit border border-white/5 bg-black/40 px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#00f0ff] rounded-lg">
                    {card.metric}
                  </div>
                </div>
              </motion.article>
            </Magnetic>
          ))}

          {/* Interactive WebGL gravity field grid */}
          <div className="relative min-h-[320px] overflow-hidden border border-white/5 bg-[#020204]/42 backdrop-blur-xl p-4 md:min-h-[420px] md:p-6 rounded-xl" data-cursor="drag-mode" data-cursor-text="DRAG">
            <MiniWebGLCanvas />
            
            <div className="absolute inset-5 pointer-events-none border border-white/5 rounded-lg" />
            <div className="absolute left-8 top-8 pointer-events-none font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#00f0ff]">INTERACTIVE_PHYSICS_GRID // [WEBGL]</div>
            
            <div className="relative z-10 pointer-events-none flex h-full min-h-[288px] items-end">
              <div className="grid w-full grid-cols-3 gap-3 font-mono">
                {['Depth', 'Motion', 'Polish'].map((label, index) => (
                  <div key={label} className="demo-tile border border-white/5 bg-black/60 p-4 backdrop-blur-sm shadow-sm rounded-lg" style={{ animationDelay: `${index * 0.18}s` }}>
                    <div className="mb-8 h-1 w-full bg-[linear-gradient(90deg,#00f0ff,#0055ff,#9d00ff)] rounded-full" />
                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-white">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
