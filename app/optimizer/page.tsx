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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Brain,
  Zap,
  Target,
  BarChart,
  Copy,
  Download,
  Wand2,
  Sparkles,
  CheckCircle,
  TrendingUp,
  FileText,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { aiContentService, type OptimizationGoals, type ContentMetrics } from '@/lib/ai-service';

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

export default function OptimizerPage() {
  const [content, setContent] = useState<string>('');
  const [optimizedContent, setOptimizedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [analysis, setAnalysis] = useState<ContentMetrics | null>(null);
  const [optimizationGoals, setOptimizationGoals] = useState<OptimizationGoals>({
    improveReadability: true,
    improveSEO: true,
    adjustTone: 'neutral',
    fixGrammar: true,
    targetAudience: 'general',
    wordCountTarget: 0,
  });

  const sampleContent = `AI content optimization is becoming increasingly important in today's digital landscape. With the rise of AI-generated content, it's crucial to ensure that your content stands out and engages your audience effectively.

However, many businesses struggle with creating content that is both SEO-friendly and readable. This is where AI content optimization tools come in handy. They can analyze your content and provide suggestions for improvement, helping you create better content faster.

Some common issues with content include poor readability, lack of SEO optimization, and inconsistent tone. These issues can be addressed with the right tools and strategies.`;

  const handleAnalyze = async () => {
    if (!content.trim()) {
      alert('Please enter some content to analyze');
      return;
    }

    setIsLoading(true);
    try {
      const result = await aiContentService.analyzeContent(content);
      setAnalysis(result.analysis);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!content.trim()) {
      alert('Please enter some content to optimize');
      return;
    }

    setIsLoading(true);
    try {
      const result = await aiContentService.optimizeContent(content, optimizationGoals);
      setOptimizedContent(result.optimizedContent);
      setOptimizationResult(result);
    } catch (error) {
      console.error('Optimization error:', error);
      alert('Failed to optimize content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = () => {
    setContent(sampleContent);
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(optimizedContent);
    alert('Optimized content copied to clipboard!');
  };

  const handleReset = () => {
    setContent('');
    setOptimizedContent('');
    setOptimizationResult(null);
    setAnalysis(null);
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'formal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'casual':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'persuasive':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'informative':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getImprovementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">AI Content Optimizer</h1>
                <p className="text-muted-foreground">
                  Enhance your content with AI-powered analysis and optimization
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLoadSample} className="gap-2">
                <FileText className="h-4 w-4" />
                Load Sample
              </Button>
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <Alert className="mb-6">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>AI-Powered Content Enhancement</AlertTitle>
            <AlertDescription>
              This tool analyzes your content and provides AI-powered suggestions to improve
              readability, SEO, tone, and grammar for better engagement.
            </AlertDescription>
          </Alert>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Input
                </CardTitle>
                <CardDescription>
                  Enter or paste your content for analysis and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">Your Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Enter your content here..."
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      className="min-h-[200px] mt-2"
                      disabled={isLoading}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        {content.length} characters,{' '}
                        {content.split(/\s+/).filter(w => w.length > 0).length} words
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAnalyze}
                        disabled={isLoading || !content.trim()}
                        className="gap-2"
                      >
                        <BarChart className="h-4 w-4" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Optimization Settings
                </CardTitle>
                <CardDescription>Configure how you want your content optimized</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="readability" className="font-medium">
                          Improve Readability
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Simplify sentence structure and improve flow
                        </p>
                      </div>
                      <Switch
                        id="readability"
                        checked={optimizationGoals.improveReadability}
                        onCheckedChange={checked =>
                          setOptimizationGoals({
                            ...optimizationGoals,
                            improveReadability: checked,
                          })
                        }
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="seo" className="font-medium">
                          Improve SEO
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Optimize for search engines and keyword usage
                        </p>
                      </div>
                      <Switch
                        id="seo"
                        checked={optimizationGoals.improveSEO}
                        onCheckedChange={checked =>
                          setOptimizationGoals({ ...optimizationGoals, improveSEO: checked })
                        }
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="grammar" className="font-medium">
                          Fix Grammar
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Correct spelling and grammar mistakes
                        </p>
                      </div>
                      <Switch
                        id="grammar"
                        checked={optimizationGoals.fixGrammar}
                        onCheckedChange={checked =>
                          setOptimizationGoals({ ...optimizationGoals, fixGrammar: checked })
                        }
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tone" className="font-medium mb-2 block">
                        Adjust Tone
                      </Label>
                      <select
                        id="tone"
                        className="w-full p-2 border rounded-md bg-background"
                        value={optimizationGoals.adjustTone || 'neutral'}
                        onChange={e =>
                          setOptimizationGoals({
                            ...optimizationGoals,
                            adjustTone: e.target.value as
                              | 'formal'
                              | 'casual'
                              | 'persuasive'
                              | 'informative'
                              | 'neutral',
                          })
                        }
                        disabled={isLoading}
                      >
                        <option value="neutral">Neutral</option>
                        <option value="formal">Formal</option>
                        <option value="casual">Casual</option>
                        <option value="persuasive">Persuasive</option>
                        <option value="informative">Informative</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="audience" className="font-medium mb-2 block">
                        Target Audience
                      </Label>
                      <select
                        id="audience"
                        className="w-full p-2 border rounded-md bg-background"
                        value={optimizationGoals.targetAudience || 'general'}
                        onChange={e =>
                          setOptimizationGoals({
                            ...optimizationGoals,
                            targetAudience: e.target.value as
                              | 'general'
                              | 'technical'
                              | 'business'
                              | 'academic',
                          })
                        }
                        disabled={isLoading}
                      >
                        <option value="general">General</option>
                        <option value="technical">Technical</option>
                        <option value="business">Business</option>
                        <option value="academic">Academic</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="wordCount" className="font-medium mb-2 block">
                        Word Count Target (0 = no target)
                      </Label>
                      <input
                        id="wordCount"
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded-md bg-background"
                        value={optimizationGoals.wordCountTarget || 0}
                        onChange={e =>
                          setOptimizationGoals({
                            ...optimizationGoals,
                            wordCountTarget: parseInt(e.target.value) || 0,
                          })
                        }
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleOptimize}
                  disabled={isLoading || !content.trim()}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" />
                      Optimize Content
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Optimized Output */}
            {optimizedContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Optimized Content
                  </CardTitle>
                  <CardDescription>
                    AI-enhanced version of your content with improvements applied
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={optimizedContent}
                      readOnly
                      className="min-h-[200px] bg-muted/50"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {optimizedContent.length} characters,{' '}
                        {optimizedContent.split(/\s+/).filter(w => w.length > 0).length} words
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyOptimized}
                          className="gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Analysis & Results */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Words</span>
                        <span className="font-medium">
                          {content.split(/\s+/).filter(w => w.length > 0).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Characters</span>
                        <span className="font-medium">{content.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Reading Time</span>
                        <span className="font-medium">
                          {aiContentService.calculateReadingTime(content)} min
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Complexity Score</span>
                        <span className="font-medium">
                          {aiContentService.calculateComplexityScore(content)}/100
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {!content && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter content to see analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Content Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className={`font-bold ${getImprovementColor(analysis.overallScore)}`}>
                        {analysis.overallScore}/100
                      </span>
                    </div>
                    <Progress value={analysis.overallScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Readability</span>
                        <span className="text-sm font-medium">
                          {analysis.readability.score}/100
                        </span>
                      </div>
                      <Progress value={analysis.readability.score} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {analysis.readability.gradeLevel} level • {analysis.readability.readingEase}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">SEO Score</span>
                        <span className="text-sm font-medium">{analysis.seo.score}/100</span>
                      </div>
                      <Progress value={analysis.seo.score} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Object.keys(analysis.seo.keywordDensity).length} keywords detected
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Grammar</span>
                        <span className="text-sm font-medium">{analysis.grammar.score}/100</span>
                      </div>
                      <Progress value={analysis.grammar.score} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {analysis.grammar.totalIssues} issues found
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium block mb-2">Tone Analysis</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getToneColor(analysis.tone.primaryTone)}>
                        {analysis.tone.primaryTone}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {analysis.tone.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Optimization Results */}
            {optimizationResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Optimization Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Overall Improvement</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          +{optimizationResult.summary.overallImprovement}%
                        </span>
                      </div>
                      <Progress
                        value={optimizationResult.summary.overallImprovement}
                        className="h-2"
                      />
                    </div>

                    {optimizationResult.summary.readabilityImprovement > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Readability</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            +{optimizationResult.summary.readabilityImprovement}%
                          </span>
                        </div>
                        <Progress
                          value={optimizationResult.summary.readabilityImprovement}
                          className="h-1"
                        />
                      </div>
                    )}

                    {optimizationResult.summary.seoImprovement > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">SEO</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            +{optimizationResult.summary.seoImprovement}%
                          </span>
                        </div>
                        <Progress
                          value={optimizationResult.summary.seoImprovement}
                          className="h-1"
                        />
                      </div>
                    )}

                    {optimizationResult.summary.grammarImprovement > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Grammar</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            +{optimizationResult.summary.grammarImprovement}%
                          </span>
                        </div>
                        <Progress
                          value={optimizationResult.summary.grammarImprovement}
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>

                  {optimizationResult.changes.length > 0 && (
                    <div>
                      <span className="text-sm font-medium block mb-2">
                        Changes Applied ({optimizationResult.changes.length})
                      </span>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {optimizationResult.changes.slice(0, 3).map((change, index) => (
                          <div key={index} className="text-xs p-2 bg-muted rounded">
                            <div className="font-medium">{change.description}</div>
                            <div className="text-muted-foreground">
                              Confidence: {change.confidence}%
                            </div>
                          </div>
                        ))}
                        {optimizationResult.changes.length > 3 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +{optimizationResult.changes.length - 3} more changes
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {optimizationResult.suggestions.length > 0 && (
                    <div>
                      <span className="text-sm font-medium block mb-2">Suggestions</span>
                      <ul className="space-y-1 text-xs">
                        {optimizationResult.suggestions.slice(0, 3).map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI-Powered Analysis</p>
                    <p className="text-xs text-muted-foreground">
                      Advanced content analysis using machine learning
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">SEO Optimization</p>
                    <p className="text-xs text-muted-foreground">
                      Improve search engine visibility and ranking
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                    <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tone Adjustment</p>
                    <p className="text-xs text-muted-foreground">
                      Match content tone to your target audience
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>AI Content Optimizer • Part of PRIA AI Development Services</p>
          <p className="mt-1">Professional content optimization powered by AI technology</p>
        </footer>
      </div>
    </div>
  );
}
