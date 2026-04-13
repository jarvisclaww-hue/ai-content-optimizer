import { NextRequest, NextResponse } from 'next/server';

export interface OptimizationRequest {
  content: string;
  optimizationGoals?: {
    improveReadability?: boolean;
    improveSEO?: boolean;
    adjustTone?: string; // 'formal', 'casual', 'persuasive', 'informative'
    fixGrammar?: boolean;
    targetAudience?: string; // 'general', 'technical', 'business', 'academic'
    wordCountTarget?: number;
  };
}

export interface OptimizationResponse {
  optimizedContent: string;
  originalContent: string;
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

// Mock optimization function
function optimizeContent(content: string, goals = {}): OptimizationResponse {
  const defaultGoals = {
    improveReadability: true,
    improveSEO: true,
    adjustTone: 'neutral',
    fixGrammar: true,
    targetAudience: 'general',
    wordCountTarget: null,
    ...goals,
  };

  let optimized = content;
  const changes: Array<{
    type: 'readability' | 'seo' | 'tone' | 'grammar' | 'structure';
    description: string;
    before: string;
    after: string;
    confidence: number;
  }> = [];
  const suggestions: string[] = [];

  // Apply readability improvements
  if (defaultGoals.improveReadability) {
    // Split long sentences
    const sentences = optimized.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 25);

    if (longSentences.length > 0) {
      longSentences.forEach(sentence => {
        const words = sentence.split(/\s+/);
        if (words.length > 25) {
          const midPoint = Math.floor(words.length / 2);
          const firstPart = words.slice(0, midPoint).join(' ');
          const secondPart = words.slice(midPoint).join(' ');
          const newSentence = `${firstPart}. ${secondPart}`;

          if (optimized.includes(sentence)) {
            changes.push({
              type: 'readability',
              description: 'Split long sentence for better readability',
              before: sentence,
              after: newSentence,
              confidence: 85,
            });
            optimized = optimized.replace(sentence, newSentence);
          }
        }
      });
      suggestions.push('Split long sentences to improve readability.');
    }
  }

  // Apply SEO improvements
  if (defaultGoals.improveSEO) {
    // Add keywords if content is short
    if (optimized.split(/\s+/).length < 100) {
      const seoKeywords = ['content', 'optimization', 'quality', 'engagement', 'audience'];
      const hasKeywords = seoKeywords.some(keyword => optimized.toLowerCase().includes(keyword));

      if (!hasKeywords) {
        const addition = ` This content focuses on quality optimization for better audience engagement.`;
        changes.push({
          type: 'seo',
          description: 'Added SEO keywords for better search visibility',
          before: optimized.slice(-50),
          after: addition,
          confidence: 75,
        });
        optimized += addition;
        suggestions.push('Added relevant SEO keywords to improve search visibility.');
      }
    }

    // Ensure paragraph structure
    const paragraphs = optimized.split(/\n\s*\n/);
    if (paragraphs.length === 1 && optimized.length > 200) {
      // Split into paragraphs
      const sentences = optimized.match(/[^.!?]+[.!?]+/g) || [];
      if (sentences.length > 3) {
        const newParagraphs = [];
        for (let i = 0; i < sentences.length; i += 2) {
          newParagraphs.push(sentences.slice(i, i + 2).join(' '));
        }
        const newContent = newParagraphs.join('\n\n');
        changes.push({
          type: 'structure',
          description: 'Added paragraph breaks for better readability and SEO',
          before: optimized.substring(0, 100) + '...',
          after: newContent.substring(0, 100) + '...',
          confidence: 80,
        });
        optimized = newContent;
      }
    }
  }

  // Adjust tone
  if (defaultGoals.adjustTone && defaultGoals.adjustTone !== 'neutral') {
    const toneAdjustments = {
      formal: {
        replacements: [
          ['get', 'obtain'],
          ['a lot of', 'numerous'],
          ['stuff', 'materials'],
          ['cool', 'impressive'],
          ['hey', 'greetings'],
        ],
        additions: ['Furthermore,', 'Consequently,', 'Nevertheless,'],
      },
      casual: {
        replacements: [
          ['obtain', 'get'],
          ['numerous', 'a lot of'],
          ['materials', 'stuff'],
          ['impressive', 'cool'],
          ['greetings', 'hey'],
        ],
        additions: ['By the way,', 'Actually,', 'You know,'],
      },
      persuasive: {
        replacements: [
          ['could', 'should'],
          ['might', 'must'],
          ['possibly', 'definitely'],
          ['consider', 'need to'],
          ['option', 'solution'],
        ],
        additions: ['Importantly,', 'Critically,', 'Essentially,'],
      },
      informative: {
        replacements: [
          ['think', 'research indicates'],
          ['feel', 'data suggests'],
          ['maybe', 'studies show'],
          ['probably', 'analysis reveals'],
        ],
        additions: [
          'According to recent findings,',
          'Research demonstrates that,',
          'Data analysis indicates,',
        ],
      },
    };

    const adjustments = toneAdjustments[defaultGoals.adjustTone as keyof typeof toneAdjustments];
    if (adjustments) {
      adjustments.replacements.forEach(([from, to]) => {
        const regex = new RegExp(`\\b${from}\\b`, 'gi');
        if (regex.test(optimized)) {
          changes.push({
            type: 'tone',
            description: `Adjusted tone to be more ${defaultGoals.adjustTone}`,
            before: from,
            after: to,
            confidence: 70,
          });
          optimized = optimized.replace(regex, to);
        }
      });

      // Add tone-appropriate transitions
      if (optimized.length > 100 && Math.random() > 0.5) {
        const addition = adjustments.additions[0] + ' ';
        optimized = addition + optimized;
        changes.push({
          type: 'tone',
          description: `Added ${defaultGoals.adjustTone} transition`,
          before: '',
          after: addition,
          confidence: 65,
        });
      }
    }
    suggestions.push(
      `Adjusted tone to be more ${defaultGoals.adjustTone} for the target audience.`
    );
  }

  // Fix common grammar issues
  if (defaultGoals.fixGrammar) {
    const grammarFixes = [
      [' alot ', ' a lot '],
      ['its been', "it's been"],
      ['their going', "they're going"],
      ['your welcome', "you're welcome"],
      ['should of', 'should have'],
      ['could of', 'could have'],
      ['would of', 'would have'],
    ];

    grammarFixes.forEach(([wrong, correct]) => {
      if (optimized.toLowerCase().includes(wrong)) {
        const regex = new RegExp(wrong, 'gi');
        changes.push({
          type: 'grammar',
          description: 'Fixed common grammar mistake',
          before: wrong,
          after: correct,
          confidence: 95,
        });
        optimized = optimized.replace(regex, correct);
      }
    });

    // Capitalize sentences
    const sentenceRegex = /(^|\.\s+)([a-z])/g;
    optimized = optimized.replace(sentenceRegex, (match, p1, p2) => {
      return p1 + p2.toUpperCase();
    });

    if (content.match(sentenceRegex)) {
      changes.push({
        type: 'grammar',
        description: 'Capitalized sentence beginnings',
        before: '...',
        after: '...',
        confidence: 100,
      });
    }
  }

  // Adjust word count if target specified
  if (defaultGoals.wordCountTarget) {
    const currentWords = optimized.split(/\s+/).length;
    const target = defaultGoals.wordCountTarget;

    if (currentWords < target * 0.8) {
      // Add content
      const addition = ` This additional content provides more depth and detail on the topic, ensuring comprehensive coverage for readers seeking thorough information. Further elaboration helps establish authority and improves engagement metrics.`;
      changes.push({
        type: 'structure',
        description: 'Expanded content to meet word count target',
        before: optimized.slice(-50),
        after: addition,
        confidence: 60,
      });
      optimized += addition;
      suggestions.push('Expanded content to provide more comprehensive coverage.');
    } else if (currentWords > target * 1.2) {
      // Trim content (simple implementation)
      const words = optimized.split(/\s+/);
      if (words.length > target) {
        const trimmed = words.slice(0, target).join(' ') + '...';
        changes.push({
          type: 'structure',
          description: 'Trimmed content to meet word count target',
          before: optimized.substring(optimized.length - 100),
          after: trimmed.substring(trimmed.length - 100),
          confidence: 70,
        });
        optimized = trimmed;
        suggestions.push('Trimmed content to be more concise and focused.');
      }
    }
  }

  // Calculate improvement metrics (mock)
  const readabilityImprovement = defaultGoals.improveReadability ? 15 + Math.random() * 10 : 0;
  const seoImprovement = defaultGoals.improveSEO ? 20 + Math.random() * 15 : 0;
  const toneMatch = defaultGoals.adjustTone ? 75 + Math.random() * 20 : 50;
  const grammarImprovement = defaultGoals.fixGrammar ? 25 + Math.random() * 10 : 0;

  const overallImprovement = Math.round(
    readabilityImprovement * 0.3 + seoImprovement * 0.3 + toneMatch * 0.2 + grammarImprovement * 0.2
  );

  return {
    optimizedContent: optimized,
    originalContent: content,
    changes,
    summary: {
      readabilityImprovement: Math.round(readabilityImprovement),
      seoImprovement: Math.round(seoImprovement),
      toneMatch: Math.round(toneMatch),
      grammarImprovement: Math.round(grammarImprovement),
      overallImprovement,
    },
    suggestions:
      suggestions.length > 0
        ? suggestions
        : [
            'Content is well-optimized. Consider adding more specific examples or data points.',
            'The structure is good. You could add bullet points or numbered lists for key points.',
            'Consider adding a call-to-action to increase engagement.',
          ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: OptimizationRequest = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate content length
    if (body.content.length > 20000) {
      return NextResponse.json(
        { error: 'Content must be less than 20,000 characters' },
        { status: 400 }
      );
    }

    // Perform optimization
    const optimization = optimizeContent(body.content, body.optimizationGoals);

    return NextResponse.json(optimization);
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json({ error: 'Failed to optimize content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Content Optimization API',
      endpoints: {
        POST: 'Optimize content with AI-powered suggestions',
        parameters: {
          content: 'string (required)',
          optimizationGoals: 'object (optional)',
        },
      },
    },
    { status: 200 }
  );
}
