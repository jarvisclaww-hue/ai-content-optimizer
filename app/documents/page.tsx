'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, FileText, Upload, X } from 'lucide-react';
import Link from 'next/link';

// ── Types ────────────────────────────────────────────────────

interface Entity {
  type: string;
  value: string;
  index: number;
}

interface ProcessingResult {
  text: string;
  entities: Entity[];
  summary: string;
  stats: {
    wordCount: number;
    charCount: number;
    entityCount: number;
    processingMs: number;
  };
}

// ── Client-side extraction ───────────────────────────────────

function extractEntities(text: string): Entity[] {
  const entities: Entity[] = [];
  const seen = new Set<string>();

  const patterns: [RegExp, string][] = [
    [/\b[A-Z][a-z]+ [A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b/g, 'PERSON'],
    [
      /\b(?:Inc|Corp|LLC|Ltd|Co|Group|Foundation|Institute|University|Association|Agency|Department)\b/gi,
      '__SKIP__',
    ],
    [
      /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s(?:Inc|Corp|LLC|Ltd|Co|Group|Foundation|Institute|University)\b/g,
      'ORG',
    ],
    [
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g,
      'DATE',
    ],
    [/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, 'DATE'],
    [/\b\d{4}-\d{2}-\d{2}\b/g, 'DATE'],
    [/\$[\d,]+(?:\.\d{2})?\b/g, 'MONEY'],
    [/\b\d+(?:,\d{3})*(?:\.\d+)?\s*(?:USD|EUR|GBP|AUD|CAD)\b/gi, 'MONEY'],
    [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, 'EMAIL'],
    [/\bhttps?:\/\/[^\s<>]+/g, 'URL'],
    [/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, 'PHONE'],
    [
      /\b\d{1,5}\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s(?:St|Ave|Blvd|Dr|Rd|Ln|Ct|Way|Pkwy|Pl)\.?\b/g,
      'ADDRESS',
    ],
  ];

  for (const [rx, type] of patterns) {
    if (type === '__SKIP__') continue;
    let m;
    while ((m = rx.exec(text)) !== null) {
      const key = `${type}:${m[0]}`;
      if (!seen.has(key)) {
        seen.add(key);
        entities.push({ type, value: m[0], index: m.index });
      }
    }
  }

  return entities.sort((a, b) => a.index - b.index);
}

function generateSummary(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences || sentences.length === 0) return text.slice(0, 250).trim();
  return sentences.slice(0, 3).join(' ').trim();
}

function processText(text: string, startTime: number): ProcessingResult {
  const entities = extractEntities(text);
  const summary = generateSummary(text);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  return {
    text,
    entities,
    summary,
    stats: {
      wordCount: words.length,
      charCount: text.length,
      entityCount: entities.length,
      processingMs: Date.now() - startTime,
    },
  };
}

// ── Pre-loaded demo ──────────────────────────────────────────

const DEMO_TEXT = `CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into as of March 15, 2026, by and between Acme Technologies Inc, a Delaware corporation with offices at 350 Fifth Avenue, New York, NY 10118 ("Client"), and Sarah Mitchell, an independent consultant residing at 42 Oak Street, San Francisco, CA 94102 ("Consultant").

1. SERVICES
The Consultant agrees to provide software architecture review and technical advisory services for the Client's document processing platform. The engagement shall commence on April 1, 2026 and continue through September 30, 2026.

2. COMPENSATION
The Client shall pay the Consultant a fee of $15,000 per month, payable on the first business day of each month. Additionally, the Consultant shall be reimbursed for pre-approved expenses up to $2,500 per month.

3. INTELLECTUAL PROPERTY
All work product created by the Consultant during the term of this Agreement shall be the exclusive property of Acme Technologies Inc. The Consultant assigns all rights, title, and interest in such work product to the Client.

4. CONFIDENTIALITY
The Consultant agrees to maintain the confidentiality of all proprietary information disclosed by the Client, including but not limited to technical specifications, business plans, and customer data.

For questions regarding this agreement, contact legal@acmetech.com or call +1 (212) 555-0147.

Signed,
James Chen
Chief Technology Officer
Acme Technologies Inc`;

// ── Component ────────────────────────────────────────────────

const entityColors: Record<string, string> = {
  PERSON: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  ORG: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  DATE: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  MONEY: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  EMAIL: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  URL: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  PHONE: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  ADDRESS: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
};

export default function DocumentsPage() {
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const process = useCallback((text: string, name?: string) => {
    setLoading(true);
    setFileName(name || null);
    // Simulate a brief processing delay for visual feedback
    setTimeout(() => {
      const start = Date.now();
      setResult(processText(text, start));
      setLoading(false);
    }, 400);
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (
        file.type === 'text/plain' ||
        file.type === 'text/html' ||
        file.type === 'text/markdown' ||
        file.name.endsWith('.md')
      ) {
        const reader = new FileReader();
        reader.onload = () => process(reader.result as string, file.name);
        reader.readAsText(file);
      } else {
        alert(
          'This demo supports .txt, .html, and .md files. The full API handles PDFs, DOCX, and images — see the API docs.'
        );
      }
    },
    [process]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handlePaste = () => {
    if (pasteText.trim()) process(pasteText, 'Pasted text');
  };

  const loadDemo = () => process(DEMO_TEXT, 'demo-consulting-agreement.txt');

  const reset = () => {
    setResult(null);
    setFileName(null);
    setPasteText('');
    setLoading(false);
  };

  // Build highlighted text
  const highlightedText = (text: string, entities: Entity[]) => {
    if (entities.length === 0) return <span>{text}</span>;

    const parts: React.ReactNode[] = [];
    const lastEnd = 0;

    // Find entity positions in text for highlighting
    const positions: { start: number; end: number; entity: Entity }[] = [];
    for (const ent of entities) {
      const idx = text.indexOf(ent.value, lastEnd > 0 ? 0 : 0);
      if (idx !== -1) {
        positions.push({ start: idx, end: idx + ent.value.length, entity: ent });
      }
    }
    positions.sort((a, b) => a.start - b.start);

    // Deduplicate overlapping
    const filtered: typeof positions = [];
    let prevEnd = 0;
    for (const p of positions) {
      if (p.start >= prevEnd) {
        filtered.push(p);
        prevEnd = p.end;
      }
    }

    let cursor = 0;
    for (const pos of filtered) {
      if (pos.start > cursor) {
        parts.push(<span key={`t-${cursor}`}>{text.slice(cursor, pos.start)}</span>);
      }
      parts.push(
        <mark
          key={`e-${pos.start}`}
          className={`rounded px-0.5 ${entityColors[pos.entity.type] || 'bg-gray-100'}`}
          title={pos.entity.type}
        >
          {text.slice(pos.start, pos.end)}
        </mark>
      );
      cursor = pos.end;
    }
    if (cursor < text.length) {
      parts.push(<span key={`t-${cursor}`}>{text.slice(cursor)}</span>);
    }

    return <>{parts}</>;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              PRIA
            </Link>
            <span className="text-border">/</span>
            <span className="text-[13px] font-medium">Document Intelligence</span>
          </div>
          {result && (
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={reset}>
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        {!result && !loading ? (
          /* ── Upload state ── */
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold mb-2">Document Intelligence</h1>
              <p className="text-[15px] text-muted-foreground">
                Upload a document or paste text. Get extracted content, recognised entities, and a
                structured summary.
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${dragOver ? 'border-foreground/40 bg-muted/50' : 'border-border hover:border-foreground/20 hover:bg-muted/30'}`}
            >
              <Upload className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-medium mb-1">Drop a file here or click to browse</p>
              <p className="text-[12px] text-muted-foreground">
                TXT, HTML, MD supported in demo &middot; Full API handles PDF, DOCX, images
              </p>
              <input
                ref={fileRef}
                type="file"
                accept=".txt,.html,.htm,.md"
                className="hidden"
                onChange={e => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[12px] text-muted-foreground">or paste text</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Paste */}
            <div>
              <Textarea
                placeholder="Paste document content here..."
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
                className="min-h-[120px] text-sm"
              />
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  onClick={handlePaste}
                  disabled={!pasteText.trim()}
                  className="text-xs"
                >
                  Process text
                </Button>
                <Button size="sm" variant="outline" onClick={loadDemo} className="text-xs">
                  Load demo document
                </Button>
              </div>
            </div>
          </div>
        ) : loading ? (
          /* ── Loading state ── */
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-foreground" />
            <p className="text-sm text-muted-foreground">Extracting text and entities...</p>
          </div>
        ) : result ? (
          /* ── Results ── */
          <div className="space-y-5">
            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-1.5 text-[13px]">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{fileName}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-[13px] text-muted-foreground">
                {result.stats.wordCount.toLocaleString()} words
              </span>
              <span className="text-[13px] text-muted-foreground">
                {result.stats.charCount.toLocaleString()} chars
              </span>
              <span className="text-[13px] text-muted-foreground">
                {result.stats.entityCount} entities
              </span>
              <div className="ml-auto flex items-center gap-1 text-[12px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {result.stats.processingMs}ms
              </div>
            </div>

            {/* Entity legend */}
            {result.entities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  result.entities.reduce(
                    (acc, e) => {
                      acc[e.type] = (acc[e.type] || 0) + 1;
                      return acc;
                    },
                    {} as Record<string, number>
                  )
                ).map(([type, count]) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className={`text-[11px] ${entityColors[type] || ''}`}
                  >
                    {type} ({count})
                  </Badge>
                ))}
              </div>
            )}

            {/* Tabbed results */}
            <Tabs defaultValue="annotated">
              <TabsList className="h-9">
                <TabsTrigger value="annotated" className="text-[13px]">
                  Annotated Text
                </TabsTrigger>
                <TabsTrigger value="entities" className="text-[13px]">
                  Entities ({result.entities.length})
                </TabsTrigger>
                <TabsTrigger value="summary" className="text-[13px]">
                  Summary
                </TabsTrigger>
                <TabsTrigger value="raw" className="text-[13px]">
                  Plain Text
                </TabsTrigger>
              </TabsList>

              <TabsContent value="annotated">
                <Card>
                  <CardContent className="p-5">
                    <div className="whitespace-pre-wrap text-[14px] leading-[1.8]">
                      {highlightedText(result.text, result.entities)}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="entities">
                <Card>
                  <CardContent className="p-5">
                    {result.entities.length === 0 ? (
                      <p className="text-[13px] text-muted-foreground py-4 text-center">
                        No entities detected.
                      </p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="pb-2 pr-4 font-medium text-muted-foreground">Type</th>
                              <th className="pb-2 font-medium text-muted-foreground">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.entities.map((e, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-2 pr-4">
                                  <Badge
                                    variant="secondary"
                                    className={`text-[11px] ${entityColors[e.type] || ''}`}
                                  >
                                    {e.type}
                                  </Badge>
                                </td>
                                <td className="py-2 font-mono text-[13px]">{e.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Auto-generated summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[14px] leading-relaxed text-muted-foreground">
                      {result.summary}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raw">
                <Card>
                  <CardContent className="p-5">
                    <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
                      {result.text}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* API callout */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="text-[13px] font-medium">Need PDF, DOCX, or image processing?</p>
                  <p className="text-[12px] text-muted-foreground">
                    The full REST API supports all formats with OCR, async jobs, and webhooks.
                  </p>
                </div>
                <a
                  href="https://document-intelligence-api-production.up.railway.app/health"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="text-xs">
                    View API
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}
