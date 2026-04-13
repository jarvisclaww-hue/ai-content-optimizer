import { NextRequest, NextResponse } from 'next/server';

export interface ExportRequest {
  content: string;
  format: 'markdown' | 'html' | 'plaintext' | 'pdf' | 'docx';
  metadata?: {
    title?: string;
    author?: string;
    keywords?: string[];
    description?: string;
  };
  includeAnalysis?: boolean;
  includeOptimization?: boolean;
}

function exportToMarkdown(
  content: string,
  metadata?: {
    title?: string;
    author?: string;
    keywords?: string[];
    description?: string;
    includeTimestamp?: boolean;
  }
): string {
  let markdown = '';

  if (metadata?.title) {
    markdown += `# ${metadata.title}\n\n`;
  }

  if (metadata?.description) {
    markdown += `> ${metadata.description}\n\n`;
  }

  if (metadata?.author) {
    markdown += `**Author**: ${metadata.author}\n\n`;
  }

  if (metadata?.keywords && metadata.keywords.length > 0) {
    markdown += `**Keywords**: ${metadata.keywords.join(', ')}\n\n`;
  }

  markdown += `${content}\n\n`;

  if (metadata?.includeTimestamp) {
    markdown += `---\n*Exported on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}*\n`;
  }

  return markdown;
}

function exportToHTML(
  content: string,
  metadata?: {
    title?: string;
    author?: string;
    keywords?: string[];
    description?: string;
  }
): string {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata?.title || 'Exported Content'}</title>`;

  if (metadata?.description) {
    html += `\n    <meta name="description" content="${metadata.description}">`;
  }

  if (metadata?.keywords && metadata.keywords.length > 0) {
    html += `\n    <meta name="keywords" content="${metadata.keywords.join(', ')}">`;
  }

  html += `\n    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { color: #1a1a1a; }
        h2 { color: #2d2d2d; }
        h3 { color: #404040; }
        .metadata {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>`;

  if (metadata?.title) {
    html += `\n    <h1>${metadata.title}</h1>`;
  }

  if (
    metadata?.description ||
    metadata?.author ||
    (metadata?.keywords && metadata.keywords.length > 0)
  ) {
    html += '\n    <div class="metadata">';
    if (metadata?.description) {
      html += `\n        <p><strong>Description:</strong> ${metadata.description}</p>`;
    }
    if (metadata?.author) {
      html += `\n        <p><strong>Author:</strong> ${metadata.author}</p>`;
    }
    if (metadata?.keywords && metadata.keywords.length > 0) {
      html += `\n        <p><strong>Keywords:</strong> ${metadata.keywords.join(', ')}</p>`;
    }
    html += '\n    </div>';
  }

  // Convert markdown-like content to HTML (simplified)
  const htmlContent = content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  html += `\n    <div class="content">\n        <p>${htmlContent}</p>\n    </div>`;
  html += `\n    <div class="footer">\n        Exported on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n    </div>`;
  html += '\n</body>\n</html>';

  return html;
}

function exportToPlainText(
  content: string,
  metadata?: {
    title?: string;
    author?: string;
    keywords?: string[];
    description?: string;
  }
): string {
  let text = '';

  if (metadata?.title) {
    text += `${metadata.title}\n`;
    text += '='.repeat(metadata.title.length) + '\n\n';
  }

  if (metadata?.description) {
    text += `Description: ${metadata.description}\n\n`;
  }

  if (metadata?.author) {
    text += `Author: ${metadata.author}\n`;
  }

  if (metadata?.keywords && metadata.keywords.length > 0) {
    text += `Keywords: ${metadata.keywords.join(', ')}\n`;
  }

  if (metadata?.author || (metadata?.keywords && metadata.keywords.length > 0)) {
    text += '\n';
  }

  text += `${content}\n\n`;
  text += `---\nExported on ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;

  return text;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    if (!body.format || !['markdown', 'html', 'plaintext', 'pdf', 'docx'].includes(body.format)) {
      return NextResponse.json(
        { error: 'Valid format is required: markdown, html, plaintext, pdf, or docx' },
        { status: 400 }
      );
    }

    // Validate content length
    if (body.content.length > 50000) {
      return NextResponse.json(
        { error: 'Content must be less than 50,000 characters for export' },
        { status: 400 }
      );
    }

    let exportedContent: string;
    let contentType: string;
    let filename: string;

    switch (body.format) {
      case 'markdown':
        exportedContent = exportToMarkdown(body.content, body.metadata);
        contentType = 'text/markdown';
        filename = `content-${Date.now()}.md`;
        break;

      case 'html':
        exportedContent = exportToHTML(body.content, body.metadata);
        contentType = 'text/html';
        filename = `content-${Date.now()}.html`;
        break;

      case 'plaintext':
        exportedContent = exportToPlainText(body.content, body.metadata);
        contentType = 'text/plain';
        filename = `content-${Date.now()}.txt`;
        break;

      case 'pdf':
      case 'docx':
        // For PDF and DOCX, we would typically use a library like pdfkit or mammoth
        // For now, return a placeholder response
        return NextResponse.json({
          message: `${body.format.toUpperCase()} export requested`,
          note: 'PDF and DOCX export require additional server-side libraries',
          contentPreview: body.content.substring(0, 200) + '...',
          format: body.format,
          metadata: body.metadata,
          downloadUrl: null, // In real implementation, this would be a URL to the generated file
          alternativeFormats: ['markdown', 'html', 'plaintext'],
        });

      default:
        return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
    }

    // Create response with appropriate headers for download
    const response = new NextResponse(exportedContent);
    response.headers.set('Content-Type', contentType);
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return response;
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export content' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Content Export API',
      endpoints: {
        POST: 'Export content in various formats',
        parameters: {
          content: 'string (required)',
          format: 'string (required: markdown, html, plaintext, pdf, docx)',
          metadata: 'object (optional)',
        },
        supportedFormats: [
          { format: 'markdown', description: 'Markdown format with metadata' },
          { format: 'html', description: 'HTML document with styling' },
          { format: 'plaintext', description: 'Plain text with basic formatting' },
          { format: 'pdf', description: 'PDF document (requires additional setup)' },
          { format: 'docx', description: 'Microsoft Word document (requires additional setup)' },
        ],
      },
    },
    { status: 200 }
  );
}
