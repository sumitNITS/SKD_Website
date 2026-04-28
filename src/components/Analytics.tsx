import { useEffect } from 'react';

// Google Analytics 4 Measurement ID
const GA_MEASUREMENT_ID = 'G-HKDZH5DZ00';

type GtagCommand = 'config' | 'event' | 'js';

interface GtagArgs {
  page_path?: string;
  page_location?: string;
  page_title?: string;
  send_to?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
}

type GtagFunction = (command: GtagCommand | string, eventName: string, params?: GtagArgs) => void;

/**
 * Track a page view in Google Analytics
 * Call this when navigating to a new section/hash
 */
export const pageView = (path: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: GA_MEASUREMENT_ID,
  });
};

/**
 * Track a custom event in Google Analytics
 * @param action - Event action (e.g., 'click', 'download', 'schedule')
 * @param category - Event category (e.g., 'cta', 'social', 'contact')
 * @param label - Optional event label for additional context
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    send_to: GA_MEASUREMENT_ID,
  });
};

/**
 * React hook to track page views on hash changes
 * Since this is a single-page site, we track hash navigation as page views
 */
export const usePageTracking = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname + window.location.hash;
      pageView(path);
    };

    // Track initial page load
    handleRouteChange();

    // Track hash changes (section navigation)
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);
};

/**
 * Extend window type for gtag
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFunction;
  }
}
