'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Mail } from 'lucide-react';

export default function Navbar() {
  const { locale, toggleLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/#top' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.skills, href: '/#skills' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const el = document.getElementById(href.replace('/#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-[#030303]/80 backdrop-blur-lg border-b border-white/[0.06] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10 group-hover:border-neon-cyan/40 transition-all bg-black flex items-center justify-center p-1">
              <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent group-hover:from-neon-cyan group-hover:to-neon-purple transition-all duration-500 hidden sm:block">
              ANGELOS K.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <button
              onClick={toggleLocale}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-neon-cyan/30 text-slate-400 hover:text-neon-cyan transition-all text-sm font-semibold bg-white/[0.03] cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'el' ? 'EN' : 'ΕΛ'}</span>
            </button>

            <a
              href="mailto:aggelos3karabalasis@gmail.com"
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-black bg-white hover:bg-neon-cyan shadow-neon-cyan/20 hover:shadow-neon-cyan/40 transition-all flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>{t.nav.hireMe}</span>
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={toggleLocale} className="px-2.5 py-1.5 rounded-lg border border-white/[0.06] text-slate-400 text-sm bg-white/[0.03] cursor-pointer">
              {locale === 'el' ? 'EN' : 'ΕΛ'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white p-2 rounded-lg border border-white/10 cursor-pointer">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.06] bg-[#030303] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  {link.name}
                </a>
              ))}
              <a href="mailto:aggelos3karabalasis@gmail.com" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold">
                {t.nav.hireMe}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
