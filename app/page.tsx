import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Code2,
  FileText,
  Layers,
  MessageSquare,
  Rocket,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Content Optimization',
    description:
      'Analyse any block of text for readability, keyword density, tone, and grammar. Get a rewritten version tuned to your goals — SEO, clarity, or audience fit.',
    features: [
      'Readability & SEO scoring',
      'Tone and grammar analysis',
      'One-click rewrite with goal selection',
      'Markdown / HTML export',
    ],
    badge: 'Live Demo',
    demoUrl: '/optimizer',
    gradient: 'from-slate-500/10 to-zinc-500/10',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-700 dark:text-slate-300',
    pricing: 'From $499',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Document Intelligence',
    description:
      'Upload PDFs, Word docs, or images. Get extracted text, recognised entities, and a structured summary via a simple REST API — no manual review needed.',
    features: [
      'PDF / DOCX / image OCR',
      'Named-entity extraction',
      'Async processing & webhooks',
      'Multi-tenant API with JWT auth',
    ],
    badge: 'API',
    demoUrl: '/documents',
    gradient: 'from-zinc-500/10 to-stone-500/10',
    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
    iconColor: 'text-zinc-700 dark:text-zinc-300',
    pricing: 'From $999',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Custom Development',
    description:
      'Bespoke integrations, internal tools, and automation pipelines scoped to your stack. We handle architecture, implementation, deployment, and hand-off.',
    features: [
      'LLM & API integrations',
      'Workflow automation',
      'Internal tool builds',
      'Ongoing maintenance',
    ],
    badge: 'Custom',
    demoUrl: '#contact',
    gradient: 'from-stone-500/10 to-neutral-500/10',
    iconBg: 'bg-stone-100 dark:bg-stone-800',
    iconColor: 'text-stone-700 dark:text-stone-300',
    pricing: 'From $2,499',
  },
];

const steps = [
  {
    step: '1',
    icon: <MessageSquare className="h-4 w-4" />,
    title: 'Brief',
    description: 'Share what you need. We scope it in a 30-minute call.',
  },
  {
    step: '2',
    icon: <FileText className="h-4 w-4" />,
    title: 'Proposal',
    description: 'Fixed-price or hourly quote within 24 hours.',
  },
  {
    step: '3',
    icon: <Zap className="h-4 w-4" />,
    title: 'Build',
    description: 'Iterative development with weekly progress updates.',
  },
  {
    step: '4',
    icon: <Rocket className="h-4 w-4" />,
    title: 'Ship',
    description: 'Deployed, documented, and handed over with support.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$499',
    scope: 'Single integration or feature',
    items: [
      'One API or tool integration',
      'Up to 20 dev hours',
      '7-day delivery',
      'Documentation',
      '1 revision round',
    ],
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$999',
    scope: 'Multi-step automation or pipeline',
    items: [
      'Full processing pipeline',
      'Up to 40 dev hours',
      '14-day delivery',
      'Deployment support',
      '2 revision rounds',
      'Full documentation',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$2,499+',
    scope: 'End-to-end product build',
    items: [
      'Architecture & design',
      'Unlimited scoping',
      'Milestone delivery',
      'Unlimited revisions',
      '30-day post-launch support',
      'Full docs & hand-off',
    ],
    highlight: false,
  },
];

const reviews = [
  {
    text: 'Delivered a working document pipeline in ten days. Clean code, no hand-holding required.',
    name: 'Sarah K.',
    title: 'CTO, FinTech Startup',
    stars: 5,
  },
  {
    text: 'Our content review process went from hours to minutes. Exactly the scope we asked for.',
    name: 'Marcus T.',
    title: 'Head of Content, SaaS Co.',
    stars: 5,
  },
  {
    text: 'Turned our manual intake process into a single API call. Saves us 20+ hours a week.',
    name: 'Priya R.',
    title: 'Ops Lead, Legal Tech',
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-base font-semibold tracking-tight">PRIA</span>
          <div className="hidden items-center gap-5 text-[13px] font-medium text-muted-foreground sm:flex">
            <Link href="#services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="#work" className="hover:text-foreground transition-colors">
              Work
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <Link href="#contact">
            <Button size="sm" variant="default">
              Get in touch
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl leading-[1.15]">
            Software engineering
            <br />
            for teams that use AI.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">
            We build document processing APIs, content analysis tools, and custom integrations.
            Production code, shipped fast, with proper tests and documentation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#contact">
              <Button size="lg">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#work">
              <Button size="lg" variant="outline">
                See our work
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Production-grade code
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" /> Tested & documented
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Fast turnaround
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" /> 99.9% uptime SLA
            </span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-3">What we build</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto text-[15px]">
            Three focused services. Each can run standalone or plug into your existing
            infrastructure.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {services.map((s, i) => (
              <Card key={i} className={`bg-gradient-to-br ${s.gradient} border-0 shadow-sm`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-md p-2 ${s.iconBg}`}>
                      <span className={s.iconColor}>{s.icon}</span>
                    </div>
                    <Badge variant="secondary" className="text-[11px]">
                      {s.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{s.title}</CardTitle>
                  <CardDescription className="text-[13px] leading-relaxed">
                    {s.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-5 space-y-1.5">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-[13px]">
                        <CheckCircle className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.pricing}</span>
                    <Link
                      href={s.demoUrl}
                      target={s.demoUrl.startsWith('http') ? '_blank' : undefined}
                      rel={s.demoUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        {s.demoUrl === '#contact' ? 'Enquire' : 'Try it'}
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
      <section id="work" className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-3">Live work</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto text-[15px]">
            Two deployed products you can try right now.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Content Optimizer */}
            <Card className="overflow-hidden">
              <div className="h-1 bg-foreground/10" />
              <CardHeader>
                <CardTitle className="text-lg">Content Optimizer</CardTitle>
                <CardDescription>
                  Next.js &middot; TypeScript &middot; DeepSeek via OpenRouter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                  Paste text, get scored on readability, SEO, tone, and grammar. Click optimise to
                  get a rewritten version matching your goals.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Next.js 16', 'React 19', 'Tailwind v4', 'shadcn/ui', 'OpenRouter'].map(t => (
                    <Badge key={t} variant="secondary" className="text-[11px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Link href="/optimizer">
                  <Button className="w-full" size="sm">
                    Open demo
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Doc Intel */}
            <Card className="overflow-hidden">
              <div className="h-1 bg-foreground/10" />
              <CardHeader>
                <CardTitle className="text-lg">Document Intelligence</CardTitle>
                <CardDescription>
                  Entity extraction &middot; Text analysis &middot; Structured output
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                  Drop a document, get structured data back. Extracts text, recognises people,
                  organisations, dates, and money amounts. Try it with the interactive demo.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tesseract.js'].map(t => (
                    <Badge key={t} variant="secondary" className="text-[11px]">
                      {t}
                    </Badge>
                  ))}
                </div>
                <Link href="/documents">
                  <Button variant="outline" className="w-full" size="sm">
                    Try demo
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-12">How we work</h2>
          <div className="grid gap-5 sm:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {s.step}
                </div>
                <h3 className="font-medium text-sm mb-1">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-3">Pricing</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto text-[15px]">
            Fixed-price packages for common scopes. Hourly ($75–150) available for everything else.
          </p>
          <div className="grid gap-5 sm:grid-cols-3 items-stretch">
            {pricing.map((p, i) => (
              <Card
                key={i}
                className={`flex flex-col ${p.highlight ? 'border-foreground/20 shadow-md' : ''}`}
              >
                {p.highlight && (
                  <div className="bg-foreground text-background text-[11px] font-medium text-center py-1 -mt-px -mx-px rounded-t-lg">
                    Recommended
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <div className="text-2xl font-semibold">{p.price}</div>
                  <CardDescription className="text-[13px]">{p.scope}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="flex-1 space-y-2 mb-6">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-[13px]">
                        <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact">
                    <Button
                      variant={p.highlight ? 'default' : 'outline'}
                      className="w-full"
                      size="sm"
                    >
                      Get started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-[13px] text-muted-foreground mt-6">
            All packages: 50 % upfront, 50 % on delivery. No hidden fees.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-12">Client feedback</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <Card key={i} className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current text-foreground/60" />
                  ))}
                </div>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[12px] text-muted-foreground">{r.title}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-semibold text-center mb-2">Start a project</h2>
          <p className="text-center text-muted-foreground mb-10 text-[15px]">
            Describe what you need. We reply within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-sm font-medium">PRIA</span>
          <div className="flex gap-5 text-[13px] text-muted-foreground">
            <Link href="/optimizer" className="hover:text-foreground transition-colors">
              Content Optimizer
            </Link>
            <Link href="/documents" className="hover:text-foreground transition-colors">
              Doc Intel
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <span className="text-[12px] text-muted-foreground">
            &copy; {new Date().getFullYear()} PRIA
          </span>
        </div>
      </footer>
    </div>
  );
}
