import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to automate invoice processing for small accounting firms',
  description:
    'A practical guide to building an invoice processing pipeline that extracts vendor, amount, date, and GST from PDFs and images.',
};

export default function Post() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Blog
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-[11px]">
              Guide
            </Badge>
            <span className="text-[12px] text-muted-foreground">April 14, 2026</span>
            <span className="text-[12px] text-muted-foreground">&middot; 6 min read</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-4">
            How to automate invoice processing for small accounting firms
          </h1>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Most bookkeeping firms spend 5&ndash;10 hours a week manually keying invoice data into
            their accounting software. The work is repetitive, error-prone, and hard to delegate.
            Here&apos;s how to build a pipeline that does it automatically.
          </p>
        </div>

        <div className="prose-custom space-y-6 text-[15px] leading-[1.75]">
          <h2 className="text-xl font-semibold mt-10 mb-3">The problem</h2>
          <p className="text-muted-foreground">
            A typical small accounting firm processes hundreds of invoices per month for their
            clients. Each invoice needs the same data extracted: vendor name, invoice number, date,
            line items, subtotal, GST, and total. This data then goes into Xero, MYOB, or
            QuickBooks.
          </p>
          <p className="text-muted-foreground">
            The manual process looks like this: open the PDF, read each field, type it into the
            accounting software, double-check the numbers, move to the next invoice. A single
            invoice takes 2&ndash;5 minutes. Multiply that by 200 invoices a month and you&apos;ve
            lost a full working day.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-3">
            What an automated pipeline looks like
          </h2>
          <p className="text-muted-foreground">
            The goal is simple: the bookkeeper drops a stack of invoice files into a folder (or
            forwards them to an email address), and the system outputs a structured CSV or JSON file
            with all the extracted fields — ready to import.
          </p>
          <p className="text-muted-foreground">The pipeline has four stages:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
            <li>
              <strong className="text-foreground">Ingestion</strong> — Accept files via upload,
              email forwarding, or a watched folder. Support PDF, JPEG, PNG, and TIFF.
            </li>
            <li>
              <strong className="text-foreground">Text extraction</strong> — Use OCR for scanned
              documents (Tesseract.js or Google Vision) and direct parsing for digital PDFs
              (pdf-parse).
            </li>
            <li>
              <strong className="text-foreground">Field extraction</strong> — Apply regex patterns
              and/or an LLM to identify vendor, amount, date, invoice number, GST, and line items
              from the raw text.
            </li>
            <li>
              <strong className="text-foreground">Export</strong> — Output the structured data as
              CSV, JSON, or directly into the accounting API (Xero, MYOB, QuickBooks).
            </li>
          </ol>

          <h2 className="text-xl font-semibold mt-10 mb-3">Choosing the right extraction method</h2>
          <p className="text-muted-foreground">
            There are two main approaches to field extraction, and the right choice depends on how
            varied your invoices are.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Pattern-based extraction</strong> works well when
            invoices follow predictable formats. Regex patterns like{' '}
            <code className="bg-muted px-1 rounded text-[13px]">/Total[:\s]*\$([\d,.]+)/</code> can
            reliably pull totals, dates, and invoice numbers from structured documents. This is
            fast, deterministic, and costs nothing to run.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">LLM-based extraction</strong> handles varied and
            unpredictable layouts. You send the raw text to a model with a structured prompt asking
            for specific fields, and it returns JSON. More flexible, but adds latency and API cost
            (typically $0.001&ndash;0.01 per invoice with DeepSeek or GPT-4o-mini).
          </p>
          <p className="text-muted-foreground">
            In practice, the best approach is a hybrid: use pattern matching first, fall back to an
            LLM when patterns don&apos;t match or confidence is low.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-3">What the output looks like</h2>
          <p className="text-muted-foreground">
            For each invoice, the pipeline produces a structured record:
          </p>
          <div className="bg-muted rounded-lg p-4 font-mono text-[13px] overflow-x-auto">
            <pre>{`{
  "invoice_number": "INV-2026-0042",
  "vendor": "Mitchell Consulting Pty Ltd",
  "date": "2026-04-10",
  "due_date": "2026-05-10",
  "subtotal": 10300.00,
  "gst": 1030.00,
  "total": 11330.00,
  "line_items": [
    { "description": "Financial systems integration", "hours": 24, "rate": 175.00, "amount": 4200.00 },
    { "description": "Data migration (Xero to MYOB)", "hours": 16, "rate": 175.00, "amount": 2800.00 }
  ]
}`}</pre>
          </div>
          <p className="text-muted-foreground">
            This can be exported as a CSV for bulk import, pushed directly to the Xero API, or
            stored in a database for review before submission.
          </p>

          <h2 className="text-xl font-semibold mt-10 mb-3">Getting started</h2>
          <p className="text-muted-foreground">
            If you&apos;re a bookkeeping firm and this sounds like a problem worth solving, you can
            try our document extraction demo to see entity and field extraction in action — no
            signup required.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/documents">
              <Button size="sm">Try the demo</Button>
            </Link>
            <Link href="/#contact">
              <Button size="sm" variant="outline">
                Talk to us about a custom build
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
