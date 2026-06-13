'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Gauge, Layers3, Palette, ShoppingCart, WandSparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Magnetic from './Magnetic';

const serviceIcons = [
  <Layers3 key="wordpress" className="h-5 w-5" />,
  <ShoppingCart key="shop" className="h-5 w-5" />,
  <WandSparkles key="motion" className="h-5 w-5" />,
  <Boxes key="apps" className="h-5 w-5" />,
  <Gauge key="speed" className="h-5 w-5" />,
  <Palette key="ai" className="h-5 w-5" />,
];

const accents = ['#00f0ff', '#0055ff', '#9d00ff', '#d300ff', '#00f0ff', '#0055ff'];
const statusLabels = [
  'ENGINE_WP_OK',
  'CART_SECURE_SSL',
  'WEBGL_SHADERS_3D',
  'REACT_V19_READY',
  'LATENCY_OPTIMIZED',
  'AI_PROTOTYPE_STABLE',
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      {/* Decorative HUD scanning guides */}
      <div className="hud-line-h top-12 opacity-30" />
      <div className="hud-line-h bottom-12 opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header HUD Block */}
        <div className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-[#00f0ff]/30 bg-[#00f0ff]/5 px-3.5 py-1.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-[#00f0ff] rounded-lg backdrop-blur-md">
              <span className="h-1.5 w-1.5 bg-[#00f0ff] rounded-full hud-blink" />
              <span>{t.services.sectionTag}</span>
            </div>
            <h2 className="max-w-2xl text-4xl font-black leading-[0.92] text-white md:text-6xl select-none">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-xl font-mono text-xs leading-6 text-slate-400 md:justify-self-end">
            // {t.services.subtitle}
          </p>
        </div>

        {/* Blueprint Grid Layout */}
        <div className="grid gap-px overflow-hidden border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-3 rounded-xl">
          {t.services.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
              className="group relative min-h-[268px] bg-[#020204]/22 p-6 backdrop-blur-md transition hover:bg-white/[0.01] md:p-8 rounded-xl"
              data-cursor="hovered"
            >
              {/* Corner diagnostics inside the card */}
              <div className="hud-corner hud-corner-tl opacity-25 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner hud-corner-tr opacity-25 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner hud-corner-bl opacity-25 group-hover:opacity-100 transition-opacity" />
              <div className="hud-corner hud-corner-br opacity-25 group-hover:opacity-100 transition-opacity" />

              <div className="mb-10 flex items-center justify-between">
                <Magnetic strength={0.25}>
                  <div
                    className="flex h-11 w-11 items-center justify-center border border-white/10 bg-black/50 transition duration-300 group-hover:border-[#00f0ff] group-hover:scale-105 rounded-lg"
                    style={{ color: accents[index] }}
                  >
                    {serviceIcons[index]}
                  </div>
                </Magnetic>
                <span className="font-mono text-[9px] font-bold text-white/20 tracking-wider">[{statusLabels[index]}]</span>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight">{item.title}</h3>
              <p className="mt-3 text-xs leading-6 text-slate-400">{item.desc}</p>
              
              {/* Micro diagnostic loading bar sweep */}
              <div className="w-full h-[1px] bg-white/5 mt-8 overflow-hidden">
                <div 
                  className="h-full origin-left transition-all duration-700 ease-out w-0 group-hover:w-full"
                  style={{ backgroundColor: accents[index], boxShadow: `0 0 8px ${accents[index]}` }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
