import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

const DEFAULT_TITLE = 'Sumit Kumar Das | DevOps Engineer | Cloud Infrastructure Expert';
const DEFAULT_DESCRIPTION =
  'Sumit Kumar Das is a results-driven DevOps Engineer with 5+ years of experience in Kubernetes, AWS, CI/CD automation, and Infrastructure as Code. Based in Assam, India.';
const ROUTE_METADATA = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/resume': {
    title: 'Resume | Sumit Kumar Das | DevOps Engineer',
    description:
      'Preview and download the resume of Sumit Kumar Das, a DevOps Engineer specializing in Kubernetes, AWS, CI/CD automation, and Infrastructure as Code.',
  },
} as const;

const updateMetaTag = (selector: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
};

const updateCanonical = (href: string) => {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = href;
};

const updateStructuredData = (origin: string) => {
  const schema = document.getElementById('person-schema');
  if (!schema) return;

  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sumit Kumar Das',
    jobTitle: 'DevOps Engineer',
    description: DEFAULT_DESCRIPTION,
    url: `${origin}/`,
    image: `${origin}/images/hero-profile.png`,
    email: 'mailto:krsumit449@gmail.com',
    telephone: '+918638202113',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Assam',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'NIT Silchar',
    },
    knowsAbout: [
      'Kubernetes',
      'Docker',
      'AWS',
      'Terraform',
      'CI/CD',
      'DevOps',
      'Cloud Infrastructure',
      'Site Reliability Engineering',
    ],
    sameAs: [
      'https://www.linkedin.com/in/sumit-kumar-das-87a599158',
      'https://github.com/sumitNITS',
    ],
  });
};

const updatePageMetadata = (pathname: string) => {
  const metadata = ROUTE_METADATA[pathname as keyof typeof ROUTE_METADATA] ?? ROUTE_METADATA['/'];
  const origin = window.location.origin;
  const url = `${origin}${window.location.pathname}${window.location.search}`;
  const imageUrl = `${origin}/images/hero-profile.png`;

  document.title = metadata.title;
  updateMetaTag('meta[name="title"]', metadata.title);
  updateMetaTag('meta[name="description"]', metadata.description);
  updateMetaTag('meta[property="og:title"]', metadata.title);
  updateMetaTag('meta[property="og:description"]', metadata.description);
  updateMetaTag('meta[property="og:url"]', url);
  updateMetaTag('meta[property="og:image"]', imageUrl);
  updateMetaTag('meta[property="twitter:title"]', metadata.title);
  updateMetaTag('meta[property="twitter:description"]', metadata.description);
  updateMetaTag('meta[property="twitter:url"]', url);
  updateMetaTag('meta[property="twitter:image"]', imageUrl);
  updateCanonical(url);
  updateStructuredData(origin);
};

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
 * React hook to track page views across route and hash changes
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    updatePageMetadata(location.pathname);
    const path = `${location.pathname}${location.search}${location.hash}`;
    pageView(path);
  }, [location.hash, location.pathname, location.search]);
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
