'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Mail, MousePointer2, Sparkles, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import { useLanguage } from './LanguageContext';
import Magnetic from './Magnetic';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function HeroShowcase() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [fps, setFps] = useState(60);
  const [coords, setCoords] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  const [winSize, setWinSize] = useState({ w: 1920, h: 1080 });

  // FPS Counter
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let frameId = 0;
    const tick = () => {
      frames++;
      const time = performance.now();
      if (time >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (time - lastTime)));
        frames = 0;
        lastTime = time;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Mouse coordinate tracker & Resize observer
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
      setCoords({
        x: e.clientX,
        y: e.clientY,
        nx: parseFloat(nx.toFixed(4)),
        ny: parseFloat(ny.toFixed(4)),
      });
    };

    const handleResize = () => {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP reveal animations
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
        },
      );
      gsap.fromTo(
        '.hud-panel-reveal',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToShowcase = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} id="top" className="relative min-h-screen overflow-hidden bg-transparent flex items-center justify-center pt-20">
      {/* Corner crosshairs for viewport boundaries */}
      <div className="absolute top-24 left-6 text-white/20 font-mono text-[9px] pointer-events-none">[X_00]</div>
      <div className="absolute top-24 right-6 text-white/20 font-mono text-[9px] pointer-events-none">[X_FF]</div>
      <div className="absolute bottom-6 left-6 text-white/20 font-mono text-[9px] pointer-events-none">[Y_00]</div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Creative Title Info */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="hero-reveal mb-6 inline-flex w-fit items-center gap-2 border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#00f0ff] backdrop-blur-md rounded-lg">
              <span className="h-1.5 w-1.5 bg-[#00f0ff] rounded-full hud-blink" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero-reveal text-4xl font-black leading-[0.9] text-white sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.4rem] select-none max-w-2xl">
              <span className="block">{t.hero.titleLead}</span>
              <span className="block text-balance bg-[linear-gradient(92deg,#00f0ff_0%,#0055ff_50%,#9d00ff_100%)] bg-clip-text text-transparent glow-cyan">
                {t.hero.titleAccent}
              </span>
            </h1>

            <div className="hero-reveal mt-9 flex flex-wrap gap-4">
              <Magnetic strength={0.22}>
                <button
                  type="button"
                  onClick={scrollToShowcase}
                  className="group relative inline-flex items-center justify-center gap-2 border border-[#00f0ff]/40 bg-[#00f0ff] px-6 py-3.5 font-mono text-xs font-black text-black transition hover:bg-white rounded-lg"
                  data-cursor="hovered"
                >
                  <span>{t.hero.primary}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href="mailto:aggelos3karabalasis@gmail.com"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-6 py-3.5 font-mono text-xs font-bold text-white backdrop-blur-md transition hover:border-[#0055ff]/40 hover:text-[#0055ff] rounded-lg"
                  data-cursor="hovered"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.hero.secondary}</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column HUD Panel */}
          <div className="lg:col-span-5 hud-panel-reveal flex justify-center">
            <div className="relative w-full max-w-sm border border-white/5 bg-[#020204]/42 p-5 backdrop-blur-xl font-mono text-xs text-slate-400 rounded-xl">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="text-[10px] font-black uppercase text-white/50 tracking-wider">DIAGNOSTIC_RADAR</span>
                <RefreshCw className="h-3.5 w-3.5 text-[#00f0ff] animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/[0.02] pb-2">
                  <span className="text-white/30">REFRESH_RATE:</span>
                  <span className="text-[#00f0ff] font-bold">{fps} FPS</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/[0.02] pb-2">
                  <span className="text-white/30">VIEWPORT_SIZE:</span>
                  <span className="text-white">{winSize.w} x {winSize.h} px</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/[0.02] pb-2">
                  <span className="text-white/30">CURSOR_ABS:</span>
                  <span className="text-white">X:{coords.x} Y:{coords.y}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/[0.02] pb-2">
                  <span className="text-white/30">CURSOR_NORM:</span>
                  <span className="text-[#00f0ff] font-bold">[{coords.nx}, {coords.ny}]</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-white/30">SYS_LOAD:</span>
                  <span className="text-[#9d00ff] font-bold">0.024 MS // MEM_OK</span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/5 pt-4">
                <div className="text-[9px] text-white/20 uppercase tracking-widest mb-2">VECTOR_MATRICES</div>
                <div className="h-1 bg-white/5 overflow-hidden rounded-full">
                  <div className="h-full bg-[linear-gradient(90deg,#00f0ff,#0055ff,#9d00ff)] origin-left animate-pulse" style={{ width: '82%' }} />
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Lower Metrics Dashboard */}
        <div className="mt-16 grid grid-cols-1 border border-white/5 bg-[#020204]/30 backdrop-blur-md sm:grid-cols-3 rounded-xl overflow-hidden">
          {t.hero.metrics.map((metric) => (
            <div key={metric.label} className="border-white/5 px-6 py-5 sm:border-r last:sm:border-r-0 relative group">
              <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-xl font-black text-white font-mono tracking-wider">{metric.value}</div>
              <div className="mt-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* HUD bottom bar metadata */}
        <div className="absolute bottom-6 right-4 hidden items-center gap-3 border border-white/5 bg-black/40 px-3.5 py-2.5 backdrop-blur-md sm:flex lg:right-8 rounded-lg">
          <Magnetic strength={0.2}>
            <div className="h-7 w-7 overflow-hidden border border-white/10 bg-black p-0.5 rounded-lg" data-cursor="difference-mode">
              <Image src="/logo.png" alt="Angelos Karampalasis logo" width={32} height={32} className="h-full w-full object-contain" />
            </div>
          </Magnetic>
          <span className="h-4 w-px bg-white/10" />
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">ANGELOS_K. // V1.0</div>
          <span className="h-4 w-px bg-white/10" />
          <div className="flex gap-2.5">
            <Magnetic strength={0.3}>
              <a href="https://www.facebook.com/aggelos.karabalasis" target="_blank" rel="noopener noreferrer" className="p-1 text-slate-500 transition hover:text-[#00f0ff]" aria-label="Facebook">
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="https://www.instagram.com/agg_kr/" target="_blank" rel="noopener noreferrer" className="p-1 text-slate-500 transition hover:text-[#9d00ff]" aria-label="Instagram">
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
