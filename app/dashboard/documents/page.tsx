'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/lib/types';

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // eslint-disable-line
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: String(limit), offset: String(page * limit) });
    if (status) params.set('status', status);

    fetch(`/api/proxy/documents?${params}`)
      .then(r => r.ok ? r.json() : { documents: [], total: 0 })
      .then(d => { setDocs(d.documents || []); setTotal(d.total || 0); })
      .finally(() => setLoading(false));
  }, [page, status]);

  const totalPages = Math.ceil(total / limit);

  const statusBadge = (s: string) => {
    if (s === 'completed') return <Badge className="text-[11px]">Completed</Badge>;
    if (s === 'failed') return <Badge variant="destructive" className="text-[11px]">Failed</Badge>;
    if (s === 'processing') return <Badge variant="secondary" className="text-[11px]">Processing</Badge>;
    return <Badge variant="outline" className="text-[11px]">{s}</Badge>;
  };

  const sel = 'h-8 rounded-md border bg-background px-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-ring';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Documents</h1>
          <p className="text-[13px] text-muted-foreground">{total} document{total !== 1 ? 's' : ''} total</p>
        </div>
        <Link href="/dashboard/upload"><Button size="sm">Upload</Button></Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <select className={sel} value={status} onChange={e => { setStatus(e.target.value); setPage(0); }}>
          <option value="">All statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PROCESSING">Processing</option>
          <option value="FAILED">Failed</option>
          <option value="UPLOADED">Uploaded</option>
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-[13px] text-muted-foreground py-12 text-center">Loading...</p>
          ) : docs.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
              <p className="text-[13px] text-muted-foreground">No documents found.</p>
            </div>
          ) : (
            <div className="divide-y">
              {docs.map(doc => (
                <Link
                  key={doc.document_id || doc.id}
                  href={`/dashboard/documents/${doc.document_id || doc.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium truncate">{doc.original_filename}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {(doc.file_size_bytes / 1024).toFixed(0)} KB &middot; {doc.file_type.split('/').pop()} &middot; {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {statusBadge(doc.status)}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[13px] text-muted-foreground">
          <span>Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-7" onClick={() => setPage(p => p - 1)} disabled={page === 0}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="outline" className="h-7" onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
