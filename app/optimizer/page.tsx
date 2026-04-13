'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Copy,
  Download,
  FileText,
  RefreshCw,
} from 'lucide-react';
import { aiContentService, type OptimizationGoals, type ContentMetrics } from '@/lib/ai-service';
import Link from 'next/link';

interface OptimizationResult {
  optimizedContent: string;
  changes: Array<{
    type: 'readability' | 'seo' | 'tone' | 'grammar' | 'structure';
    description: string;
    before: string;
    after: string;
    confidence: number;
  }>;
  summary: {
    readabilityImprovement: number;
    seoImprovement: number;
    toneMatch: number;
    grammarImprovement: number;
    overallImprovement: number;
  };
  suggestions: string[];
}

const sample = `Effective technical writing requires clarity above all else. The goal is to convey complex ideas in simple terms without losing accuracy or depth.

Many teams underestimate the impact of clear documentation. When API references are ambiguous or setup guides skip critical steps, developer adoption suffers. Support tickets increase. Integration timelines extend.

The best documentation is tested like code. Each instruction should be verifiable. Each example should be runnable. Ambiguity should be treated as a bug, not a style choice.`;

export default function OptimizerPage() {
  const [content, setContent] = useState('');
  const [optimized, setOptimized] = useState('');
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<'analyse' | 'optimise' | null>(null);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [analysis, setAnalysis] = useState<ContentMetrics | null>(null);
  const [copied, setCopied] = useState(false);
  const [goals, setGoals] = useState<OptimizationGoals>({
    improveReadability: true,
    improveSEO: true,
    adjustTone: 'neutral',
    fixGrammar: true,
    targetAudience: 'general',
    wordCountTarget: 0,
  });

  const wc = (t: string) => t.split(/\s+/).filter(w => w.length > 0).length;
  const wordCount = wc(content);

  const analyse = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setAction('analyse');
    try {
      const r = await aiContentService.analyzeContent(content);
      setAnalysis(r.analysis);
    } catch {
      alert('Analysis failed. Check that OPENROUTER_API_KEY is set.');
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const optimise = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setAction('optimise');
    try {
      const r = await aiContentService.optimizeContent(content, goals);
      setOptimized(r.optimizedContent);
      setResult(r);
    } catch {
      alert('Optimisation failed. Check that OPENROUTER_API_KEY is set.');
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportMd = async () => {
    try {
      const blob = await aiContentService.exportContent(optimized, 'markdown', {
        title: 'Optimised Content',
      });
      if (blob instanceof Blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `optimised-${Date.now()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch {
      alert('Export failed.');
    }
  };

  const reset = () => {
    setContent('');
    setOptimized('');
    setResult(null);
    setAnalysis(null);
  };

  const scoreColor = (s: number) =>
    s >= 75 ? 'text-emerald-600' : s >= 50 ? 'text-amber-600' : 'text-red-600';

  const barColor = (s: number) =>
    s >= 75 ? '[&>div]:bg-emerald-500' : s >= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500';

  const sel =
    'h-8 rounded-md border bg-background px-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:opacity-50';

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              PRIA
            </Link>
            <span className="text-border">/</span>
            <span className="text-[13px] font-medium">Content Optimizer</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => setContent(sample)}
              disabled={loading}
            >
              <FileText className="mr-1 h-3 w-3" />
              Sample
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={reset}
              disabled={loading}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Settings bar */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5">
          {[
            { id: 'r', label: 'Readability', key: 'improveReadability' as const },
            { id: 's', label: 'SEO', key: 'improveSEO' as const },
            { id: 'g', label: 'Grammar', key: 'fixGrammar' as const },
          ].map(o => (
            <label key={o.id} className="flex items-center gap-1.5 text-[13px]">
              <Switch
                id={o.id}
                checked={goals[o.key] as boolean}
                onCheckedChange={v => setGoals({ ...goals, [o.key]: v })}
                disabled={loading}
                className="scale-75"
              />
              {o.label}
            </label>
          ))}
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-muted-foreground">Tone</span>
            <select
              className={sel}
              value={goals.adjustTone || 'neutral'}
              onChange={e =>
                setGoals({ ...goals, adjustTone: e.target.value as typeof goals.adjustTone })
              }
              disabled={loading}
            >
              <option value="neutral">Neutral</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="persuasive">Persuasive</option>
              <option value="informative">Informative</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 text-[13px]">
            <span className="text-muted-foreground">Audience</span>
            <select
              className={sel}
              value={goals.targetAudience || 'general'}
              onChange={e =>
                setGoals({
                  ...goals,
                  targetAudience: e.target.value as typeof goals.targetAudience,
                })
              }
              disabled={loading}
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="business">Business</option>
              <option value="academic">Academic</option>
            </select>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={analyse}
              disabled={loading || !content.trim()}
            >
              {loading && action === 'analyse' ? 'Analysing\u2026' : 'Analyse'}
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs"
              onClick={optimise}
              disabled={loading || !content.trim()}
            >
              {loading && action === 'optimise' ? 'Optimising\u2026' : 'Optimise'}
              {!loading && <ArrowRight className="ml-1 h-3 w-3" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main split pane */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-0 divide-x">
        {/* Left — Input */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
              Input
            </span>
            <span className="text-[12px] text-muted-foreground">
              {wordCount} words &middot; {content.length.toLocaleString()} chars
            </span>
          </div>
          <Textarea
            placeholder="Paste or type your content here..."
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
            className="flex-1 resize-none rounded-none border-0 p-4 text-[14px] leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[400px]"
          />
        </div>

        {/* Right — Output */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
              Output
            </span>
            {optimized && (
              <div className="flex gap-1.5">
                <Button size="sm" variant="ghost" className="h-6 text-[11px] px-2" onClick={copy}>
                  <Copy className="mr-1 h-3 w-3" />
                  {copied ? 'Copied' : 'Copy'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 text-[11px] px-2"
                  onClick={exportMd}
                >
                  <Download className="mr-1 h-3 w-3" />
                  Export
                </Button>
              </div>
            )}
          </div>

          {!optimized && !analysis ? (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <p className="text-[13px] text-muted-foreground">
                  Enter content on the left, then click <strong>Analyse</strong> or{' '}
                  <strong>Optimise</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {/* Optimised text */}
              {optimized && (
                <div className="border-b p-4">
                  <div className="whitespace-pre-wrap text-[14px] leading-relaxed">{optimized}</div>
                  <div className="mt-2 text-[12px] text-muted-foreground">
                    {wc(optimized)} words &middot; {optimized.length.toLocaleString()} chars
                  </div>
                </div>
              )}

              {/* Scores */}
              {analysis && (
                <div className="border-b p-4">
                  <h3 className="mb-3 text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
                    Scores
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Overall', score: analysis.overallScore },
                      { label: 'Readability', score: analysis.readability.score },
                      { label: 'SEO', score: analysis.seo.score },
                      { label: 'Grammar', score: analysis.grammar.score },
                    ].map(m => (
                      <div key={m.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px]">{m.label}</span>
                          <span
                            className={`text-[13px] font-semibold tabular-nums ${scoreColor(m.score)}`}
                          >
                            {m.score}
                          </span>
                        </div>
                        <Progress value={m.score} className={`h-1.5 ${barColor(m.score)}`} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[11px]">
                      {analysis.tone.primaryTone}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      {analysis.readability.gradeLevel}
                    </Badge>
                    {analysis.grammar.totalIssues > 0 && (
                      <Badge variant="secondary" className="text-[11px]">
                        {analysis.grammar.totalIssues} grammar issue
                        {analysis.grammar.totalIssues !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Changes & suggestions */}
              {result && (result.changes.length > 0 || result.suggestions.length > 0) && (
                <div className="p-4">
                  <Tabs defaultValue="changes">
                    <TabsList className="mb-3 h-8">
                      <TabsTrigger value="changes" className="text-[12px] h-6">
                        Changes ({result.changes.length})
                      </TabsTrigger>
                      <TabsTrigger value="suggestions" className="text-[12px] h-6">
                        Suggestions ({result.suggestions.length})
                      </TabsTrigger>
                      {result.summary.overallImprovement > 0 && (
                        <TabsTrigger value="improvements" className="text-[12px] h-6">
                          Improvements
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <TabsContent value="changes">
                      <div className="space-y-2">
                        {result.changes.map((c, i) => (
                          <div key={i} className="rounded-md bg-muted/50 px-3 py-2">
                            <div className="flex items-start gap-2">
                              <Badge variant="outline" className="text-[10px] mt-0.5 shrink-0">
                                {c.type}
                              </Badge>
                              <span className="text-[13px]">{c.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="suggestions">
                      <ul className="space-y-1.5">
                        {result.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px]">
                            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="improvements">
                      <div className="space-y-2">
                        {[
                          { label: 'Overall', val: result.summary.overallImprovement },
                          { label: 'Readability', val: result.summary.readabilityImprovement },
                          { label: 'SEO', val: result.summary.seoImprovement },
                          { label: 'Grammar', val: result.summary.grammarImprovement },
                        ]
                          .filter(m => m.val > 0)
                          .map((m, i) => (
                            <div key={i} className="flex items-center justify-between text-[13px]">
                              <span>{m.label}</span>
                              <span className="font-medium text-emerald-600">+{m.val}%</span>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
