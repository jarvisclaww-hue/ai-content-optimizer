'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { trackEvent } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const blank: FormData = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const selectClass =
  'w-full h-9 px-3 py-1 rounded-md border bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50';

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(blank);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Submission failed.');
      }
      trackEvent('form_submit', 'contact', form.projectType);
      setDone(true);
      setForm(blank);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="font-medium mb-1">Message received.</p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll review your project and reply within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={set}
                required
                disabled={busy}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={set}
                required
                disabled={busy}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="projectType">Service *</Label>
            <select
              id="projectType"
              name="projectType"
              className={selectClass}
              value={form.projectType}
              onChange={set}
              required
              disabled={busy}
            >
              <option value="">Select&hellip;</option>
              <option value="document-processing">Document Processing</option>
              <option value="content-analysis">Content Analysis</option>
              <option value="system-integration">System Integration (Xero, CRM, etc.)</option>
              <option value="custom-automation">Custom Automation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="budget">Budget</Label>
              <select
                id="budget"
                name="budget"
                className={selectClass}
                value={form.budget}
                onChange={set}
                disabled={busy}
              >
                <option value="">Select&hellip;</option>
                <option value="under-500">&lt; $500</option>
                <option value="500-2000">$500 – $2k</option>
                <option value="2000-10000">$2k – $10k</option>
                <option value="10000-25000">$10k – $25k</option>
                <option value="25000+">$25k+</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                name="timeline"
                className={selectClass}
                value={form.timeline}
                onChange={set}
                disabled={busy}
              >
                <option value="">Select&hellip;</option>
                <option value="asap">ASAP</option>
                <option value="1-2-weeks">1–2 weeks</option>
                <option value="1-month">~1 month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Project details *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="What are you building and what problem does it solve?"
              value={form.message}
              onChange={set}
              required
              disabled={busy}
              className="min-h-[100px] resize-none"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" size="sm" disabled={busy}>
            {busy ? 'Sending\u2026' : 'Send message'}
          </Button>

          <p className="text-center text-[12px] text-muted-foreground">
            We reply within 24 hours. No spam.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
