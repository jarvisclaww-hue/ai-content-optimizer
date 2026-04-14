export const PLANS = [
  {
    id: 'FREE' as const,
    name: 'Free',
    price: 0,
    priceId: null,
    documentsPerMonth: 10,
    maxFileSizeMB: 10,
    apiKeys: 1,
    features: [
      '10 documents per month',
      'PDF, DOCX, and image support',
      'Entity extraction',
      'Text summarisation',
      'JSON export',
    ],
  },
  {
    id: 'PRO' as const,
    name: 'Pro',
    price: 49,
    priceId: process.env.STRIPE_PRO_PRICE_ID || null,
    documentsPerMonth: 500,
    maxFileSizeMB: 50,
    apiKeys: 5,
    popular: true,
    features: [
      '500 documents per month',
      'All file formats',
      'Entity extraction with scores',
      'JSON and CSV export',
      '5 API keys',
      'Webhook notifications',
      'Email support',
    ],
  },
  {
    id: 'BUSINESS' as const,
    name: 'Business',
    price: 149,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || null,
    documentsPerMonth: -1,
    maxFileSizeMB: 100,
    apiKeys: -1,
    features: [
      'Unlimited documents',
      'All file formats',
      'Advanced entity extraction',
      'JSON, CSV, and batch export',
      'Unlimited API keys',
      'Webhook notifications',
      'Dedicated support',
      'SLA guarantee',
    ],
  },
];

export type PlanId = 'FREE' | 'PRO' | 'BUSINESS';
export type Plan = (typeof PLANS)[number];
