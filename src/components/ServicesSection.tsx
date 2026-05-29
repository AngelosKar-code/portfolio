'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { motion } from 'framer-motion';
import { Layout, ShoppingCart, Gauge, Code2, Sparkles, Palette } from 'lucide-react';
import GlowCard from './GlowCard';

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    { icon: <Layout className="w-6 h-6" />, titleKey: 's1Title' as const, descKey: 's1Desc' as const, glow: 'rgba(168, 85, 247, 0.15)' },
    { icon: <ShoppingCart className="w-6 h-6" />, titleKey: 's2Title' as const, descKey: 's2Desc' as const, glow: 'rgba(16, 185, 129, 0.15)' },
    { icon: <Gauge className="w-6 h-6" />, titleKey: 's3Title' as const, descKey: 's3Desc' as const, glow: 'rgba(0, 240, 255, 0.15)' },
    { icon: <Code2 className="w-6 h-6" />, titleKey: 's4Title' as const, descKey: 's4Desc' as const, glow: 'rgba(59, 130, 246, 0.15)' },
    { icon: <Sparkles className="w-6 h-6" />, titleKey: 's5Title' as const, descKey: 's5Desc' as const, glow: 'rgba(236, 72, 153, 0.15)' },
    { icon: <Palette className="w-6 h-6" />, titleKey: 's6Title' as const, descKey: 's6Desc' as const, glow: 'rgba(245, 158, 11, 0.15)' },
  ];

  const iconColors = [
    'text-purple-400',
    'text-emerald-400',
    'text-neon-cyan',
    'text-blue-400',
    'text-pink-400',
    'text-amber-400',
  ];

  return (
    <section id="services" className="relative py-24 bg-[#050508] overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="absolute -top-40 left-0 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neon-purple/5 border border-neon-purple/20 text-[#a855f7] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Layout className="w-3.5 h-3.5" /><span>{t.services.sectionTag}</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4">{t.services.title}</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto">{t.services.subtitle}</motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <GlowCard className="p-6 h-full" glowColor={svc.glow}>
                <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 ${iconColors[idx]}`}>
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.services[svc.titleKey]}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t.services[svc.descKey]}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
