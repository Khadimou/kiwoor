/**
 * Unified Analytics Helper for kiwoor
 * Supports: Google Analytics 4, Meta Pixel, Microsoft Clarity
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

interface AnalyticsParams {
  [key: string]: any;
}

/**
 * Track an event across all enabled analytics platforms
 * @param name - Event name (e.g., 'form_submit', 'cta_click')
 * @param params - Event parameters
 */
export function trackEvent(name: string, params?: AnalyticsParams): void {
  if (typeof window === 'undefined') return;

  // 1. Push to dataLayer (for GTM/GA4)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...params,
  });

  // 2. Google Analytics 4 (gtag)
  if (window.gtag) {
    window.gtag('event', name, params);
  }

  // 3. Meta Pixel (Facebook)
  if (window.fbq) {
    // Map common events to Facebook standard events
    const fbEventMap: { [key: string]: string } = {
      form_submit: 'Lead',
      form_start: 'InitiateCheckout',
      cta_click: 'Contact',
      variant_shown: 'PageView',
      conversion: 'Purchase',
    };

    const fbEvent = fbEventMap[name] || 'CustomEvent';
    window.fbq('track', fbEvent, params);
  }

  // 4. Microsoft Clarity
  if (window.clarity) {
    window.clarity('event', name, params);
  }

  // 5. GA4 Measurement Protocol (server-side)
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const measurementApiSecret = process.env.NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET;

  if (measurementId && measurementApiSecret) {
    // Get or generate client ID
    const clientId = getOrCreateClientId();

    // Send to GA4 Measurement Protocol
    fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${measurementApiSecret}`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        events: [{
          name: name,
          params: {
            ...params,
            session_id: getSessionId(),
            engagement_time_msec: 100,
          }
        }]
      })
    }).catch(err => console.warn('GA4 Measurement Protocol error:', err));
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Analytics Event: ${name}`, params);
  }
}

/**
 * Initialize analytics scripts based on environment variables
 * Call this once in layout.tsx
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  // Google Analytics 4
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && !window.gtag) {
    // gtag function
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      page_path: window.location.pathname,
      send_page_view: true,
    });

    console.log('✅ Google Analytics initialized:', gaId);
  }

  // Meta Pixel (Facebook)
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (metaPixelId && !window.fbq) {
    window.fbq = function() {
      (window.fbq as any).callMethod ?
        (window.fbq as any).callMethod.apply(window.fbq, arguments) :
        (window.fbq as any).queue.push(arguments);
    };
    (window.fbq as any).push = window.fbq;
    (window.fbq as any).loaded = true;
    (window.fbq as any).version = '2.0';
    (window.fbq as any).queue = [];

    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');

    console.log('✅ Meta Pixel initialized:', metaPixelId);
  }

  // Microsoft Clarity
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (clarityId && !(window as any).clarity) {
    console.log('✅ Microsoft Clarity initialized:', clarityId);
  }

  // Log analytics status
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Status:', {
      GA4: !!gaId,
      MetaPixel: !!metaPixelId,
      Clarity: !!clarityId,
    });
  }
}

/**
 * Get or create a client ID for GA4
 */
function getOrCreateClientId(): string {
  if (typeof window === 'undefined') return 'unknown';

  const key = '_ga_client_id';
  let clientId = localStorage.getItem(key);

  if (!clientId) {
    clientId = `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(key, clientId);
  }

  return clientId;
}

/**
 * Get or create a session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'unknown';

  const key = '_ga_session_id';
  const now = Date.now();
  const stored = sessionStorage.getItem(key);

  if (stored) {
    const [sessionId, timestamp] = stored.split('|');
    // Session expires after 30 minutes
    if (now - parseInt(timestamp) < 30 * 60 * 1000) {
      return sessionId;
    }
  }

  const sessionId = `${now}.${Math.random().toString(36).substring(2, 15)}`;
  sessionStorage.setItem(key, `${sessionId}|${now}`);
  return sessionId;
}

/**
 * Track page view
 * @param url - Page URL
 */
export function trackPageView(url: string): void {
  trackEvent('page_view', {
    page_path: url,
    page_title: document.title,
  });
}

/**
 * Track conversion with value
 * @param value - Conversion value
 * @param currency - Currency code (default: EUR)
 */
export function trackConversion(value: number, currency: string = 'EUR'): void {
  trackEvent('conversion', {
    value,
    currency,
  });

  // Meta Pixel specific conversion
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value,
      currency,
    });
  }
}

/**
 * Identify user (for CRM integration)
 * @param userId - User ID
 * @param traits - User traits (email, name, etc.)
 */
export function identifyUser(userId: string, traits?: AnalyticsParams): void {
  if (typeof window === 'undefined') return;

  // GA4 User ID
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      user_id: userId,
    });
  }

  // Clarity User ID
  if (window.clarity) {
    window.clarity('identify', userId, undefined, undefined, traits?.name);
  }

  trackEvent('user_identified', {
    user_id: userId,
    ...traits,
  });
}

/**
 * Get analytics script tags for server-side rendering
 */
export function getAnalyticsScripts(): {
  ga4?: string;
  metaPixel?: string;
  clarity?: string;
} {
  const scripts: any = {};

  // Google Analytics 4
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId) {
    scripts.ga4 = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  }

  // Meta Pixel
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (metaPixelId) {
    scripts.metaPixel = metaPixelId;
  }

  // Microsoft Clarity
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (clarityId) {
    scripts.clarity = clarityId;
  }

  return scripts;
}

