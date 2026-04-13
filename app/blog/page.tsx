import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical guides on automating document workflows for professional services firms.',
};

const posts = [
  {
    slug: 'automate-invoice-processing',
    title: 'How to automate invoice processing for small accounting firms',
    description:
      "Most bookkeeping firms spend 5–10 hours a week manually keying invoice data. Here's how to build a pipeline that extracts vendor, amount, date, and GST from any PDF or image — and exports a Xero-ready CSV.",
    date: 'April 14, 2026',
    tag: 'Guide',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              PRIA
            </Link>
            <span className="text-border">/</span>
            <span className="text-[13px] font-medium">Blog</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Blog</h1>
        <p className="text-muted-foreground text-[15px] mb-10">
          Practical guides on automating document workflows.
        </p>

        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[11px]">
                      {post.tag}
                    </Badge>
                    <span className="text-[12px] text-muted-foreground">{post.date}</span>
                    <span className="text-[12px] text-muted-foreground">
                      &middot; {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="text-[13px] leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 -ml-2">
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
