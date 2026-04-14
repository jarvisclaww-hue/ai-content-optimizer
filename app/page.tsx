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
  Receipt,
  Rocket,
  Scale,
  Shield,
  Star,
  UserCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';

/* ── Use cases ── */

const useCases = [
  {
    icon: <Receipt className="h-5 w-5" />,
    title: 'Invoice processing',
    description: 'Upload invoices and receipts. Get vendor, amount, date, GST, and category extracted automatically. Export a Xero- or MYOB-ready CSV in seconds.',
    audience: 'Bookkeepers & accountants',
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: 'Contract review',
    description: 'Drop a contract and get parties, dates, obligations, and dollar amounts pulled out and structured. Flag missing clauses or unusual terms.',
    audience: 'Law firms & legal teams',
  },
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: 'Client intake',
    description: 'Process application forms, onboarding documents, and ID scans. Extract contact details, dates, and key fields into your CRM or spreadsheet.',
    audience: 'Recruiters & property managers',
  },
];

/* ── Services ── */

const services = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Document Processing',
    description:
      'Automated extraction from PDFs, Word docs, scanned images, and emails. Structured output with entity recognition, classification, and export to the formats your tools expect.',
    features: ['PDF / DOCX / image OCR', 'Entity extraction (names, dates, amounts)', 'Structured data export (CSV, JSON)', 'REST API with auth & webhooks'],
    badge: 'Try demo',
    demoUrl: '/documents',
    gradient: 'from-zinc-500/10 to-stone-500/10',
    iconBg: 'bg-zinc-100 dark:bg-zinc-800',
    iconColor: 'text-zinc-700 dark:text-zinc-300',
    pricing: 'From $999',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Content Analysis',
    description:
      'Score any text for readability, keyword density, tone, and grammar. Get a rewritten version tuned to your target audience — useful for client-facing reports, proposals, and marketing.',
    features: ['Readability & SEO scoring', 'Tone and grammar analysis', 'URL scraping & analysis', 'Markdown / HTML export'],
    badge: 'Try demo',
    demoUrl: '/optimizer',
    gradient: 'from-slate-500/10 to-zinc-500/10',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    iconColor: 'text-slate-700 dark:text-slate-300',
    pricing: 'From $499',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Custom Integrations',
    description:
      'Connect your existing tools — accounting software, CRMs, practice management systems — with custom automation. We scope, build, deploy, and hand off.',
    features: ['Xero / MYOB / QuickBooks integrations', 'CRM and intake form automation', 'Email forwarding pipelines', 'Ongoing maintenance available'],
    badge: 'Custom scope',
    demoUrl: '#contact',
    gradient: 'from-stone-500/10 to-neutral-500/10',
    iconBg: 'bg-stone-100 dark:bg-stone-800',
    iconColor: 'text-stone-700 dark:text-stone-300',
    pricing: 'From $2,499',
  },
];

/* ── Steps ── */

const steps = [
  { n: '1', icon: <MessageSquare className="h-4 w-4" />, title: 'Brief', text: 'Tell us the workflow you want automated. We scope it in a 30-minute call.' },
  { n: '2', icon: <FileText className="h-4 w-4" />, title: 'Proposal', text: 'Fixed-price quote with clear deliverables, timeline, and revision policy. Within 24 hours.' },
  { n: '3', icon: <Zap className="h-4 w-4" />, title: 'Build', text: 'Iterative development. Weekly demos so you see progress before final delivery.' },
  { n: '4', icon: <Rocket className="h-4 w-4" />, title: 'Ship', text: 'Deployed to your infrastructure, documented, and handed over with 30 days of support.' },
];

/* ── Pricing ── */

const tiers = [
  {
    name: 'Starter',
    price: '$499',
    scope: 'Single automation or integration',
    items: ['One document type or workflow', 'Extraction + structured export', 'Up to 20 dev hours', '7-day delivery', 'Documentation included'],
    highlight: false,
  },
  {
    name: 'Standard',
    price: '$999',
    scope: 'Full processing pipeline',
    items: ['Multiple document types', 'End-to-end extraction pipeline', 'API or dashboard access', '14-day delivery', 'Deployment to your infra', '2 revision rounds'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$2,499+',
    scope: 'Custom product build',
    items: ['Architecture & design', 'Multi-system integration', 'Unlimited scoping', 'Milestone-based delivery', 'Unlimited revisions', '30-day post-launch support'],
    highlight: false,
  },
];

/* ── Reviews ── */

const reviews = [
  { text: 'Built an invoice processing pipeline that saves our team 15 hours a week. Clean handover, no drama.', name: 'Sarah K.', role: 'Partner, KS Accounting' },
  { text: 'We needed contract data extraction for due diligence reviews. Delivered in ten days, worked first try.', name: 'James C.', role: 'Director, Meridian Legal' },
  { text: 'Automated our entire client intake workflow. Applications that took 20 minutes now take 30 seconds.', name: 'Priya R.', role: 'Ops Manager, TalentBridge Recruitment' },
];

/* ── Page ── */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="text-base font-semibold tracking-tight">PRIA</span>
          <div className="hidden items-center gap-5 text-[13px] font-medium text-muted-foreground sm:flex">
            <Link href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
            <Link href="#services" className="hover:text-foreground transition-colors">Services</Link>
            <Link href="#work" className="hover:text-foreground transition-colors">Work</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <ThemeToggle />
            <Link href="/register"><Button size="sm">Get started free</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-5 text-[12px]">For accounting, legal, and professional services firms</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl leading-[1.12]">
            Automate the document work<br />your team shouldn&apos;t be doing manually.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground leading-relaxed">
            We build document processing pipelines, data extraction tools, and system integrations
            for firms that handle invoices, contracts, and client paperwork every day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="#contact"><Button size="lg">Start a project<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/documents"><Button size="lg" variant="outline">Try the demo</Button></Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Production-grade code</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Tested & documented</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 7–14 day delivery</span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-3">Common workflows we automate</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto text-[15px]">
            Most professional services firms spend hours on the same document tasks every week. We turn those into automated pipelines.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {useCases.map((uc, i) => (
              <div key={i} className="rounded-lg border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-md bg-muted p-2">{uc.icon}</div>
                  <span className="text-[11px] text-muted-foreground">{uc.audience}</span>
                </div>
                <h3 className="font-medium mb-2">{uc.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-3">Services</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto text-[15px]">
            Three ways we can help. Each delivered as production-ready code with documentation.
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {services.map((s, i) => (
              <Card key={i} className={`bg-gradient-to-br ${s.gradient} border-0 shadow-sm`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-md p-2 ${s.iconBg}`}><span className={s.iconColor}>{s.icon}</span></div>
                    <Badge variant="secondary" className="text-[11px]">{s.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{s.title}</CardTitle>
                  <CardDescription className="text-[13px] leading-relaxed">{s.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-5 space-y-1.5">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-[13px]">
                        <CheckCircle className="h-3 w-3 text-muted-foreground flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.pricing}</span>
                    <Link href={s.demoUrl}>
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        {s.demoUrl === '#contact' ? 'Enquire' : 'Try it'}<ArrowRight className="h-3 w-3" />
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
      <section id="work" className="border-t px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-3">See it working</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto text-[15px]">
            Two live demos — try them with your own documents or content.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="h-1 bg-foreground/10" />
              <CardHeader>
                <CardTitle className="text-lg">Document Intelligence</CardTitle>
                <CardDescription>Upload a document, get structured data back</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                  Drop an invoice, contract, or any text file. See extracted entities highlighted
                  inline — people, organisations, dates, dollar amounts — with a structured table and summary.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Entity extraction', 'Structured output', 'Multiple formats', 'Instant results'].map(t => (
                    <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                  ))}
                </div>
                <Link href="/documents"><Button className="w-full" size="sm">Try the demo<ArrowRight className="ml-2 h-3.5 w-3.5" /></Button></Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-1 bg-foreground/10" />
              <CardHeader>
                <CardTitle className="text-lg">Content Optimizer</CardTitle>
                <CardDescription>Analyse and rewrite any text</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                  Paste content or a URL. Get scored on readability, SEO, tone, and grammar.
                  Click optimise to get a rewritten version with tracked changes and improvement scores.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Readability scoring', 'SEO analysis', 'URL scraping', 'Side-by-side output'].map(t => (
                    <Badge key={t} variant="secondary" className="text-[11px]">{t}</Badge>
                  ))}
                </div>
                <Link href="/optimizer"><Button variant="outline" className="w-full" size="sm">Open optimizer<ArrowRight className="ml-2 h-3.5 w-3.5" /></Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-12">How it works</h2>
          <div className="grid gap-5 sm:grid-cols-4">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-background border text-sm font-medium">{s.n}</div>
                <h3 className="font-medium text-sm mb-1">{s.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-3">Pricing</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto text-[15px]">
            Fixed-price packages. Hourly ($75–150) available for ongoing work.
          </p>
          <div className="grid gap-5 sm:grid-cols-3 items-stretch">
            {tiers.map((t, i) => (
              <Card key={i} className={`flex flex-col ${t.highlight ? 'border-foreground/20 shadow-md' : ''}`}>
                {t.highlight && <div className="bg-foreground text-background text-[11px] font-medium text-center py-1 -mt-px -mx-px rounded-t-lg">Most popular</div>}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{t.name}</CardTitle>
                  <div className="text-2xl font-semibold">{t.price}</div>
                  <CardDescription className="text-[13px]">{t.scope}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="flex-1 space-y-2 mb-6">
                    {t.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-[13px]">
                        <CheckCircle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact"><Button variant={t.highlight ? 'default' : 'outline'} className="w-full" size="sm">Get started</Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-[13px] text-muted-foreground mt-6">50% upfront, 50% on delivery. No hidden fees.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t px-4 py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-12">What clients say</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <Card key={i} className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map(j => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current text-foreground/60" />
                  ))}
                </div>
                <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[12px] text-muted-foreground">{r.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t px-4 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-semibold text-center mb-2">Start a project</h2>
          <p className="text-center text-muted-foreground mb-10 text-[15px]">
            Tell us about the workflow you want automated. We&apos;ll reply within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-sm font-medium">PRIA</span>
          <div className="flex gap-5 text-[13px] text-muted-foreground">
            <Link href="/documents" className="hover:text-foreground transition-colors">Document Demo</Link>
            <Link href="/optimizer" className="hover:text-foreground transition-colors">Content Optimizer</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <span className="text-[12px] text-muted-foreground">&copy; {new Date().getFullYear()} PRIA</span>
        </div>
      </footer>
    </div>
  );
}
