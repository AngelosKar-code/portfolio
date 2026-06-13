'use client';

import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
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

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-transparent py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        
        {/* Logo and Tagline Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 border border-white/10 bg-black/60 p-0.5 rounded-lg">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <Image src="/logo.png" alt="Angelos Karampalasis logo" width={32} height={32} className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="font-mono text-xs font-black uppercase tracking-[0.16em] text-white">ANGELOS_KARAMPALASIS</div>
            <div className="mt-1 font-mono text-[9px] text-slate-500 uppercase tracking-widest">{t.footer.tagline}</div>
            <a
              href="mailto:aggelos3karabalasis@gmail.com"
              className="mt-2 block font-mono text-[10px] text-[#00f0ff]/80 hover:text-[#00f0ff] transition select-all tracking-wider"
              data-cursor="hovered"
            >
              aggelos3karabalasis@gmail.com
            </a>
          </div>
        </div>

        {/* Tech Stack Diagnostics & Socials */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] text-slate-500 tracking-widest">
          <span>THREE_JS</span>
          <span className="h-px w-4 bg-white/10" />
          <span>GSAP_MOTION</span>
          <span className="h-px w-4 bg-white/10" />
          <span>NEXT_V16</span>
          <span className="h-px w-4 bg-white/10" />
          
          <div className="flex items-center gap-2.5">
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
          
          <span className="h-px w-4 bg-white/10" />
          <Magnetic strength={0.25}>
            <a
              href="mailto:aggelos3karabalasis@gmail.com"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.01] px-3.5 py-2 text-white transition hover:border-[#00f0ff] hover:text-[#00f0ff] rounded-lg"
              data-cursor="hovered"
            >
              <Mail className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>EMAIL</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
