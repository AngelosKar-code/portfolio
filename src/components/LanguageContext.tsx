'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Locale = 'el' | 'en';

type TranslationType = {
  nav: {
    home: string;
    showcase: string;
    services: string;
    skills: string;
    hireMe: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    primary: string;
    secondary: string;
    scroll: string;
    metrics: { value: string; label: string }[];
  };
  showcase: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cards: { kicker: string; title: string; body: string; metric: string }[];
    proofTitle: string;
    proofText: string;
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  bento: {
    sectionTag: string;
    title: string;
    subtitle: string;
    craftTitle: string;
    craftText: string;
    stackTitle: string;
    locationTitle: string;
    locationVal: string;
    statusTitle: string;
    statusText: string;
    speedTitle: string;
    speedText: string;
    aiTitle: string;
    aiText: string;
  };
  footer: {
    tagline: string;
  };
};

const translations: Record<Locale, TranslationType> = {
  el: {
    nav: {
      home: 'ΑΡΧΙΚΗ',
      showcase: 'SHOWCASE',
      services: 'ΥΠΗΡΕΣΙΕΣ',
      skills: 'ΔΕΞΙΟΤΗΤΕΣ',
      hireMe: 'ΕΠΙΚΟΙΝΩΝΙΑ',
    },
    hero: {
      badge: 'HOLOGRAM INITIALIZED // CREATIVE TECH',
      titleLead: 'ΑΓΓΕΛΟΣ ΚΑΡΑΜΠΑΛΑΣΗΣ',
      titleAccent: 'WEB DEVELOPMENT SOLUTIONS',
      subtitle:
        'Interactive developer που σχεδιάζει τρισδιάστατες πύλες, φυσική διανυσμάτων και WebGL modules υψηλών επιδόσεων. Συνδυάζω τον κώδικα με την ψηφιακή τέχνη.',
      primary: 'Εκκίνηση Showcase',
      secondary: 'Δίαυλος Επικοινωνίας',
      scroll: 'SCROLL_DOWN',
      metrics: [
        { value: 'THREE.JS', label: 'REALTIME CORE' },
        { value: 'GSAP', label: 'MOTION VECTOR' },
        { value: '0.08s', label: 'LATENCY TARGET' },
      ],
    },
    showcase: {
      sectionTag: 'PROJECT GALLERY // SEC.02',
      title: 'Επιλεγμένα Πειράματα & Δομές',
      subtitle:
        'Μια συλλογή από διαδραστικά WebGL shaders, scroll-driven vector layouts και premium ψηφιακά συστήματα χτισμένα με κλινική ακρίβεια.',
      cards: [
        {
          kicker: 'EXP_01 / VECTOR CORE',
          title: 'Ολογραφική Προβολή',
          body: 'Realtime rendering icosahedron με διάθλαση βάθους, τροχιακά σωματίδια και καταγραφή συντεταγμένων του κέρσορα.',
          metric: 'ACTIVE',
        },
        {
          kicker: 'EXP_02 / MOTION FLOW',
          title: 'Scroll Choreography',
          body: 'Χορογραφία scrolling με Lenis και GSAP ScrollTrigger. Ομαλές μεταβάσεις στοιχείων και δυναμική φόρτωση.',
          metric: 'ONLINE',
        },
        {
          kicker: 'EXP_03 / GRAPHICS ENGINE',
          title: 'Premium WebGL Shaders',
          body: 'Δημιουργία custom fragment shaders και particle gravity fields που αντιδρούν στις κινήσεις του χρήστη.',
          metric: 'STABLE',
        },
      ],
      proofTitle: 'Διαγνωστικά Στοιχεία',
      proofText:
        'Το portfolio λειτουργεί σαν ζωντανό ολογραφικό demo: αποδεικνύει την ικανότητα σύνθεσης premium visual graphics με στιβαρή βάση κώδικα.',
    },
    services: {
      sectionTag: 'OPERATIONAL MODULES // SEC.03',
      title: 'Υπηρεσίες Υψηλής Ευκρίνειας',
      subtitle: 'Από custom WordPress engines μέχρι immersive React εφαρμογές, κάθε pixel κατασκευάζεται για μέγιστη απόδοση.',
      items: [
        {
          title: 'WordPress Core Engines',
          desc: 'Custom Gutenberg blocks, Elementor Pro αρχιτεκτονική και clean-code βάση για εύκολη διαχείριση.',
        },
        {
          title: 'E-commerce WooCommerce',
          desc: 'Ηλεκτρονικά καταστήματα με βελτιστοποιημένα buy flows, responsive checkouts και υψηλές ταχύτητες.',
        },
        {
          title: '3D & Motion Platforms',
          desc: 'Three.js, GLSL shaders, GSAP timelines και micro-interactions για brands που απαιτούν visual impact.',
        },
        {
          title: 'React / Next.js Frameworks',
          desc: 'Μοντέρνες web εφαρμογές με component-driven δομές και βελτιστοποιημένο server rendering.',
        },
        {
          title: 'Performance & Audit Tuning',
          desc: 'Βελτιστοποίηση Core Web Vitals, clean SEO markup, schema.org schema και μέγιστο speed optimization.',
        },
        {
          title: 'AI Prototyping Systems',
          desc: 'Ενσωμάτωση AI workflows για ταχύτατο prototyping, καθαρότερο κώδικα και βέλτιστο execution.',
        },
      ],
    },
    bento: {
      sectionTag: 'TECH COCKPIT // SEC.04',
      title: 'Διαγνωστικός Πίνακας Ελέγχου',
      subtitle: 'Ο συνδυασμός των εργαλείων και των τεχνολογιών που τροφοδοτούν τις ψηφιακές εμπειρίες.',
      craftTitle: 'Visual Webcraft',
      craftText:
        'Σχεδιάζω interfaces με ρυθμό, βάθος, responsive συμπεριφορά και μικρές λεπτομέρειες που κάνουν την εμπειρία να δείχνει premium.',
      stackTitle: 'Tech Stack',
      locationTitle: 'Location',
      locationVal: 'Αθήνα, Ελλάδα',
      statusTitle: 'STATUS',
      statusText: 'AVAILABLE_FOR_PROJECTS',
      speedTitle: 'PERFORMANCE',
      speedText: 'Target: 100/100 Core Web Vitals',
      aiTitle: 'AI_WORKFLOW',
      aiText: 'Iterating at the speed of thought.',
    },
    footer: {
      tagline: 'MASTERPIECE CORE V1 // Angelos Karampalasis',
    },
  },
  en: {
    nav: {
      home: 'HOME',
      showcase: 'SHOWCASE',
      services: 'SERVICES',
      skills: 'SKILLS',
      hireMe: 'CONTACT',
    },
    hero: {
      badge: 'HOLOGRAM INITIALIZED // CREATIVE TECH',
      titleLead: 'ANGELOS KARAMPALASIS',
      titleAccent: 'WEB DEVELOPMENT SOLUTIONS',
      subtitle:
        'Interactive developer crafting immersive 3D portals, vector physics, and high-performance WebGL modules. Blending code with digital art.',
      primary: 'Initialize Showcase',
      secondary: 'Establish Connection',
      scroll: 'SCROLL_DOWN',
      metrics: [
        { value: 'THREE.JS', label: 'REALTIME CORE' },
        { value: 'GSAP', label: 'MOTION VECTOR' },
        { value: '0.08s', label: 'LATENCY TARGET' },
      ],
    },
    showcase: {
      sectionTag: 'PROJECT GALLERY // SEC.02',
      title: 'Selected Experiments & Vector Spaces',
      subtitle:
        'A collection of interactive WebGL shaders, scroll-driven vector layouts, and premium digital systems built with clinical precision.',
      cards: [
        {
          kicker: 'EXP_01 / VECTOR CORE',
          title: 'Holographic Projection',
          body: 'Realtime icosahedron rendering with depth-refraction, orbital points, and viewport coordinate tracking.',
          metric: 'ACTIVE',
        },
        {
          kicker: 'EXP_02 / MOTION FLOW',
          title: 'Scroll Choreography',
          body: 'Scroll choreography powered by Lenis and GSAP ScrollTrigger. Fluid transforms and dynamic element reveals.',
          metric: 'ONLINE',
        },
        {
          kicker: 'EXP_03 / GRAPHICS ENGINE',
          title: 'Premium WebGL Shaders',
          body: 'Custom fragment shader generation and gravity fields that react dynamically to pointer coordinates.',
          metric: 'STABLE',
        },
      ],
      proofTitle: 'System Diagnostics',
      proofText:
        'The portfolio acts as a live holographic demo: it proves the ability to assemble premium visual graphics on top of a solid codebase.',
    },
    services: {
      sectionTag: 'OPERATIONAL MODULES // SEC.03',
      title: 'High-Fidelity Operations',
      subtitle: 'From custom WordPress engines to immersive React apps, every pixel is engineered for peak performance.',
      items: [
        {
          title: 'WordPress Core Engines',
          desc: 'Custom Gutenberg blocks, Elementor Pro architectures, and clean-code structures for easy management.',
        },
        {
          title: 'E-commerce WooCommerce',
          desc: 'High-speed online stores with optimized buy flows, responsive checkout sequences, and payment gateways.',
        },
        {
          title: '3D & Motion Platforms',
          desc: 'Three.js, GLSL shaders, GSAP timelines, and micro-interactions for brands requiring visual impact.',
        },
        {
          title: 'React / Next.js Frameworks',
          desc: 'Modern web applications with component-driven state management and optimized server-side rendering.',
        },
        {
          title: 'Performance & Audit Tuning',
          desc: 'Core Web Vitals acceleration, clean SEO markup, schema.org integration, and deep speed optimization.',
        },
        {
          title: 'AI Prototyping Systems',
          desc: 'Harnessing advanced AI workflows for rapid prototyping, cleaner code output, and optimal execution.',
        },
      ],
    },
    bento: {
      sectionTag: 'TECH COCKPIT // SEC.04',
      title: 'Performance Diagnostic Console',
      subtitle: 'The matrix of tools and technologies powering the visual and technical layout of our builds.',
      craftTitle: 'Visual Webcraft',
      craftText:
        'I design interfaces with rhythm, depth, responsive behavior, and fine micro-interactions that make the experience feel premium.',
      stackTitle: 'Tech Stack',
      locationTitle: 'Location',
      locationVal: 'Athens, Greece',
      statusTitle: 'STATUS',
      statusText: 'AVAILABLE_FOR_PROJECTS',
      speedTitle: 'PERFORMANCE',
      speedText: 'Target: 100/100 Core Web Vitals',
      aiTitle: 'AI_WORKFLOW',
      aiText: 'Iterating at the speed of thought.',
    },
    footer: {
      tagline: 'MASTERPIECE CORE V1 // Angelos Karampalasis',
    },
  },
};

type LanguageContextType = {
  locale: Locale;
  toggleLocale: () => void;
  t: TranslationType;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('el');

  useEffect(() => {
    const saved = window.localStorage.getItem('locale') as Locale | null;
    if (saved !== 'el' && saved !== 'en') return;
    const frame = window.requestAnimationFrame(() => setLocale(saved));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleLocale = () => {
    const next = locale === 'el' ? 'en' : 'el';
    setLocale(next);
    window.localStorage.setItem('locale', next);
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
