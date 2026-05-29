'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Sparkles, ChevronDown, Mail } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'success' | 'warning';
  delay: number;
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TERMINAL_LINES: TerminalLine[] = [
  { text: 'npm init @angelos/portfolio --yes', type: 'input', delay: 250 },
  { text: 'Initializing portfolio engine...', type: 'output', delay: 180 },
  { text: '✔ Project structure ready.', type: 'success', delay: 120 },
  { text: 'wp theme build --custom --gutenberg --elementor', type: 'input', delay: 350 },
  { text: 'Compiling WordPress custom theme with 24 Gutenberg blocks...', type: 'output', delay: 200 },
  { text: '✔ Theme compiled. PageSpeed: 100/100', type: 'success', delay: 150 },
  { text: 'import { WordPress, React, NextJS, AI } from "@angelos/skills";', type: 'input', delay: 300 },
  { text: 'Loading skill modules...', type: 'output', delay: 120 },
  { text: 'WordPress: EXPERT | React/Next.js: ADVANCED | AI Vibe Coding: ACTIVE', type: 'success', delay: 200 },
  { text: 'warning: Performance exceeding normal limits. All metrics green.', type: 'warning', delay: 250 },
  { text: 'deploy --production --edge', type: 'input', delay: 250 },
  { text: '✔ Portfolio live. Welcome.', type: 'success', delay: 200 },
];

export default function HeroTerminal() {
  const { t } = useLanguage();
  const [terminalPhase, setTerminalPhase] = useState(true);
  const [displayLines, setDisplayLines] = useState<TerminalLine[]>([]);
  const [mounted, setMounted] = useState(false);

  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Mark as mounted after first paint
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll ONLY inside the terminal container (not the page)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayLines]);

  const scheduleNext = useCallback(() => {
    if (cancelledRef.current) return;
    const idx = indexRef.current;
    if (idx >= TERMINAL_LINES.length) {
      timerRef.current = setTimeout(() => {
        if (!cancelledRef.current) setTerminalPhase(false);
      }, 800);
      return;
    }
    const line = TERMINAL_LINES[idx];
    timerRef.current = setTimeout(() => {
      if (cancelledRef.current) return;
      setDisplayLines(prev => [...prev, line]);
      indexRef.current = idx + 1;
      scheduleNext();
    }, line.delay);
  }, []);

  useEffect(() => {
    if (!terminalPhase) return;
    cancelledRef.current = false;
    indexRef.current = 0;
    setDisplayLines([]);
    timerRef.current = setTimeout(() => scheduleNext(), 400);
    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [terminalPhase, scheduleNext]);

  // Only listen for user scroll AFTER mount + 600ms delay
  // This prevents the scroll bombardment from triggering skip
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const onScroll = () => {
        if (window.scrollY > 80) setTerminalPhase(false);
      };
      window.addEventListener('scroll', onScroll);
      // Store cleanup in ref-like pattern
      return () => window.removeEventListener('scroll', onScroll);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [mounted]);

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303] bg-grid">
      <div className="absolute inset-0 bg-cyber-radial pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {terminalPhase ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)', transition: { duration: 0.5 } }}
            className="w-full max-w-3xl px-4 z-20 flex flex-col items-center"
          >
            {/* Terminal Header */}
            <div className="w-full bg-[#0a0a0f] border border-white/10 rounded-t-2xl px-4 py-3 flex items-center justify-between">
              <div className="flex space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                <Terminal className="w-3.5 h-3.5" />
                <span>angelos@dev:~</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Terminal Body — scrolls internally only */}
            <div
              ref={terminalBodyRef}
              className="w-full h-[340px] md:h-[380px] bg-[#050508] border-x border-b border-white/10 rounded-b-2xl p-5 font-mono text-[13px] overflow-y-auto flex flex-col text-left"
            >
              {displayLines.map((line, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.12 }} className="mb-2 leading-relaxed">
                  {line.type === 'input' && (
                    <span className="text-[#a855f7]">
                      <span className="text-neon-cyan font-bold">~$ </span>{line.text}
                    </span>
                  )}
                  {line.type === 'output' && <span className="text-slate-500">{line.text}</span>}
                  {line.type === 'success' && (
                    <span className="text-neon-emerald font-semibold flex items-center">
                      <Cpu className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />{line.text}
                    </span>
                  )}
                  {line.type === 'warning' && (
                    <span className="text-amber-400 font-medium flex items-center">
                      <ShieldAlert className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />{line.text}
                    </span>
                  )}
                </motion.div>
              ))}
              <div className="flex items-center mt-1">
                <span className="text-neon-cyan font-bold">~$ </span>
                <span className="ml-1 w-2 h-4 bg-neon-cyan animate-cursor-blink" />
              </div>
            </div>

            <motion.button onClick={() => setTerminalPhase(false)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="mt-5 px-5 py-2 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-slate-500 hover:text-white hover:border-neon-cyan/40 transition-all cursor-pointer">
              {t.hero.skip}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="headline" initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="text-center px-4 max-w-4xl z-20">
            {/* Floating orbs */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-neon-cyan/30 rounded-full animate-float blur-[2px]" />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-neon-purple/30 rounded-full animate-float-delayed blur-[2px]" />
            <div className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-float blur-[1px]" />

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-xs font-semibold tracking-wider uppercase mb-8">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{t.hero.badge}</span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
              <span className="block bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">ANGELOS</span>
              <span className="block bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-purple bg-clip-text text-transparent mt-2 animate-gradient-text">KARAMPALASIS</span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto font-medium leading-relaxed mb-10">{t.hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:aggelos3karabalasis@gmail.com" className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold bg-white text-black hover:bg-neon-cyan transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm">
                <Mail className="w-4 h-4" /><span>{t.hero.contactMail}</span>
              </a>
              <a href="https://www.facebook.com/aggelos.karabalasis" target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold border border-white/10 bg-white/5 text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm">
                <FacebookIcon className="w-4 h-4" /><span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/agg_kr/" target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold border border-white/10 bg-white/5 text-white hover:border-pink-500/50 hover:bg-pink-500/5 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm">
                <InstagramIcon className="w-4 h-4" /><span>Instagram</span>
              </a>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-[10px] font-mono tracking-wider text-slate-600 uppercase mb-1.5">{t.hero.scroll}</span>
              <ChevronDown className="w-4 h-4 text-neon-cyan" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
