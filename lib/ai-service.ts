// AI Service Layer for Content Optimization
// This provides a unified interface for AI content analysis and optimization

export interface ContentMetrics {
  readability: {
    score: number;
    gradeLevel: string;
    readingEase: string;
    wordCount: number;
    sentenceCount: number;
    averageSentenceLength: number;
  };
  seo: {
    score: number;
    keywordDensity: Record<string, number>;
    metaDescriptionLength: number;
    titleLength: number;
    headingStructure: string[];
  };
  tone: {
    primaryTone: string;
    confidence: number;
    toneScores: Record<string, number>;
    suggestions: string[];
  };
  grammar: {
    score: number;
    issues: Array<{
      type: string;
      message: string;
      suggestion: string;
      position: { start: number; end: number };
    }>;
    totalIssues: number;
  };
  overallScore: number;
}

export interface OptimizationResult {
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

export interface OptimizationGoals {
  improveReadability?: boolean;
  improveSEO?: boolean;
  adjustTone?: 'formal' | 'casual' | 'persuasive' | 'informative' | 'neutral';
  fixGrammar?: boolean;
  targetAudience?: 'general' | 'technical' | 'business' | 'academic';
  wordCountTarget?: number;
}

export class AIContentService {
  private apiBase: string;

  constructor(apiBase: string = '') {
    this.apiBase = apiBase;
  }

  async analyzeContent(
    content: string,
    options?: {
      analyzeReadability?: boolean;
      analyzeSEO?: boolean;
      analyzeTone?: boolean;
      analyzeGrammar?: boolean;
    }
  ): Promise<{
    analysis: ContentMetrics;
    suggestions: string[];
  }> {
    try {
      // In a real implementation, this would call the actual API
      // For now, we'll use the mock implementation from our API route

      const response = await fetch(`${this.apiBase}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Content analysis error:', error);

      // Fallback to mock analysis if API is not available
      return this.mockAnalyzeContent(content, options);
    }
  }

  async optimizeContent(content: string, goals?: OptimizationGoals): Promise<OptimizationResult> {
    try {
      const response = await fetch(`${this.apiBase}/api/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          optimizationGoals: goals,
        }),
      });

      if (!response.ok) {
        throw new Error(`Optimization failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Content optimization error:', error);

      // Fallback to mock optimization
      return this.mockOptimizeContent(content, goals);
    }
  }

  async exportContent(
    content: string,
    format: 'markdown' | 'html' | 'plaintext' | 'pdf' | 'docx',
    metadata?: {
      title?: string;
      author?: string;
      keywords?: string[];
      description?: string;
    }
  ): Promise<Blob | string> {
    try {
      const response = await fetch(`${this.apiBase}/api/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          format,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`);
      }

      if (format === 'pdf' || format === 'docx') {
        return await response.json();
      } else {
        return await response.blob();
      }
    } catch (error) {
      console.error('Content export error:', error);
      throw error;
    }
  }

  // Mock implementations for development/testing
  private mockAnalyzeContent(
    content: string,
    _options?: unknown
  ): {
    analysis: ContentMetrics;
    suggestions: string[];
  } {
    // Simple mock analysis
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

    const readabilityScore = Math.min(100, Math.max(0, 100 - avgSentenceLength * 1.5));
    let gradeLevel = 'College';
    if (readabilityScore > 80) gradeLevel = '5th Grade';
    else if (readabilityScore > 60) gradeLevel = '8th Grade';
    else if (readabilityScore > 50) gradeLevel = 'High School';

    // Mock keyword analysis
    const words = content
      .toLowerCase()
      .split(/\W+/)
      .filter(w => w.length > 2);
    const wordFrequency: Record<string, number> = {};
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const topKeywords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .reduce(
        (acc, [word, count]) => {
          acc[word] = Math.round((count / words.length) * 10000) / 100;
          return acc;
        },
        {} as Record<string, number>
      );

    // Mock tone analysis
    const toneScores = {
      formal: Math.random() * 50,
      casual: Math.random() * 50,
      persuasive: Math.random() * 50,
      informative: Math.random() * 50,
    };

    const maxTone = Object.entries(toneScores).reduce(
      (max, [tone, score]) => (score > max.score ? { tone, score } : max),
      { tone: 'neutral', score: 0 }
    );

    // Mock grammar issues
    const grammarIssues = [];
    if (content.includes(' alot ')) {
      grammarIssues.push({
        type: 'spelling',
        message: '"alot" should be "a lot"',
        suggestion: 'Use "a lot" instead of "alot"',
        position: { start: content.indexOf(' alot '), end: content.indexOf(' alot ') + 5 },
      });
    }

    const grammarScore = Math.max(0, 100 - grammarIssues.length * 10);
    const overallScore = Math.round(
      readabilityScore * 0.3 +
        (Object.keys(topKeywords).length > 0 ? 70 : 50) * 0.3 +
        (maxTone.score > 0 ? 80 : 60) * 0.2 +
        grammarScore * 0.2
    );

    const suggestions = [];
    if (readabilityScore < 60) suggestions.push('Use shorter sentences for better readability.');
    if (Object.keys(topKeywords).length < 2) suggestions.push('Add more specific keywords.');
    if (grammarScore < 90) suggestions.push('Review grammar for improvements.');

    return {
      analysis: {
        readability: {
          score: Math.round(readabilityScore),
          gradeLevel,
          readingEase:
            readabilityScore > 60 ? 'Easy' : readabilityScore > 40 ? 'Moderate' : 'Difficult',
          wordCount,
          sentenceCount,
          averageSentenceLength: Math.round(avgSentenceLength * 10) / 10,
        },
        seo: {
          score: Object.keys(topKeywords).length > 0 ? 75 : 50,
          keywordDensity: topKeywords,
          metaDescriptionLength: 0,
          titleLength: 0,
          headingStructure: content.match(/^#{1,6}\s+.+$/gm) || [],
        },
        tone: {
          primaryTone: maxTone.tone,
          confidence: Math.min(100, maxTone.score * 2),
          toneScores,
          suggestions: [],
        },
        grammar: {
          score: grammarScore,
          issues: grammarIssues,
          totalIssues: grammarIssues.length,
        },
        overallScore,
      },
      suggestions,
    };
  }

  private mockOptimizeContent(content: string, goals?: OptimizationGoals): OptimizationResult {
    // Simple mock optimization
    const changes: Array<{
      type: 'readability' | 'seo' | 'tone' | 'grammar' | 'structure';
      description: string;
      before: string;
      after: string;
      confidence: number;
    }> = [];
    let optimized = content;

    if (goals?.improveReadability) {
      // Mock readability improvement
      changes.push({
        type: 'readability',
        description: 'Improved sentence structure',
        before: content.substring(0, Math.min(50, content.length)),
        after: content.substring(0, Math.min(50, content.length)) + ' [optimized]',
        confidence: 75,
      });
    }

    if (goals?.fixGrammar && content.includes(' alot ')) {
      optimized = optimized.replace(' alot ', ' a lot ');
      changes.push({
        type: 'grammar',
        description: 'Fixed "alot" to "a lot"',
        before: 'alot',
        after: 'a lot',
        confidence: 95,
      });
    }

    const summary = {
      readabilityImprovement: goals?.improveReadability ? 15 : 0,
      seoImprovement: goals?.improveSEO ? 20 : 0,
      toneMatch: goals?.adjustTone ? 80 : 50,
      grammarImprovement: goals?.fixGrammar ? 25 : 0,
      overallImprovement: Math.round(
        (goals?.improveReadability ? 15 : 0) * 0.3 +
          (goals?.improveSEO ? 20 : 0) * 0.3 +
          (goals?.adjustTone ? 80 : 50) * 0.2 +
          (goals?.fixGrammar ? 25 : 0) * 0.2
      ),
    };

    return {
      optimizedContent: optimized,
      changes,
      summary,
      suggestions: [
        'Content optimized successfully.',
        'Consider adding more specific examples.',
        'Review the changes and adjust as needed.',
      ],
    };
  }

  // Utility methods
  calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  calculateComplexityScore(content: string): number {
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const lexicalDiversity = uniqueWords.size / Math.max(1, words.length);

    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgSentenceLength = sentenceCount > 0 ? words.length / sentenceCount : 0;

    const complexWordRatio = words.filter(w => w.length > 6).length / Math.max(1, words.length);

    const score = Math.round(
      lexicalDiversity * 40 + Math.min(avgSentenceLength / 20, 1) * 30 + complexWordRatio * 30
    );

    return Math.min(100, Math.max(0, score));
  }

  extractKeywords(content: string, maxKeywords: number = 10): string[] {
    const words = content
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3 && !this.isCommonWord(word));

    const frequency: Record<string, number> = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([word]) => word);
  }

  private isCommonWord(word: string): boolean {
    const commonWords = new Set([
      'the',
      'and',
      'that',
      'have',
      'for',
      'not',
      'with',
      'you',
      'this',
      'but',
      'from',
      'they',
      'say',
      'her',
      'she',
      'will',
      'one',
      'all',
      'would',
      'there',
      'their',
      'what',
      'out',
      'about',
      'who',
      'get',
      'which',
      'when',
      'make',
      'can',
      'like',
      'time',
      'just',
      'him',
      'know',
      'take',
      'person',
      'into',
      'year',
      'your',
      'good',
      'some',
      'could',
      'them',
      'see',
      'other',
      'than',
      'then',
      'now',
      'look',
      'only',
      'come',
      'its',
      'over',
      'think',
      'also',
      'back',
      'after',
      'use',
      'two',
      'how',
      'our',
      'work',
      'first',
      'well',
      'way',
      'even',
      'new',
      'want',
      'because',
      'any',
      'these',
      'give',
      'day',
      'most',
      'us',
    ]);

    return commonWords.has(word);
  }
}

// Singleton instance for easy import
export const aiContentService = new AIContentService();
