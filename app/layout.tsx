import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-content-optimizer-pi.vercel.app'),
  title: {
    default: 'PRIA — AI Development Services',
    template: '%s | PRIA',
  },
  description:
    'Professional AI development services: document intelligence, content optimization, and custom AI agent development. Fast delivery, production-ready code.',
  keywords: [
    'AI development',
    'AI integration',
    'document intelligence',
    'content optimization',
    'custom AI agents',
    'automation',
    'machine learning',
  ],
  authors: [{ name: 'PRIA' }],
  creator: 'PRIA',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-content-optimizer-pi.vercel.app',
    siteName: 'PRIA',
    title: 'PRIA — AI Development Services',
    description:
      'Professional AI development services: document intelligence, content optimization, and custom AI agent development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PRIA — AI Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRIA — AI Development Services',
    description:
      'Professional AI development services: document intelligence, content optimization, and custom AI agents.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'PRIA',
  description:
    'Professional AI development services including document intelligence, content optimization, and custom AI agent development.',
  url: 'https://ai-content-optimizer-pi.vercel.app',
  serviceType: 'AI Development Services',
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Content Optimizer',
          description: 'AI-powered content analysis and optimization for SEO and readability',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Document Intelligence API',
          description: 'Automated document processing, extraction, and classification',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom AI Development',
          description: 'Bespoke AI agents, integrations, and automation solutions',
        },
      },
    ],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
