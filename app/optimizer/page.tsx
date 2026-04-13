'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  BarChart,
  CheckCircle,
  Copy,
  Download,
  FileText,
  RefreshCw,
  Settings,
  TrendingUp,
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

const sampleContent = `Content optimization is becoming important in digital publishing. With increasing competition for reader attention, ensuring that text is clear, well-structured, and suited to its audience is essential.

However, many teams struggle with balancing SEO requirements against readability. Common issues include overly complex sentences, inconsistent tone, and missed keyword opportunities.

This is where structured analysis helps. By scoring content across multiple dimensions — readability, keyword usage, tone consistency, and grammar — writers can make targeted improvements rather than guessing.`;

export default function OptimizerPage() {
  const [content, setContent] = useState('');
  const [optimizedContent, setOptimizedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [analysis, setAnalysis] = useState<ContentMetrics | null>(null);
  const [goals, setGoals] = useState<OptimizationGoals>({
    improveReadability: true,
    improveSEO: true,
    adjustTone: 'neutral',
    fixGrammar: true,
    targetAudience: 'general',
    wordCountTarget: 0,
  });

  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;

  const analyse = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const r = await aiContentService.analyzeContent(content);
      setAnalysis(r.analysis);
    } catch {
      alert('Analysis failed. Check that the API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  const optimise = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const r = await aiContentService.optimizeContent(content, goals);
      setOptimizedContent(r.optimizedContent);
      setResult(r);
    } catch {
      alert('Optimisation failed. Check that the API key is configured.');
    } finally {
      setLoading(false);
    }
  };

  const exportMd = async () => {
    try {
      const blob = await aiContentService.exportContent(optimizedContent, 'markdown', {
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

  const scoreColor = (s: number) =>
    s >= 80
      ? 'text-green-700 dark:text-green-400'
      : s >= 60
        ? 'text-amber-700 dark:text-amber-400'
        : 'text-red-700 dark:text-red-400';

  const selectClass =
    'w-full h-9 px-3 py-1 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
            <div className="h-4 w-px bg-border" />
            <h1 className="text-sm font-semibold">Content Optimizer</h1>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setContent(sampleContent)}
              disabled={loading}
            >
              <FileText className="mr-1.5 h-3.5 w-3.5" /> Sample
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setContent('');
                setOptimizedContent('');
                setResult(null);
                setAnalysis(null);
              }}
              disabled={loading}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Reset
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Input */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Input</CardTitle>
                <CardDescription className="text-[13px]">
                  Paste or type the content you want analysed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter content here…"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="min-h-[180px] text-sm"
                  disabled={loading}
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground">
                    {content.length.toLocaleString()} chars · {wordCount} words
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={analyse}
                    disabled={loading || !content.trim()}
                    className="h-7 text-xs"
                  >
                    <BarChart className="mr-1.5 h-3 w-3" /> Analyse
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  {[
                    {
                      id: 'readability',
                      label: 'Improve readability',
                      desc: 'Simpler sentences, better flow',
                      key: 'improveReadability' as const,
                    },
                    {
                      id: 'seo',
                      label: 'Improve SEO',
                      desc: 'Keywords, structure, density',
                      key: 'improveSEO' as const,
                    },
                    {
                      id: 'grammar',
                      label: 'Fix grammar',
                      desc: 'Spelling and grammar corrections',
                      key: 'fixGrammar' as const,
                    },
                  ].map(opt => (
                    <div key={opt.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={opt.id} className="text-sm font-medium">
                          {opt.label}
                        </Label>
                        <p className="text-[12px] text-muted-foreground">{opt.desc}</p>
                      </div>
                      <Switch
                        id={opt.id}
                        checked={goals[opt.key] as boolean}
                        onCheckedChange={v => setGoals({ ...goals, [opt.key]: v })}
                        disabled={loading}
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="tone" className="text-sm font-medium mb-1 block">
                      Tone
                    </Label>
                    <select
                      id="tone"
                      className={selectClass}
                      value={goals.adjustTone || 'neutral'}
                      onChange={e =>
                        setGoals({
                          ...goals,
                          adjustTone: e.target.value as typeof goals.adjustTone,
                        })
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
                  <div>
                    <Label htmlFor="audience" className="text-sm font-medium mb-1 block">
                      Audience
                    </Label>
                    <select
                      id="audience"
                      className={selectClass}
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
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={optimise}
                  disabled={loading || !content.trim()}
                  className="w-full"
                  size="sm"
                >
                  {loading ? 'Processing\u2026' : 'Optimise'}
                </Button>
              </CardFooter>
            </Card>

            {/* Output */}
            {optimizedContent && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Result</CardTitle>
                  <CardDescription className="text-[13px]">
                    Revised content based on your settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={optimizedContent}
                    readOnly
                    className="min-h-[180px] bg-muted/40 text-sm"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[12px] text-muted-foreground">
                      {optimizedContent.length.toLocaleString()} chars ·{' '}
                      {optimizedContent.split(/\s+/).filter(w => w.length > 0).length} words
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => {
                          navigator.clipboard.writeText(optimizedContent);
                        }}
                      >
                        <Copy className="mr-1.5 h-3 w-3" /> Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={exportMd}
                      >
                        <Download className="mr-1.5 h-3 w-3" /> Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Quick stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                {content ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words</span>
                      <span className="font-medium">{wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Characters</span>
                      <span className="font-medium">{content.length.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading time</span>
                      <span className="font-medium">
                        {aiContentService.calculateReadingTime(content)} min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Complexity</span>
                      <span className="font-medium">
                        {aiContentService.calculateComplexityScore(content)}/100
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="py-6 text-center text-[13px] text-muted-foreground">
                    Enter content to see stats.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Analysis */}
            {analysis && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall</span>
                      <span className={`font-medium ${scoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}/100
                      </span>
                    </div>
                    <Progress value={analysis.overallScore} className="h-1.5" />
                  </div>
                  {[
                    {
                      label: 'Readability',
                      score: analysis.readability.score,
                      detail: `${analysis.readability.gradeLevel} · ${analysis.readability.readingEase}`,
                    },
                    {
                      label: 'SEO',
                      score: analysis.seo.score,
                      detail: `${Object.keys(analysis.seo.keywordDensity).length} keywords found`,
                    },
                    {
                      label: 'Grammar',
                      score: analysis.grammar.score,
                      detail: `${analysis.grammar.totalIssues} issue${analysis.grammar.totalIssues === 1 ? '' : 's'}`,
                    },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[13px] mb-0.5">
                        <span>{m.label}</span>
                        <span className="font-medium">{m.score}/100</span>
                      </div>
                      <Progress value={m.score} className="h-1" />
                      <p className="text-[11px] text-muted-foreground mt-0.5">{m.detail}</p>
                    </div>
                  ))}
                  <div>
                    <span className="text-[13px]">Tone</span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-[11px]">
                        {analysis.tone.primaryTone}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Optimisation results */}
            {result && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Overall', val: result.summary.overallImprovement },
                    { label: 'Readability', val: result.summary.readabilityImprovement },
                    { label: 'SEO', val: result.summary.seoImprovement },
                    { label: 'Grammar', val: result.summary.grammarImprovement },
                  ]
                    .filter(m => m.val > 0)
                    .map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[13px] mb-0.5">
                          <span>{m.label}</span>
                          <span className="font-medium text-green-700 dark:text-green-400">
                            +{m.val}%
                          </span>
                        </div>
                        <Progress value={m.val} className="h-1" />
                      </div>
                    ))}
                  {result.changes.length > 0 && (
                    <div>
                      <p className="text-[13px] font-medium mb-1.5">
                        Changes ({result.changes.length})
                      </p>
                      <div className="space-y-1.5 max-h-32 overflow-y-auto">
                        {result.changes.slice(0, 4).map((c, i) => (
                          <div key={i} className="rounded bg-muted px-2.5 py-1.5 text-[12px]">
                            <span className="font-medium">{c.description}</span>
                          </div>
                        ))}
                        {result.changes.length > 4 && (
                          <p className="text-[11px] text-muted-foreground text-center">
                            +{result.changes.length - 4} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {result.suggestions.length > 0 && (
                    <div>
                      <p className="text-[13px] font-medium mb-1.5">Suggestions</p>
                      <ul className="space-y-1">
                        {result.suggestions.slice(0, 3).map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[12px]">
                            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
