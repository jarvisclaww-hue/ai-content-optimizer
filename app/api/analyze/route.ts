import { NextRequest, NextResponse } from 'next/server';

export interface ContentAnalysisRequest {
  content: string;
  options?: {
    analyzeReadability?: boolean;
    analyzeSEO?: boolean;
    analyzeTone?: boolean;
    analyzeGrammar?: boolean;
  };
}

export interface ContentAnalysisResponse {
  analysis: {
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
  };
  suggestions: string[];
}

// Mock analysis function - in a real app, this would use AI/ML services
function analyzeContent(content: string): ContentAnalysisResponse {
  // Calculate basic metrics
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const averageSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;

  // Readability score (Flesch-Kincaid Grade Level approximation)
  const readabilityScore = Math.min(100, Math.max(0, 100 - averageSentenceLength * 1.5));
  let gradeLevel = 'College';
  if (readabilityScore > 80) gradeLevel = '5th Grade';
  else if (readabilityScore > 60) gradeLevel = '8th Grade';
  else if (readabilityScore > 50) gradeLevel = 'High School';

  // SEO analysis
  const words = content
    .toLowerCase()
    .split(/\W+/)
    .filter(w => w.length > 2);
  const wordFrequency: Record<string, number> = {};
  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Get top keywords
  const topKeywords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .reduce(
      (acc, [word, count]) => {
        acc[word] = Math.round((count / words.length) * 10000) / 100; // percentage
        return acc;
      },
      {} as Record<string, number>
    );

  // Tone analysis
  const toneWords = {
    formal: ['therefore', 'however', 'furthermore', 'consequently', 'nevertheless'],
    casual: ['awesome', 'cool', 'hey', 'yeah', 'stuff'],
    persuasive: ['should', 'must', 'need to', 'essential', 'critical'],
    informative: ['according to', 'research shows', 'data indicates', 'studies suggest'],
  };

  let primaryTone = 'neutral';
  let maxScore = 0;
  const toneScores: Record<string, number> = {};

  Object.entries(toneWords).forEach(([tone, words]) => {
    let score = 0;
    words.forEach(word => {
      if (content.toLowerCase().includes(word)) score++;
    });
    toneScores[tone] = score;
    if (score > maxScore) {
      maxScore = score;
      primaryTone = tone;
    }
  });

  // Grammar check (mock)
  const grammarIssues = [];
  if (content.length > 0) {
    // Mock some common issues
    if (content.includes(' alot ')) {
      grammarIssues.push({
        type: 'spelling',
        message: '"alot" should be "a lot"',
        suggestion: 'Use "a lot" instead of "alot"',
        position: { start: content.indexOf(' alot '), end: content.indexOf(' alot ') + 5 },
      });
    }
    if (content.includes(' its ') && !content.includes(" it's ")) {
      grammarIssues.push({
        type: 'grammar',
        message: 'Possible incorrect use of "its" vs "it\'s"',
        suggestion: 'Check if you mean "it is" (it\'s) or possessive (its)',
        position: { start: content.indexOf(' its '), end: content.indexOf(' its ') + 4 },
      });
    }
  }

  const grammarScore = Math.max(0, 100 - grammarIssues.length * 10);

  // Overall score (weighted average)
  const overallScore = Math.round(
    readabilityScore * 0.3 +
      (Object.keys(topKeywords).length > 0 ? 70 : 50) * 0.3 +
      (maxScore > 0 ? 80 : 60) * 0.2 +
      grammarScore * 0.2
  );

  const suggestions = [];
  if (readabilityScore < 60) {
    suggestions.push('Consider using shorter sentences to improve readability.');
  }
  if (Object.keys(topKeywords).length < 3) {
    suggestions.push('Add more relevant keywords to improve SEO.');
  }
  if (grammarScore < 80) {
    suggestions.push('Review grammar suggestions to improve writing quality.');
  }
  if (primaryTone === 'neutral' && content.length > 100) {
    suggestions.push(
      'Consider defining a clearer tone (formal, casual, persuasive) for your content.'
    );
  }

  return {
    analysis: {
      readability: {
        score: Math.round(readabilityScore),
        gradeLevel,
        readingEase:
          readabilityScore > 60 ? 'Easy' : readabilityScore > 40 ? 'Moderate' : 'Difficult',
        wordCount,
        sentenceCount,
        averageSentenceLength: Math.round(averageSentenceLength * 10) / 10,
      },
      seo: {
        score: Object.keys(topKeywords).length > 0 ? 75 : 50,
        keywordDensity: topKeywords,
        metaDescriptionLength: 0, // Would need meta description input
        titleLength: 0, // Would need title input
        headingStructure: content.match(/^#{1,6}\s+.+$/gm) || [],
      },
      tone: {
        primaryTone,
        confidence: maxScore > 0 ? Math.min(100, maxScore * 20) : 50,
        toneScores,
        suggestions:
          primaryTone === 'formal'
            ? ['Consider adding more transition words for flow.']
            : primaryTone === 'casual'
              ? ['Add more conversational phrases for engagement.']
              : ['Consider defining your target audience more clearly.'],
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

export async function POST(request: NextRequest) {
  try {
    const body: ContentAnalysisRequest = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate content length
    if (body.content.length > 10000) {
      return NextResponse.json(
        { error: 'Content must be less than 10,000 characters' },
        { status: 400 }
      );
    }

    // Perform analysis
    const analysis = analyzeContent(body.content);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Content Analysis API',
      endpoints: {
        POST: 'Analyze content',
        parameters: {
          content: 'string (required)',
          options: 'object (optional)',
        },
      },
    },
    { status: 200 }
  );
}
