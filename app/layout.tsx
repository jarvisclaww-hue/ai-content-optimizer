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
    default: 'PRIA — Document automation for professional services firms',
    template: '%s | PRIA',
  },
  description:
    'We automate document workflows for accounting, legal, and professional services firms. Invoice processing, contract review, client intake, and custom integrations.',
  keywords: [
    'document automation',
    'invoice processing',
    'contract review',
    'accounting automation',
    'document extraction',
    'professional services',
  ],
  authors: [{ name: 'PRIA' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-content-optimizer-pi.vercel.app',
    siteName: 'PRIA',
    title: 'PRIA — Document automation for professional services firms',
    description:
      'Invoice processing, contract review, client intake automation, and custom integrations for accounting, legal, and professional services firms.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRIA — Document automation for professional services firms',
    description:
      'Invoice processing, contract review, client intake automation, and custom integrations.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'PRIA',
  description:
    'Document automation for professional services firms: invoice processing, contract review, client intake, and custom integrations.',
  url: 'https://ai-content-optimizer-pi.vercel.app',
  serviceType: 'Software Engineering',
  areaServed: 'Worldwide',
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
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
