'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion } from 'framer-motion';
import { Cpu, MapPin, Clock, Gauge, Sparkles } from 'lucide-react';
import GlowCard from './GlowCard';

export default function BentoGrid() {
  const { t } = useLanguage();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('el-GR', {
        timeZone: 'Europe/Athens', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const badges = [
    { name: 'WordPress', color: 'text-blue-400 bg-blue-500/10' },
    { name: 'PHP', color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'HTML / CSS', color: 'text-orange-400 bg-orange-500/10' },
    { name: 'JavaScript', color: 'text-yellow-400 bg-yellow-500/10' },
    { name: 'React', color: 'text-cyan-400 bg-cyan-500/10' },
    { name: 'Next.js', color: 'text-white bg-white/10' },
    { name: 'Tailwind CSS', color: 'text-teal-400 bg-teal-500/10' },
    { name: 'Vue.js', color: 'text-emerald-400 bg-emerald-500/10' },
    { name: 'WooCommerce', color: 'text-purple-400 bg-purple-500/10' },
    { name: 'Elementor', color: 'text-pink-400 bg-pink-500/10' },
    { name: 'Gutenberg', color: 'text-slate-300 bg-slate-500/10' },
    { name: 'SEO', color: 'text-amber-400 bg-amber-500/10' },
  ];

  return (
    <section id="skills" className="relative py-24 bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neon-emerald/5 border border-neon-emerald/20 text-neon-emerald text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /><span>{t.bento.sectionTag}</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4">{t.bento.title}</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto">{t.bento.subtitle}</motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]">
          {/* Card 1: Tech Stack — large */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 md:row-span-2">
            <GlowCard className="p-6 h-full flex flex-col justify-between" glowColor="rgba(0, 240, 255, 0.12)">
              <div>
                <div className="flex items-center space-x-2 text-neon-cyan mb-4">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{t.bento.cardTech}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  WordPress, React, Next.js, Vue.js, Tailwind CSS, HTML, CSS, JavaScript, PHP, WooCommerce, Gutenberg, Elementor Pro, SEO & Speed Optimization.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border border-white/5 transition-transform hover:scale-105 ${b.color}`}>
                    {b.name}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Card 2: Location & Time */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <GlowCard className="p-6 h-full flex flex-col justify-between" glowColor="rgba(189, 0, 255, 0.12)">
              <div className="flex items-center space-x-2 text-[#a855f7] mb-3">
                <MapPin className="w-5 h-5" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{t.bento.cardLocation}</h3>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{t.bento.locationVal}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">GMT+3 (ATHENS)</div>
              </div>
              <div className="flex items-center space-x-2 mt-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2 w-fit">
                <Clock className="w-4 h-4 text-[#a855f7]" />
                <span className="font-mono font-bold text-white tracking-widest">{time || '--:--:--'}</span>
              </div>
            </GlowCard>
          </motion.div>

          {/* Card 3: Status */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <GlowCard className="p-6 h-full flex flex-col justify-between" glowColor="rgba(16, 185, 129, 0.12)">
              <div className="flex items-center space-x-2 text-neon-emerald mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-emerald" />
                </span>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider">{t.bento.cardStatus}</h3>
              </div>
              <div className="text-lg font-bold text-white">{t.bento.statusText}</div>
              <div className="text-[11px] text-slate-500">Under 2h typical reply time</div>
            </GlowCard>
          </motion.div>

          {/* Card 4: Speed */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <GlowCard className="p-6 h-full flex flex-col items-center justify-center text-center" glowColor="rgba(0, 240, 255, 0.12)">
              <Gauge className="w-8 h-8 text-neon-cyan mb-3" />
              <div className="relative w-16 h-16 rounded-full border-4 border-neon-cyan/30 flex items-center justify-center mb-3">
                <span className="text-xl font-black text-neon-cyan">100</span>
              </div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">{t.bento.cardSpeed}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{t.bento.speedText}</p>
            </GlowCard>
          </motion.div>

          {/* Card 5: AI */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
            <GlowCard className="p-6 h-full flex flex-col items-center justify-center text-center" glowColor="rgba(236, 72, 153, 0.12)">
              <Sparkles className="w-8 h-8 text-pink-400 mb-3 animate-pulse" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{t.bento.cardAI}</h3>
              <p className="text-sm text-slate-300 font-medium">{t.bento.aiText}</p>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
