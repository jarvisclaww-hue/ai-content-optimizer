import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    let parsed: URL;
    try {
      parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      return NextResponse.json({ error: 'Invalid URL. Include https://' }, { status: 400 });
    }

    // Fetch the page
    const response = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': 'PRIA-ContentOptimizer/1.0 (content analysis tool)',
        Accept: 'text/html,application/xhtml+xml,text/plain',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    const html = await response.text();

    let text: string;

    if (contentType.includes('text/plain')) {
      text = html;
    } else {
      // Strip HTML to plain text
      text = html
        // Remove scripts and styles
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<nav[\s\S]*?<\/nav>/gi, '')
        .replace(/<header[\s\S]*?<\/header>/gi, '')
        .replace(/<footer[\s\S]*?<\/footer>/gi, '')
        // Remove HTML tags
        .replace(/<[^>]+>/g, ' ')
        // Decode common entities
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        // Clean whitespace
        .replace(/\s+/g, ' ')
        .trim();
    }

    if (!text || text.length < 10) {
      return NextResponse.json(
        { error: 'Could not extract meaningful text from this URL.' },
        { status: 422 }
      );
    }

    // Extract page title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : parsed.hostname;

    // Extract meta description
    const metaMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
    );
    const description = metaMatch ? metaMatch[1].trim() : '';

    // Truncate if very long
    const maxChars = 10000;
    const truncated = text.length > maxChars;
    const content = truncated ? text.slice(0, maxChars) : text;

    return NextResponse.json({
      content,
      title,
      description,
      url: parsed.toString(),
      charCount: content.length,
      wordCount: content.split(/\s+/).filter((w: string) => w.length > 0).length,
      truncated,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json({ error: 'URL took too long to respond (10s timeout).' }, { status: 504 });
    }
    console.error('Scrape error:', error);
    return NextResponse.json({ error: 'Failed to fetch URL.' }, { status: 500 });
  }
}
