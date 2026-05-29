'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'el' | 'en';

type TranslationType = {
  nav: {
    home: string;
    services: string;
    skills: string;
    hireMe: string;
  };
  hero: {
    badge: string;
    name: string;
    subtitle: string;
    scroll: string;
    skip: string;
    contactMail: string;
    contactFb: string;
  };
  code: {
    sectionTag: string;
    title: string;
    subtitle: string;
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
    s5Title: string;
    s5Desc: string;
    s6Title: string;
    s6Desc: string;
  };
  bento: {
    sectionTag: string;
    title: string;
    subtitle: string;
    cardTech: string;
    cardLocation: string;
    locationVal: string;
    cardStatus: string;
    statusText: string;
    cardSpeed: string;
    speedText: string;
    cardAI: string;
    aiText: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    copied: string;
    copy: string;
  };
};

const translations: Record<Locale, TranslationType> = {
  el: {
    nav: {
      home: 'Αρχική',
      services: 'Υπηρεσίες',
      skills: 'Δεξιότητες',
      hireMe: 'Επικοινωνία',
    },
    hero: {
      badge: 'Web Developer & Designer',
      name: 'Angelos Karampalasis',
      subtitle: 'Σχεδιάζω και κατασκευάζω σύγχρονες, γρήγορες ιστοσελίδες που εντυπωσιάζουν. WordPress, custom θέματα, e-shops και web εφαρμογές.',
      scroll: 'Scroll για περισσότερα',
      skip: 'Παράλειψη',
      contactMail: 'Στείλε μου Email',
      contactFb: 'Facebook',
    },
    code: {
      sectionTag: 'Live Code Preview',
      title: 'Κώδικας που ζωντανεύει',
      subtitle: 'Κάθε project ξεκινά με καθαρό, οργανωμένο κώδικα. Από custom WordPress θέματα μέχρι σύγχρονες React εφαρμογές.',
    },
    services: {
      sectionTag: 'Τι Προσφέρω',
      title: 'Υπηρεσίες Web Development',
      subtitle: 'Ολοκληρωμένες λύσεις για την online παρουσία σου.',
      s1Title: 'WordPress Development',
      s1Desc: 'Custom θέματα, plugins, Gutenberg blocks και πλήρης παραμετροποίηση.',
      s2Title: 'E-Commerce & WooCommerce',
      s2Desc: 'Ηλεκτρονικά καταστήματα με πληρωμές, αποστολές και διαχείριση προϊόντων.',
      s3Title: 'Speed & SEO Optimization',
      s3Desc: 'Βελτιστοποίηση ταχύτητας για 100/100 PageSpeed και κορυφαία SEO κατάταξη.',
      s4Title: 'Modern Web Apps (React/Next.js)',
      s4Desc: 'Single Page Applications με React, Next.js, Vue.js και Tailwind CSS.',
      s5Title: 'AI Vibe Coding',
      s5Desc: 'Αξιοποίηση AI εργαλείων για ταχύτερη ανάπτυξη και έξυπνες λύσεις.',
      s6Title: 'UI/UX & Responsive Design',
      s6Desc: 'Σχεδιασμός που λειτουργεί τέλεια σε κάθε συσκευή με premium αισθητική.',
    },
    bento: {
      sectionTag: 'Τεχνολογίες & Info',
      title: 'Εργαλεία & Δεξιότητες',
      subtitle: 'Οι τεχνολογίες που χρησιμοποιώ καθημερινά.',
      cardTech: 'Tech Stack',
      cardLocation: 'Τοποθεσία',
      locationVal: 'Ελλάδα',
      cardStatus: 'Κατάσταση',
      statusText: 'Διαθέσιμος για νέα projects',
      cardSpeed: 'Ταχύτητα',
      speedText: '100/100 PageSpeed Score',
      cardAI: 'AI-Powered',
      aiText: 'Χρήση AI για ταχύτερο development',
    },
    contact: {
      sectionTag: 'Επικοινωνία',
      title: 'Ας Συνεργαστούμε',
      subtitle: 'Έτοιμος για το επόμενο project σου. Στείλε μου μήνυμα!',
      emailLabel: 'Email',
      copied: 'Αντιγράφηκε!',
      copy: 'Αντιγραφή',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      skills: 'Skills',
      hireMe: 'Contact',
    },
    hero: {
      badge: 'Web Developer & Designer',
      name: 'Angelos Karampalasis',
      subtitle: 'I design and build modern, fast websites that impress. WordPress, custom themes, e-shops, and web applications.',
      scroll: 'Scroll for more',
      skip: 'Skip',
      contactMail: 'Send me an Email',
      contactFb: 'Facebook',
    },
    code: {
      sectionTag: 'Live Code Preview',
      title: 'Code that comes alive',
      subtitle: 'Every project starts with clean, organized code. From custom WordPress themes to modern React applications.',
    },
    services: {
      sectionTag: 'What I Offer',
      title: 'Web Development Services',
      subtitle: 'Complete solutions for your online presence.',
      s1Title: 'WordPress Development',
      s1Desc: 'Custom themes, plugins, Gutenberg blocks, and full customization.',
      s2Title: 'E-Commerce & WooCommerce',
      s2Desc: 'Online stores with payments, shipping, and product management.',
      s3Title: 'Speed & SEO Optimization',
      s3Desc: 'Speed optimization for 100/100 PageSpeed and top SEO ranking.',
      s4Title: 'Modern Web Apps (React/Next.js)',
      s4Desc: 'Single Page Applications with React, Next.js, Vue.js, and Tailwind CSS.',
      s5Title: 'AI Vibe Coding',
      s5Desc: 'Leveraging AI tools for faster development and smart solutions.',
      s6Title: 'UI/UX & Responsive Design',
      s6Desc: 'Design that works perfectly on every device with premium aesthetics.',
    },
    bento: {
      sectionTag: 'Technologies & Info',
      title: 'Tools & Skills',
      subtitle: 'The technologies I use daily.',
      cardTech: 'Tech Stack',
      cardLocation: 'Location',
      locationVal: 'Greece',
      cardStatus: 'Status',
      statusText: 'Available for new projects',
      cardSpeed: 'Speed',
      speedText: '100/100 PageSpeed Score',
      cardAI: 'AI-Powered',
      aiText: 'Using AI for faster development',
    },
    contact: {
      sectionTag: 'Contact',
      title: 'Let\'s Work Together',
      subtitle: 'Ready for your next project. Send me a message!',
      emailLabel: 'Email',
      copied: 'Copied!',
      copy: 'Copy',
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
    const saved = localStorage.getItem('locale') as Locale;
    if (saved === 'el' || saved === 'en') setLocale(saved);
  }, []);

  const toggleLocale = () => {
    const next = locale === 'el' ? 'en' : 'el';
    setLocale(next);
    localStorage.setItem('locale', next);
  };

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
