'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../components/LanguageContext';
import Navbar from '../../components/Navbar';
import GlowCard from '../../components/GlowCard';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowLeft, Send, ExternalLink } from 'lucide-react';

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

export default function ContactPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = 'aggelos3karabalasis@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center bg-[#030303] bg-grid py-28 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-2xl w-full relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-500 hover:text-neon-cyan transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t.contact.title}</span>
            </Link>
          </motion.div>

          <div className="text-center mb-10">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent mb-3">
              {t.contact.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-slate-400 text-sm max-w-md mx-auto">{t.contact.subtitle}</motion.p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <GlowCard className="p-6" glowColor="rgba(0, 240, 255, 0.12)">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.contact.emailLabel}</div>
                      <div className="text-xs font-mono text-slate-500">{email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href={`mailto:${email}`} className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-neon-cyan transition-colors">
                      <Send className="w-3.5 h-3.5 inline mr-1.5" />Send
                    </a>
                    <button onClick={handleCopy}
                      className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        copied ? 'bg-neon-emerald/10 border-neon-emerald/30 text-neon-emerald' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                      }`}>
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Facebook */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <a href="https://www.facebook.com/aggelos.karabalasis" target="_blank" rel="noopener noreferrer" className="block">
                <GlowCard className="p-5" glowColor="rgba(59, 130, 246, 0.12)">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <FacebookIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Facebook</div>
                        <div className="text-xs text-slate-500">aggelos.karabalasis</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </GlowCard>
              </a>
            </motion.div>

            {/* Instagram */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <a href="https://www.instagram.com/agg_kr/" target="_blank" rel="noopener noreferrer" className="block">
                <GlowCard className="p-5" glowColor="rgba(236, 72, 153, 0.12)">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-xl bg-pink-500/5 border border-pink-500/20 flex items-center justify-center text-pink-400">
                        <InstagramIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Instagram</div>
                        <div className="text-xs text-slate-500">@agg_kr</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </GlowCard>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
