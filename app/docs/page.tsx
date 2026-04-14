import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation',
  description: 'Document Intelligence API reference — authentication, document upload, entity extraction, and more.',
};

const API = 'https://document-intelligence-api-production.up.railway.app/api/v1';

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-[13px] leading-relaxed">{children}</pre>
  );
}

function Method({ method, path, description }: { method: string; path: string; description: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    PATCH: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  };

  return (
    <div className="flex items-center gap-3 rounded-md border px-4 py-3">
      <Badge className={`font-mono text-[11px] ${colors[method] || ''}`}>{method}</Badge>
      <code className="text-[13px] font-mono">{path}</code>
      <span className="text-[13px] text-muted-foreground ml-auto hidden sm:block">{description}</span>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />PRIA
            </Link>
            <span className="text-border">/</span>
            <span className="text-[13px] font-medium">API Docs</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Intro */}
        <div>
          <h1 className="text-3xl font-semibold mb-3">API Reference</h1>
          <p className="text-muted-foreground text-[15px] mb-4 leading-relaxed">
            The Document Intelligence API lets you upload documents, extract text and entities, and retrieve structured results programmatically.
          </p>
          <div className="rounded-md bg-muted px-4 py-3">
            <p className="text-[13px]"><span className="text-muted-foreground">Base URL:</span> <code className="font-mono">{API}</code></p>
          </div>
        </div>

        {/* Authentication */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Authentication</h2>
          <p className="text-[14px] text-muted-foreground mb-4 leading-relaxed">
            All API requests require authentication via either a JWT bearer token or an API key in the <code className="bg-muted px-1 rounded text-[13px]">X-API-Key</code> header.
          </p>

          <h3 className="text-base font-medium mt-6 mb-3">Register an account</h3>
          <Code>{`curl -X POST ${API}/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "your-password", "name": "Your Name"}'`}</Code>
          <p className="text-[13px] text-muted-foreground mt-2">Returns a JWT token and an API key. Save the API key — it&apos;s only shown once.</p>

          <h3 className="text-base font-medium mt-6 mb-3">Using your API key</h3>
          <Code>{`curl ${API}/documents \\
  -H "X-API-Key: your-api-key"`}</Code>

          <h3 className="text-base font-medium mt-6 mb-3">Using a JWT token</h3>
          <Code>{`# Get a token
curl -X POST ${API}/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "your-password", "grant_type": "password"}'

# Use the token
curl ${API}/documents \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`}</Code>
        </section>

        {/* Endpoints */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Endpoints</h2>
          <div className="space-y-2">
            <Method method="POST" path="/auth/register" description="Create an account" />
            <Method method="POST" path="/auth/token" description="Get access token" />
            <Method method="POST" path="/documents" description="Upload a document" />
            <Method method="GET" path="/documents" description="List documents" />
            <Method method="GET" path="/documents/:id" description="Get document status & results" />
            <Method method="GET" path="/documents/:id/download" description="Download original file" />
            <Method method="PATCH" path="/documents/:id" description="Update metadata" />
            <Method method="DELETE" path="/documents/:id" description="Delete document" />
            <Method method="GET" path="/search?q=term" description="Search documents" />
            <Method method="GET" path="/stats/documents" description="Usage statistics" />
          </div>
        </section>

        {/* Upload */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Upload a document</h2>
          <p className="text-[14px] text-muted-foreground mb-4">
            Upload a file as multipart form data. Supported formats: PDF, DOCX, JPEG, PNG, TIFF, TXT, HTML. Max 100MB.
          </p>

          <h3 className="text-base font-medium mb-3">cURL</h3>
          <Code>{`curl -X POST ${API}/documents \\
  -H "X-API-Key: your-api-key" \\
  -F "file=@invoice.pdf"`}</Code>

          <h3 className="text-base font-medium mt-6 mb-3">Python</h3>
          <Code>{`import requests

response = requests.post(
    "${API}/documents",
    headers={"X-API-Key": "your-api-key"},
    files={"file": open("invoice.pdf", "rb")}
)

data = response.json()
document_id = data["document_id"]
print(f"Document ID: {document_id}, Status: {data['status']}")`}</Code>

          <h3 className="text-base font-medium mt-6 mb-3">Node.js</h3>
          <Code>{`const form = new FormData();
form.append("file", fs.createReadStream("invoice.pdf"));

const res = await fetch("${API}/documents", {
  method: "POST",
  headers: { "X-API-Key": "your-api-key" },
  body: form,
});

const { document_id, status } = await res.json();
console.log(document_id, status);`}</Code>

          <h3 className="text-base font-medium mt-6 mb-3">Response</h3>
          <Code>{`{
  "document_id": "abc123-def456",
  "status": "queued",
  "estimated_completion_time": "2026-04-14T12:05:00Z"
}`}</Code>
        </section>

        {/* Get results */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Get document results</h2>
          <p className="text-[14px] text-muted-foreground mb-4">
            Poll the document endpoint until status is <code className="bg-muted px-1 rounded text-[13px]">completed</code>. Results include extracted text, entities, and a summary.
          </p>

          <Code>{`curl ${API}/documents/abc123-def456 \\
  -H "X-API-Key: your-api-key"`}</Code>

          <h3 className="text-base font-medium mt-6 mb-3">Response (completed)</h3>
          <Code>{`{
  "document_id": "abc123-def456",
  "status": "completed",
  "progress": 100,
  "result": {
    "extracted_text": "INVOICE\\nInvoice Number: INV-2026-0042...",
    "entities": [
      { "type": "PERSON", "value": "Sarah Mitchell", "confidence": 0.8 },
      { "type": "MONEY", "value": "$15,000", "confidence": 0.85 },
      { "type": "DATE", "value": "March 15, 2026", "confidence": 0.9 }
    ],
    "summary": "A consulting agreement between Acme Technologies and Sarah Mitchell...",
    "processing_time_ms": 1234
  }
}`}</Code>
        </section>

        {/* Rate limits */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Rate limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Plan</th>
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Documents/month</th>
                  <th className="pb-2 pr-6 font-medium text-muted-foreground">Max file size</th>
                  <th className="pb-2 font-medium text-muted-foreground">API keys</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2 pr-6">Free</td><td className="py-2 pr-6">10</td><td className="py-2 pr-6">10 MB</td><td className="py-2">1</td></tr>
                <tr className="border-b"><td className="py-2 pr-6">Pro ($49/mo)</td><td className="py-2 pr-6">500</td><td className="py-2 pr-6">50 MB</td><td className="py-2">5</td></tr>
                <tr><td className="py-2 pr-6">Business ($149/mo)</td><td className="py-2 pr-6">Unlimited</td><td className="py-2 pr-6">100 MB</td><td className="py-2">Unlimited</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="flex gap-3 pt-4">
          <Link href="/register"><Button size="sm">Create free account</Button></Link>
          <Link href="/#contact"><Button size="sm" variant="outline">Talk to us</Button></Link>
        </div>
      </div>
    </div>
  );
}
