'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, trackPageView } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();

  // Initialize analytics once
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (pathname && typeof window !== 'undefined') {
      const url = window.location.search
        ? `${pathname}${window.location.search}`
        : pathname;
      
      trackPageView(url);
    }
  }, [pathname]);

  return null;
}

