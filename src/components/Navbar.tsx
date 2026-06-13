'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe2, Mail, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Magnetic from './Magnetic';

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#top' },
    { name: t.nav.showcase, href: '#showcase' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.skills, href: '#skills' },
  ];

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'border-b border-white/5 bg-[#020204]/42 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#top" onClick={(event) => handleLinkClick(event, '#top')} className="group flex items-center gap-3">
            <div className="relative h-10 w-10 border border-white/10 bg-black/60 p-1 transition group-hover:border-[#00f0ff] rounded-lg">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />
              <Image src="/logo.png" alt="Angelos Karampalasis logo" width={40} height={40} className="h-full w-full object-contain" />
            </div>
            <div className="hidden leading-none sm:block">
              <div className="font-mono text-xs font-black uppercase tracking-[0.2em] text-white">ANGELOS_K.</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#00f0ff] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-[#00f0ff] rounded-full hud-blink" />
                <span>ONLINE_AVAILABLE</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href)}
                className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-slate-400 transition hover:text-[#00f0ff] relative group/item"
              >
                <span className="opacity-0 group-hover/item:opacity-100 text-[#00f0ff] transition-opacity duration-300">/ </span>
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Magnetic strength={0.15}>
              <button
                type="button"
                onClick={toggleLocale}
                className="px-3 py-2 font-mono text-xs font-bold tracking-wider hover:text-white transition"
                aria-label="Toggle language"
              >
                <span className={locale === 'el' ? 'text-[#00f0ff]' : 'text-slate-500'}>GR</span>
                <span className="text-slate-600 mx-1.5">/</span>
                <span className={locale === 'en' ? 'text-[#00f0ff]' : 'text-slate-500'}>EN</span>
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="mailto:aggelos3karabalasis@gmail.com"
                className="inline-flex items-center gap-2 border border-[#00f0ff]/40 bg-white px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] text-black transition hover:bg-[#00f0ff] rounded-lg"
                data-cursor="hovered"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{t.nav.hireMe}</span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile Nav triggers */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleLocale}
              className="px-2 py-1 font-mono text-xs font-bold"
              aria-label="Toggle language"
            >
              <span className={locale === 'el' ? 'text-[#00f0ff]' : 'text-slate-500'}>GR</span>
              <span className="text-slate-600 mx-1.5">/</span>
              <span className={locale === 'en' ? 'text-[#00f0ff]' : 'text-slate-500'}>EN</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="border border-white/5 bg-white/[0.02] p-2 text-slate-200 rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-[#020204] md:hidden"
          >
            <div className="space-y-1 px-4 py-5 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleLinkClick(event, link.href)}
                  className="block border border-transparent px-3 py-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/[0.02] hover:text-[#00f0ff]"
                >
                  / {link.name}
                </a>
              ))}
              <a
                href="mailto:aggelos3karabalasis@gmail.com"
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 border border-[#00f0ff]/40 bg-[#00f0ff] px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black rounded-lg"
              >
                <Mail className="h-4 w-4" />
                <span>{t.nav.hireMe}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
