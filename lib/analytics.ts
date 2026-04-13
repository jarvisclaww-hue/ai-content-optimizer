declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return;
  window.gtag('config', gaId, { page_path: url });
}

export function trackServiceClick(serviceName: string) {
  trackEvent('service_click', 'engagement', serviceName);
}

export function trackFormSubmission(formName: string) {
  trackEvent('form_submit', 'lead_generation', formName);
}

export function trackDemoClick(demoName: string) {
  trackEvent('demo_click', 'portfolio', demoName);
}
