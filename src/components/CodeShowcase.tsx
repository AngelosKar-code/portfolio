'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Rocket, Star, ArrowRight, Sparkles, Gauge } from 'lucide-react';
import GlowCard from './GlowCard';

const CODE_LINES = [
  { text: '// Building a premium WordPress website...', color: 'text-slate-500' },
  { text: '', color: '' },
  { text: "const website = new WebProject({", color: 'text-white' },
  { text: "  client: 'Premium Business',", color: 'text-neon-emerald' },
  { text: "  theme: 'Custom Built from Scratch',", color: 'text-neon-emerald' },
  { text: "  builder: 'Gutenberg + Elementor Pro',", color: 'text-neon-emerald' },
  { text: "  responsive: true,", color: 'text-neon-cyan' },
  { text: "  ecommerce: 'WooCommerce',", color: 'text-[#a855f7]' },
  { text: "  seo: { score: 100, schema: true },", color: 'text-amber-400' },
  { text: "  speed: { lighthouse: 100, lcp: '0.8s' },", color: 'text-amber-400' },
  { text: "  stack: ['HTML', 'CSS', 'JS', 'React', 'Tailwind'],", color: 'text-[#a855f7]' },
  { text: "  ai: 'Vibe Coding Enabled',", color: 'text-pink-400' },
  { text: '});', color: 'text-white' },
  { text: '', color: '' },
  { text: 'await website.build();', color: 'text-neon-cyan' },
  { text: 'await website.optimize();', color: 'text-neon-cyan' },
  { text: 'await website.deploy("production");', color: 'text-neon-cyan' },
  { text: '', color: '' },
  { text: '// ✔ Build complete. Launching preview...', color: 'text-neon-emerald' },
];

export default function CodeShowcase() {
  const { t } = useLanguage();
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [codeFinished, setCodeFinished] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  const typeNext = useCallback(() => {
    if (cancelledRef.current) return;
    if (indexRef.current >= CODE_LINES.length) {
      setCodeFinished(true);
      return;
    }
    indexRef.current += 1;
    setVisibleLines(indexRef.current);
    timerRef.current = setTimeout(typeNext, 70 + Math.random() * 50);
  }, []);

  // Start when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    cancelledRef.current = false;
    indexRef.current = 0;
    setVisibleLines(0);
    setCodeFinished(false);
    setShowPreview(false);
    timerRef.current = setTimeout(typeNext, 300);
    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasStarted, typeNext]);

  // When code finishes → trigger preview after a beat
  useEffect(() => {
    if (!codeFinished) return;
    const t = setTimeout(() => setShowPreview(true), 600);
    return () => clearTimeout(t);
  }, [codeFinished]);

  return (
    <section ref={sectionRef} id="code" className="relative py-24 bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-30" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Code2 className="w-3.5 h-3.5" /><span>{t.code.sectionTag}</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4">{t.code.title}</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto">{t.code.subtitle}</motion.p>
        </div>

        {/* Code Editor + Preview — side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Code Editor */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <GlowCard glowColor="rgba(0, 240, 255, 0.1)">
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">build-website.js</span>
                <div className="w-10" />
              </div>
              <div className="p-4 md:p-5 font-mono text-[12px] md:text-[13px] leading-relaxed min-h-[400px] max-h-[460px] overflow-y-auto">
                {CODE_LINES.slice(0, visibleLines).map((line, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.08 }} className="flex">
                    <span className="text-slate-700 w-7 text-right mr-3 select-none flex-shrink-0 text-[11px]">{idx + 1}</span>
                    <span className={line.color || 'text-white'}>{line.text || '\u00A0'}</span>
                  </motion.div>
                ))}
                {!codeFinished && (
                  <div className="flex">
                    <span className="text-slate-700 w-7 text-right mr-3 select-none text-[11px]">{visibleLines + 1}</span>
                    <span className="w-2 h-4 bg-neon-cyan animate-cursor-blink mt-0.5" />
                  </div>
                )}
                {codeFinished && !showPreview && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center mt-3 text-neon-cyan text-xs font-semibold">
                    <Rocket className="w-3.5 h-3.5 mr-2 animate-bounce" />
                    Launching preview...
                  </motion.div>
                )}
              </div>
            </GlowCard>
          </motion.div>

          {/* Website Preview — appears after code finishes */}
          <div className="relative min-h-[400px] lg:min-h-[460px] flex items-center justify-center">
            <AnimatePresence>
              {!showPreview && (
                <motion.div
                  key="waiting"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                      <Code2 className="w-7 h-7 text-slate-600" />
                    </div>
                    <p className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                      {codeFinished ? 'Rendering...' : 'Waiting for build...'}
                    </p>
                  </div>
                </motion.div>
              )}

              {showPreview && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <GlowCard glowColor="rgba(168, 85, 247, 0.12)">
                    {/* Mock Browser Chrome */}
                    <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
                      <div className="flex space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-white/[0.04] rounded-lg px-3 py-1 text-[10px] font-mono text-slate-500 text-center border border-white/[0.04]">
                          https://premium-business.gr
                        </div>
                      </div>
                      <div className="w-8" />
                    </div>

                    {/* Mock Website Hero */}
                    <div className="relative overflow-hidden">
                      {/* Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
                      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px]" />
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-[60px]" />

                      <div className="relative p-6 md:p-8">
                        {/* Mock Nav */}
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                          className="flex items-center justify-between mb-8">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500" />
                            <span className="text-[11px] font-bold text-white/90">BRAND</span>
                          </div>
                          <div className="flex space-x-4">
                            {['Home', 'About', 'Shop'].map((item) => (
                              <span key={item} className="text-[9px] text-white/40 font-medium">{item}</span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Mock Hero Content */}
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                          className="text-center mb-6">
                          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] text-purple-300 font-semibold uppercase tracking-wider mb-4">
                            <Star className="w-2.5 h-2.5" /><span>Premium Collection</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                            Elevate Your
                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                              Digital Presence
                            </span>
                          </h3>
                          <p className="text-[10px] text-white/40 max-w-[250px] mx-auto leading-relaxed mb-5">
                            Handcrafted WordPress website with custom theme, blazing speed, and stunning design.
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-[10px] font-bold text-white flex items-center space-x-1">
                              <span>Explore</span><ArrowRight className="w-3 h-3" />
                            </span>
                            <span className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-medium text-white/60">Contact</span>
                          </div>
                        </motion.div>

                        {/* Mock Stats */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                          className="grid grid-cols-3 gap-2">
                          {[
                            { val: '100', label: 'PageSpeed', icon: <Gauge className="w-3 h-3 text-emerald-400" /> },
                            { val: '0.8s', label: 'Load Time', icon: <Sparkles className="w-3 h-3 text-cyan-400" /> },
                            { val: 'A+', label: 'SEO Grade', icon: <Star className="w-3 h-3 text-amber-400" /> },
                          ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-2.5 text-center">
                              <div className="flex items-center justify-center mb-1">{stat.icon}</div>
                              <div className="text-sm font-black text-white">{stat.val}</div>
                              <div className="text-[8px] text-white/30 font-medium uppercase">{stat.label}</div>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    {/* Result Badge */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                      className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">Live • PageSpeed 100/100</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-600">Built by Angelos K.</span>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
