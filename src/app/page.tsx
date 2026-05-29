import React from 'react';
import Navbar from '@/components/Navbar';
import HeroTerminal from '@/components/HeroTerminal';
import CodeShowcase from '@/components/CodeShowcase';
import ServicesSection from '@/components/ServicesSection';
import BentoGrid from '@/components/BentoGrid';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero with coding terminal intro */}
        <HeroTerminal />

        {/* Divider */}
        <div className="section-divider" />

        {/* Code Showcase with live website preview */}
        <CodeShowcase />

        {/* Divider */}
        <div className="section-divider" />

        {/* Services */}
        <ServicesSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* Bento Grid with tech stack */}
        <BentoGrid />
      </main>

      {/* Footer */}
      <div className="section-divider" />
      <footer className="relative py-10 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center p-0.5">
              <Image src="/logo.png" alt="Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className="text-xs font-mono text-slate-600">
              © {new Date().getFullYear()} Angelos Karampalasis
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-600">
            <span>WordPress</span><span className="text-white/10">·</span>
            <span>React</span><span className="text-white/10">·</span>
            <span>Next.js</span><span className="text-white/10">·</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </>
  );
}
