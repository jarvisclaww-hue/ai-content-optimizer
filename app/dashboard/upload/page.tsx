'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface UploadItem {
  file: File;
  status: 'pending' | 'uploading' | 'done' | 'error';
  documentId?: string;
  error?: string;
}

const ACCEPTED = '.pdf,.docx,.doc,.txt,.html,.htm,.jpg,.jpeg,.png,.tiff,.tif';
const MAX_SIZE = 100 * 1024 * 1024;

export default function UploadPage() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList) => {
    const newItems: UploadItem[] = Array.from(files).map(file => ({ file, status: 'pending' as const }));
    setItems(prev => [...prev, ...newItems]);

    // Upload each file
    newItems.forEach((item, idx) => {
      const globalIdx = items.length + idx;
      uploadFile(item.file, globalIdx);
    });
  }, [items.length]);

  const uploadFile = async (file: File, idx: number) => {
    if (file.size > MAX_SIZE) {
      setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'error', error: 'File too large (100MB max)' } : it));
      return;
    }

    setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'uploading' } : it));

    try {
      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/proxy/documents', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || 'Upload failed');
      }

      setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'done', documentId: data.document_id } : it));
    } catch (err) {
      setItems(prev => prev.map((it, i) => i === idx ? { ...it, status: 'error', error: err instanceof Error ? err.message : 'Upload failed' } : it));
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeItem = (idx: number) => {
    setItems(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Upload documents</h1>
        <p className="text-[13px] text-muted-foreground">Upload files to extract text, entities, and structured data.</p>
      </div>

      {/* Drop zone */}
      <Card>
        <CardContent className="p-0">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center p-16 transition-colors ${dragOver ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
          >
            <Upload className="mb-3 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm font-medium mb-1">Drop files here or click to browse</p>
            <p className="text-[12px] text-muted-foreground">PDF, DOCX, JPEG, PNG, TIFF, TXT, HTML — up to 100MB</p>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED}
              multiple
              className="hidden"
              onChange={e => { if (e.target.files?.length) addFiles(e.target.files); }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload queue */}
      {items.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Upload queue ({items.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium truncate">{item.file.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {(item.file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === 'pending' && <Badge variant="secondary" className="text-[11px]">Pending</Badge>}
                  {item.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {item.status === 'done' && (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <Link href={`/dashboard/documents/${item.documentId}`}>
                        <Button variant="ghost" size="sm" className="text-xs h-6">View</Button>
                      </Link>
                    </>
                  )}
                  {item.status === 'error' && (
                    <span className="text-[12px] text-destructive">{item.error}</span>
                  )}
                  <button onClick={() => removeItem(i)}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
