import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    if (body.content.length > 10000) {
      return NextResponse.json(
        { error: 'Content must be less than 10,000 characters' },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }

    const prompt = `Analyze the following content and return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "analysis": {
    "readability": { "score": <0-100>, "gradeLevel": "<grade>", "readingEase": "<Easy|Moderate|Difficult>", "wordCount": <n>, "sentenceCount": <n>, "averageSentenceLength": <n> },
    "seo": { "score": <0-100>, "keywordDensity": { "<word>": <percentage> }, "metaDescriptionLength": 0, "titleLength": 0, "headingStructure": [] },
    "tone": { "primaryTone": "<formal|casual|persuasive|informative|neutral>", "confidence": <0-100>, "toneScores": { "formal": <n>, "casual": <n>, "persuasive": <n>, "informative": <n> }, "suggestions": ["<suggestion>"] },
    "grammar": { "score": <0-100>, "issues": [{ "type": "<type>", "message": "<msg>", "suggestion": "<fix>", "position": { "start": 0, "end": 0 } }], "totalIssues": <n> },
    "overallScore": <0-100>
  },
  "suggestions": ["<suggestion1>", "<suggestion2>", "<suggestion3>"]
}

Content to analyze:
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
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return NextResponse.json({ error: 'AI analysis failed' }, { status: 502 });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 502 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content Analysis API',
    powered_by: 'AI via OpenRouter',
    endpoints: { POST: 'Analyze content' },
  });
}
