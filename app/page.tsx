import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle,
  Clock,
  Code,
  FileSearch,
  MessageSquare,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI Content Optimizer',
    description:
      'Improve readability, SEO performance, and engagement with AI-powered content analysis. Supports tone adjustment, grammar correction, and keyword optimization.',
    features: [
      'Real-time content scoring',
      'SEO keyword analysis',
      'Multi-tone optimization',
      'Grammar & style fixes',
    ],
    badge: 'Live Demo',
    badgeVariant: 'default' as const,
    demoUrl: '/optimizer',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    pricing: 'From $499',
  },
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: 'Document Intelligence API',
    description:
      'Automate document processing at scale. Extract text, classify documents, recognize entities, and output structured data from PDFs, Word docs, and images.',
    features: [
      'PDF / image OCR',
      'Entity recognition',
      'Batch job processing',
      'RESTful API + webhooks',
    ],
    badge: 'API',
    badgeVariant: 'secondary' as const,
    demoUrl: 'https://document-intelligence-api-production.up.railway.app',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    pricing: 'From $999',
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: 'Custom AI Development',
    description:
      'End-to-end AI agent and automation solutions built around your workflow. From LLM integrations to multi-step autonomous pipelines — we design and ship it.',
    features: [
      'Custom AI agents',
      'LLM API integrations',
      'Workflow automation',
      'Ongoing support',
    ],
    badge: 'Enterprise',
    badgeVariant: 'outline' as const,
    demoUrl: '#contact',
    color: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    pricing: 'From $2,499',
  },
];

const process = [
  {
    step: '01',
    icon: <MessageSquare className="h-5 w-5" />,
    title: 'Discovery Call',
    description: 'We map your requirements, constraints, and success criteria in a 30-min session.',
  },
  {
    step: '02',
    icon: <Code className="h-5 w-5" />,
    title: 'Proposal & Scoping',
    description:
      'You receive a detailed spec, timeline, and fixed or hourly quote within 24 hours.',
  },
  {
    step: '03',
    icon: <Zap className="h-5 w-5" />,
    title: 'Development',
    description:
      'Iterative builds with progress updates. Production-ready code, tested and documented.',
  },
  {
    step: '04',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Delivery & Support',
    description: 'Full handover with deployment support, documentation, and optional maintenance.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$499',
    description: 'Single feature or integration',
    features: [
      'AI chatbot integration',
      'One API integration',
      'Up to 20 hours work',
      '7-day delivery',
      '1 revision round',
      'Documentation included',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$999',
    description: 'Full feature or automation flow',
    features: [
      'Custom automation script',
      'Multi-step AI pipeline',
      'Up to 40 hours work',
      '14-day delivery',
      '2 revision rounds',
      'Full documentation',
      'Deployment support',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$2,499+',
    description: 'Full AI agent or product build',
    features: [
      'Full AI agent development',
      'Custom architecture & design',
      'Unlimited scope definition',
      'Milestone-based delivery',
      'Unlimited revisions',
      'Full documentation',
      '30-day support included',
    ],
    cta: 'Get a Quote',
    highlight: false,
  },
];

const testimonials = [
  {
    quote:
      'Delivered a fully functional document processing pipeline in under two weeks. Clean code, great communication.',
    author: 'Sarah K.',
    role: 'CTO, FinTech Startup',
    rating: 5,
  },
  {
    quote:
      'Our content workflow is 3× faster since integrating the AI optimizer. Exactly what we needed.',
    author: 'Marcus T.',
    role: 'Head of Content, SaaS Company',
    rating: 5,
  },
  {
    quote: 'Turned our manual review process into an automated API. Saved us 20+ hours per week.',
    author: 'Priya R.',
    role: 'Operations Lead, Legal Tech',
    rating: 5,
  },
];

const trustSignals = [
  { icon: <Shield className="h-4 w-4" />, label: 'Production-grade code' },
  { icon: <CheckCircle className="h-4 w-4" />, label: '95%+ test coverage' },
  { icon: <TrendingUp className="h-4 w-4" />, label: '99.9% uptime SLA' },
  { icon: <Clock className="h-4 w-4" />, label: 'Fast turnaround' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight">PRIA</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                href="#services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="#portfolio"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
            <Link href="#contact">
              <Button size="sm" className="gap-2">
                Get a Quote
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
            AI Development Services
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Build smarter software
            <span className="text-primary block">with AI.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            We design and ship production-ready AI integrations, document processing pipelines, and
            custom agents — fast, clean, and built to scale.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="#contact">
              <Button size="lg" className="gap-2 px-8">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#portfolio">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                View Portfolio
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {trustSignals.map((signal, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">{signal.icon}</span>
                {signal.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What we build</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three core AI services — each one deployable as a standalone product or integrated
              into your existing stack.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card
                key={i}
                className={`relative overflow-hidden bg-gradient-to-br ${service.color} border-0 shadow-sm hover:shadow-md transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-lg ${service.iconBg}`}>
                      <span className={service.iconColor}>{service.icon}</span>
                    </div>
                    <Badge variant={service.badgeVariant} className="text-xs">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{service.pricing}</span>
                    <Link
                      href={service.demoUrl}
                      target={service.demoUrl.startsWith('http') ? '_blank' : undefined}
                      rel={service.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                        {service.demoUrl === '#contact' ? 'Get a Quote' : 'Try Demo'}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Live portfolio</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Both products are deployed and running. Try them now.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>AI Content Optimizer</CardTitle>
                    <CardDescription>Next.js · TypeScript · OpenRouter AI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-5">
                  Paste any text and get instant AI analysis: readability score, SEO suggestions,
                  tone adjustment, and grammar fixes. Powered by DeepSeek via OpenRouter.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Next.js 16', 'React 19', 'Tailwind v4', 'shadcn/ui', 'OpenRouter API'].map(
                    t => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    )
                  )}
                </div>
                <Link href="/optimizer">
                  <Button className="w-full gap-2">
                    Open Demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <FileSearch className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle>Document Intelligence API</CardTitle>
                    <CardDescription>Node.js · Express · Prisma · PostgreSQL</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-5">
                  Production REST API for document upload, OCR, entity extraction, and
                  classification. JWT-authenticated, rate-limited, with async job queue.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Railway'].map(t => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://document-intelligence-api-production.up.railway.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full gap-2">
                    View API Docs
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From first message to shipped product in days, not months.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-border" />
                )}
                <Card className="text-center p-6 hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-muted-foreground/20 mb-3">
                    {step.step}
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{step.icon}</div>
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Fixed-price packages for common scopes. Custom quotes for anything larger.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {pricing.map((plan, i) => (
              <Card
                key={i}
                className={`flex flex-col ${plan.highlight ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}
              >
                {plan.highlight && (
                  <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1.5 rounded-t-lg -mt-px -mx-px">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold mt-1">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact">
                    <Button variant={plan.highlight ? 'default' : 'outline'} className="w-full">
                      {plan.highlight ? 'Get Started' : plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Prefer hourly? We bill at $75–150/hr depending on complexity. 50% deposit, 50% on
            delivery.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-5 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-sm">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Start a project</h2>
            <p className="text-muted-foreground text-lg">
              Tell us what you&apos;re building. We&apos;ll reply within 24 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-bold">PRIA</span>
              <span className="text-muted-foreground text-sm">— AI Development Services</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/optimizer" className="hover:text-foreground transition-colors">
                Content Optimizer
              </Link>
              <a
                href="https://document-intelligence-api-production.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Doc Intel API
              </a>
              <Link href="#contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PRIA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
