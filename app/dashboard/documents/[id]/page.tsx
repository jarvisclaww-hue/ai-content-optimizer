'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, FileText, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/lib/types';

const entityColors: Record<string, string> = {
  PERSON: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  ORGANIZATION: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  DATE: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  MONEY: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  LOCATION: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
};

export default function DocumentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [doc, setDoc] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const poll = async () => {
      const res = await fetch(`/api/proxy/documents/${id}`);
      if (res.ok) {
        const data = await res.json();
        setDoc(data);
        setLoading(false);

        // Keep polling if still processing
        if (data.status === 'processing' || data.status === 'queued' || data.status === 'uploaded') {
          setTimeout(poll, 2000);
        }
      } else {
        setLoading(false);
      }
    };

    poll();
  }, [id]);

  const exportJSON = () => {
    if (!doc?.result) return;
    const blob = new Blob([JSON.stringify(doc.result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.document_id || id}-result.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!doc?.result?.entities) return;
    const header = 'Type,Value,Confidence\n';
    const rows = doc.result.entities.map(e => `"${e.type}","${e.value}",${e.confidence || ''}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.document_id || id}-entities.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="py-12 text-center">
        <p className="text-[13px] text-muted-foreground">Document not found.</p>
        <Link href="/dashboard/documents"><Button variant="outline" size="sm" className="mt-3">Back to documents</Button></Link>
      </div>
    );
  }

  const isProcessing = ['processing', 'queued', 'uploaded'].includes(doc.status);
  const entities = doc.result?.entities || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link href="/dashboard/documents" className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="h-3.5 w-3.5" />Back to documents
          </Link>
          <h1 className="text-xl font-semibold flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            {doc.original_filename || (doc as any).originalFilename}
          </h1>
        </div>
        <Badge variant={doc.status === 'completed' ? 'default' : doc.status === 'failed' ? 'destructive' : 'secondary'}>
          {isProcessing && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
          {doc.status}
        </Badge>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-[13px] text-muted-foreground">
        <span>{((doc.file_size_bytes || (doc as any).fileSizeBytes || 0) / 1024).toFixed(0)} KB</span>
        <span>{doc.file_type || (doc as any).fileType}</span>
        <span>Uploaded {new Date(doc.created_at || (doc as any).createdAt).toLocaleString()}</span>
        {doc.completed_at && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Completed {new Date(doc.completed_at).toLocaleString()}</span>}
        {doc.result?.processing_time_ms && <span>{doc.result.processing_time_ms}ms processing</span>}
      </div>

      {/* Processing state */}
      {isProcessing && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Processing document...</p>
              <p className="text-[12px] text-muted-foreground">Progress: {doc.progress || 0}%</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {doc.status === 'failed' && doc.error_message && (
        <Card className="border-destructive/50">
          <CardContent className="py-4">
            <p className="text-sm text-destructive">{doc.error_message}</p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {doc.status === 'completed' && doc.result && (
        <>
          {/* Export buttons */}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs" onClick={exportJSON}>
              <Download className="mr-1.5 h-3 w-3" />JSON
            </Button>
            <Button size="sm" variant="outline" className="text-xs" onClick={exportCSV}>
              <Download className="mr-1.5 h-3 w-3" />CSV (entities)
            </Button>
          </div>

          <Tabs defaultValue="text">
            <TabsList className="h-9">
              <TabsTrigger value="text" className="text-[13px]">Extracted Text</TabsTrigger>
              <TabsTrigger value="entities" className="text-[13px]">Entities ({entities.length})</TabsTrigger>
              <TabsTrigger value="summary" className="text-[13px]">Summary</TabsTrigger>
              <TabsTrigger value="json" className="text-[13px]">Raw JSON</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <Card>
                <CardContent className="p-5">
                  <pre className="whitespace-pre-wrap text-[14px] leading-[1.7] font-sans">{doc.result.extracted_text}</pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="entities">
              <Card>
                <CardContent className="p-5">
                  {entities.length === 0 ? (
                    <p className="text-[13px] text-muted-foreground text-center py-4">No entities detected.</p>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(entities.reduce((a: Record<string, number>, e) => { a[e.type] = (a[e.type] || 0) + 1; return a; }, {}))
                          .map(([type, count]) => (
                            <Badge key={type} variant="secondary" className={`text-[11px] ${entityColors[type] || ''}`}>
                              {type} ({count})
                            </Badge>
                          ))}
                      </div>
                      <table className="w-full text-[13px]">
                        <thead>
                          <tr className="border-b text-left">
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Type</th>
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Value</th>
                            <th className="pb-2 font-medium text-muted-foreground">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entities.map((e, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-2 pr-4"><Badge variant="secondary" className={`text-[11px] ${entityColors[e.type] || ''}`}>{e.type}</Badge></td>
                              <td className="py-2 pr-4 font-mono text-[13px]">{e.value}</td>
                              <td className="py-2 text-[13px] text-muted-foreground">{e.confidence ? `${(e.confidence * 100).toFixed(0)}%` : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Auto-generated summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">{doc.result.summary || 'No summary available.'}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="json">
              <Card>
                <CardContent className="p-5">
                  <pre className="overflow-x-auto whitespace-pre font-mono text-[12px] leading-relaxed">{JSON.stringify(doc.result, null, 2)}</pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
