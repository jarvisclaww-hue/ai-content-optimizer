import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    if (body.content.length > 20000) {
      return NextResponse.json(
        { error: 'Content must be less than 20,000 characters' },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }

    const goals = body.optimizationGoals || {};
    const goalsList = [];
    if (goals.improveReadability)
      goalsList.push('improve readability (shorter sentences, clearer language)');
    if (goals.improveSEO)
      goalsList.push('improve SEO (add relevant keywords naturally, better structure)');
    if (goals.adjustTone && goals.adjustTone !== 'neutral')
      goalsList.push(`adjust tone to be more ${goals.adjustTone}`);
    if (goals.fixGrammar) goalsList.push('fix grammar and spelling errors');
    if (goals.targetAudience) goalsList.push(`target ${goals.targetAudience} audience`);

    const prompt = `You are a content optimization expert. Optimize the following content based on these goals: ${goalsList.join(', ') || 'general improvement'}.

Return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "optimizedContent": "<the improved content>",
  "changes": [
    { "type": "<readability|seo|tone|grammar|structure>", "description": "<what changed>", "before": "<original snippet>", "after": "<changed snippet>", "confidence": <50-100> }
  ],
  "summary": {
    "readabilityImprovement": <0-100>,
    "seoImprovement": <0-100>,
    "toneMatch": <0-100>,
    "grammarImprovement": <0-100>,
    "overallImprovement": <0-100>
  },
  "suggestions": ["<further suggestion 1>", "<further suggestion 2>"]
}

Content to optimize:
"""
${body.content}
"""`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-content-optimizer-pi.vercel.app',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return NextResponse.json({ error: 'AI optimization failed' }, { status: 502 });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 502 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json({ error: 'Failed to optimize content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content Optimization API',
    powered_by: 'AI via OpenRouter',
    endpoints: { POST: 'Optimize content with AI' },
  });
}
