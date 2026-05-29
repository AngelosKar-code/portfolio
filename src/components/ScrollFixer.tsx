'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Extra safety net for scroll-to-top on reload/navigation.
 * The primary fix is the inline <script> in layout.tsx <head>.
 * This component handles edge cases and route changes.
 */
export default function ScrollFixer() {
  const pathname = usePathname();

  // On every route change → scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // On mount: force scroll + disable browser restoration + beforeunload trick
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Before the page unloads (refresh/navigate away), force scroll to 0
    // so the browser has nothing to restore
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}
