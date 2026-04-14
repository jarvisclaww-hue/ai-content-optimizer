'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/contexts/auth-context';
import { FileText, Upload, HardDrive, Activity } from 'lucide-react';
import Link from 'next/link';
import type { Document, Stats } from '@/lib/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/proxy/stats').then(r => r.ok ? r.json() : null),
      fetch('/api/proxy/documents?limit=5').then(r => r.ok ? r.json() : null),
    ]).then(([s, d]) => {
      setStats(s);
      setRecent(d?.documents || []);
    }).finally(() => setLoading(false));
  }, []);

  const name = (user?.metadata as Record<string, string>)?.name || user?.email?.split('@')[0] || 'there';

  const statCards = [
    { label: 'Total documents', value: stats?.total_documents ?? '—', icon: FileText },
    { label: 'Storage used', value: stats ? `${((stats.total_size_bytes || 0) / 1024 / 1024).toFixed(1)} MB` : '—', icon: HardDrive },
    { label: 'Avg. progress', value: stats ? `${Math.round(stats.average_progress || 0)}%` : '—', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Welcome back, {name}</h1>
        <p className="text-[13px] text-muted-foreground">Here&apos;s an overview of your document processing.</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="rounded-md bg-muted p-2"><s.icon className="h-4 w-4 text-muted-foreground" /></div>
              <div>
                <div className="text-2xl font-semibold tabular-nums">{loading ? '—' : s.value}</div>
                <div className="text-[12px] text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link href="/dashboard/upload"><Button size="sm"><Upload className="mr-1.5 h-3.5 w-3.5" />Upload documents</Button></Link>
        <Link href="/dashboard/api-keys"><Button size="sm" variant="outline">Manage API keys</Button></Link>
      </div>

      {/* Recent documents */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent documents</CardTitle>
            <Link href="/dashboard/documents"><Button variant="ghost" size="sm" className="text-xs h-7">View all</Button></Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-[13px] text-muted-foreground py-6 text-center">Loading...</p>
          ) : recent.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
              <p className="text-[13px] text-muted-foreground">No documents yet.</p>
              <Link href="/dashboard/upload"><Button size="sm" variant="outline" className="mt-3 text-xs">Upload your first document</Button></Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map(doc => (
                <Link key={doc.document_id || doc.id} href={`/dashboard/documents/${doc.document_id || doc.id}`} className="flex items-center justify-between rounded-md border px-3 py-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[13px] font-medium">{doc.original_filename}</div>
                      <div className="text-[11px] text-muted-foreground">{new Date(doc.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <Badge variant={doc.status === 'completed' ? 'default' : doc.status === 'failed' ? 'destructive' : 'secondary'} className="text-[11px]">
                    {doc.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
