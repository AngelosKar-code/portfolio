'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Cpu, Gauge, Mail, MapPin, Sparkles, Terminal } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Magnetic from './Magnetic';

const stack = [
  'WordPress',
  'WooCommerce',
  'React',
  'Next.js',
  'Three.js',
  'GSAP',
  'TailwindCSS',
  'TypeScript',
  'GLSL Shaders',
  'Core Web Vitals',
  'REST APIs',
  'AI Engineering',
];

export default function BentoGrid() {
  const { t } = useLanguage();
  const [time, setTime] = useState('');
  const [sysLog, setSysLog] = useState('SYS_IDLE');

  // Time tracker
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('el-GR', {
          timeZone: 'Europe/Athens',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  // System Log Simulator
  useEffect(() => {
    const logs = [
      'PARSING_WEBGL_SHADERS',
      'COMPILING_PIPELINE_OK',
      'SYS_CORE_ACTIVE',
      'SCRUBBING_MATRIX_COORD',
      'GSAP_TIMELINE_BUFFERED',
      'OPTIMIZING_DOM_NODES',
    ];
    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setSysLog(randomLog);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#00f0ff] rounded-lg backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5" />
            <span>{t.bento.sectionTag}</span>
          </div>
          <h2 className="text-4xl font-black leading-[0.92] text-white md:text-6xl select-none">{t.bento.title}</h2>
          <p className="mt-6 font-mono text-xs leading-6 text-slate-400">{t.bento.subtitle}</p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          
          {/* Main Visual Panel */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative min-h-[340px] overflow-hidden border border-white/5 bg-[#020204]/42 p-6 backdrop-blur-xl hover:border-white/12 transition duration-300 md:col-span-2 md:row-span-2 md:p-8 rounded-xl"
            data-cursor="hovered"
          >
            <div className="bento-wave absolute inset-0 opacity-40 pointer-events-none" />
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 flex h-11 w-11 items-center justify-center border border-white/10 bg-black/40 text-[#00f0ff] rounded-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tight">{t.bento.craftTitle}</h3>
                <p className="mt-4 max-w-md text-xs leading-6 text-slate-400 font-sans">{t.bento.craftText}</p>
              </div>

              <Magnetic strength={0.2}>
                <a
                  href="mailto:aggelos3karabalasis@gmail.com"
                  className="mt-10 inline-flex w-fit items-center gap-2 border border-[#00f0ff]/40 bg-[#00f0ff] px-5 py-3.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-white rounded-lg"
                  data-cursor="hovered"
                >
                  <Mail className="h-4 w-4" />
                  <span>{t.nav.hireMe}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </motion.article>

          {/* Tech Stack Array Panel */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="group relative border border-white/5 bg-[#020204]/30 p-6 backdrop-blur-md hover:border-white/12 transition duration-300 md:col-span-2 rounded-xl"
            data-cursor="hovered"
          >
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            <h3 className="mb-6 font-mono text-[10px] font-black uppercase tracking-[0.20em] text-white/50">{t.bento.stackTitle}</h3>
            <div className="flex flex-wrap gap-2.5 font-mono text-[10px]">
              {stack.map((item, index) => (
                <span
                  key={item}
                  className="border border-white/5 px-3 py-2 text-slate-300 bg-white/[0.01] rounded-lg"
                  style={{ 
                    borderColor: index % 3 === 0 ? 'rgba(0,240,255,0.15)' : index % 3 === 1 ? 'rgba(0,85,255,0.15)' : 'rgba(157,0,255,0.15)',
                    color: index % 3 === 0 ? '#00f0ff' : index % 3 === 1 ? '#0055ff' : '#9d00ff'
                  }}
                >
                  &quot;{item}&quot;
                </span>
              ))}
            </div>
          </motion.article>

          {/* Coordinates Panel */}
          <InfoPanel 
            icon={<MapPin className="h-4.5 w-4.5" />} 
            label={t.bento.locationTitle} 
            value="ATHENS, GR" 
            detail="[37.9838° N, 23.7275° E]" 
            color="#0055ff" 
            delay={0.1} 
          />

          {/* Clock Panel */}
          <InfoPanel 
            icon={<Clock className="h-4.5 w-4.5" />} 
            label="SYS_CLOCK" 
            value={time || '--:--:--'} 
            detail="[GMT+3 // SECURE]" 
            color="#9d00ff" 
            delay={0.14} 
          />

          {/* Performance Panel */}
          <InfoPanel 
            icon={<Gauge className="h-4.5 w-4.5" />} 
            label={t.bento.speedTitle} 
            value="LIGHTSPEED" 
            detail="ACCELERATED_DOM" 
            color="#00f0ff" 
            delay={0.18} 
          />

          {/* Terminal Diagnostics Panel */}
          <InfoPanel 
            icon={<Terminal className="h-4.5 w-4.5" />} 
            label="TERMINAL_LOG" 
            value={sysLog} 
            detail="[STATUS_ACTIVE]" 
            color="#d300ff" 
            delay={0.22} 
          />

        </div>
      </div>
    </section>
  );
}

function InfoPanel({
  icon,
  label,
  value,
  detail,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative min-h-[190px] border border-white/5 bg-[#020204]/30 p-6 backdrop-blur-md hover:border-white/12 transition duration-300 font-mono text-xs rounded-xl"
      data-cursor="hovered"
    >
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      <div className="mb-6 flex items-center justify-between">
        <Magnetic strength={0.25}>
          <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 rounded-lg" style={{ color }}>
            {icon}
          </div>
        </Magnetic>
        <span className="h-2 w-2 rounded-full hud-blink" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">{label}</div>
      <div className="mt-3 text-lg font-black text-white tracking-tight">{value}</div>
      <div className="mt-1 text-[10px] text-slate-500">{detail}</div>
    </motion.article>
  );
}
