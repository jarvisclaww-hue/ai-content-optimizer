'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Key, Plus, Copy, Trash2 } from 'lucide-react';
import type { ApiKeyRecord } from '@/lib/types';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchKeys = () => {
    fetch('/api/proxy/api-keys')
      .then(r => r.ok ? r.json() : { api_keys: [] })
      .then(d => setKeys(d.api_keys || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchKeys(); }, []);

  const createKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/proxy/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await res.json();
      if (res.ok && data.api_key) {
        setNewKeyValue(data.api_key);
        fetchKeys();
      }
    } finally {
      setCreating(false);
    }
  };

  const revokeKey = async (id: string) => {
    if (!confirm('Revoke this API key? This cannot be undone.')) return;
    await fetch(`/api/proxy/api-keys/${id}`, { method: 'DELETE' });
    fetchKeys();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">API Keys</h1>
          <p className="text-[13px] text-muted-foreground">Manage API keys for programmatic access.</p>
        </div>

        <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="mr-1.5 h-3.5 w-3.5" />Create key</Button>
        <Dialog open={dialogOpen} onOpenChange={v => { setDialogOpen(v); if (!v) { setNewKeyName(''); setNewKeyValue(null); } }}>
          <DialogContent>
            {newKeyValue ? (
              <>
                <DialogHeader>
                  <DialogTitle>API key created</DialogTitle>
                  <DialogDescription>Copy this key now — it won&apos;t be shown again.</DialogDescription>
                </DialogHeader>
                <div className="rounded-md bg-muted p-3 font-mono text-[13px] break-all select-all">{newKeyValue}</div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(newKeyValue)}>
                    <Copy className="mr-1.5 h-3.5 w-3.5" />Copy
                  </Button>
                  <Button onClick={() => { setDialogOpen(false); setNewKeyValue(null); setNewKeyName(''); }}>Done</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Create API key</DialogTitle>
                  <DialogDescription>Give your key a name so you can identify it later.</DialogDescription>
                </DialogHeader>
                <div className="space-y-1.5">
                  <Label htmlFor="key-name">Name</Label>
                  <Input id="key-name" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="e.g. Production API" disabled={creating} />
                </div>
                <DialogFooter>
                  <Button onClick={createKey} disabled={creating || !newKeyName.trim()}>
                    {creating ? 'Creating...' : 'Create'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="text-[13px] text-muted-foreground py-12 text-center">Loading...</p>
          ) : keys.length === 0 ? (
            <div className="py-12 text-center">
              <Key className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
              <p className="text-[13px] text-muted-foreground">No API keys yet.</p>
            </div>
          ) : (
            <div className="divide-y">
              {keys.map(key => (
                <div key={key.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-[13px] font-medium">{key.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      <span className="font-mono">{key.prefix}...</span>
                      &middot; Created {new Date(key.createdAt).toLocaleDateString()}
                      {key.lastUsedAt && <> &middot; Last used {new Date(key.lastUsedAt).toLocaleDateString()}</>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {(key.scopes as string[]).map(s => (
                        <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={() => revokeKey(key.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage hint */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <p className="text-[13px] font-medium mb-1">Using your API key</p>
          <p className="text-[12px] text-muted-foreground mb-2">Add it to the X-API-Key header in your requests:</p>
          <div className="rounded bg-background p-2 font-mono text-[12px]">
            curl -H &quot;X-API-Key: YOUR_KEY&quot; https://document-intelligence-api-production.up.railway.app/api/v1/documents
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
