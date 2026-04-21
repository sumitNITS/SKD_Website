import { useEffect } from 'react';

// Google Analytics 4 tracking
const GA_MEASUREMENT_ID = 'G-HKDZH5DZ00'; // Replace with your actual GA4 ID

export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Check if user has consented to analytics
  const hasConsent = localStorage.getItem('analytics-consent');
  if (hasConsent !== 'granted') return;

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
};

export const pageView = (path: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
  });
};

// Hook to track page views on route change
export const usePageTracking = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      pageView(window.location.pathname + window.location.hash);
    };

    // Track initial page
    handleRouteChange();

    // Track on hash changes (since this is a single-page site)
    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);
};

// Extend window type for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
