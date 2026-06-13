import Navbar from '@/components/Navbar';
import HeroShowcase from '@/components/HeroShowcase';
import ExperienceShowcase from '@/components/ExperienceShowcase';
import ServicesSection from '@/components/ServicesSection';
import BentoGrid from '@/components/BentoGrid';
import SiteFooter from '@/components/SiteFooter';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import ScrollCanvas from '@/components/ScrollCanvas';

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollCanvas />
      <div className="noise-overlay" />
      <div className="radial-glow" />

      <Navbar />
      <main className="relative z-10">
        <HeroShowcase />
        <ExperienceShowcase />
        <ServicesSection />
        <BentoGrid />
      </main>
      <SiteFooter />
    </SmoothScroll>
  );
}
