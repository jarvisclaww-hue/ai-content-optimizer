'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Loader2, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit. Please try again.');
      }

      trackEvent('form_submit', 'contact', form.projectType);
      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-300">Message received!</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-400">
          Thanks for reaching out. We&apos;ll review your project details and reply within 24 hours.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
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
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="projectType">Project type *</Label>
            <select
              id="projectType"
              name="projectType"
              className="w-full h-9 px-3 py-1 rounded-md border bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
              value={form.projectType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a service...</option>
              <option value="ai-content-optimizer">AI Content Optimizer</option>
              <option value="document-intelligence">Document Intelligence API</option>
              <option value="custom-ai-agent">Custom AI Agent</option>
              <option value="llm-integration">LLM / API Integration</option>
              <option value="workflow-automation">Workflow Automation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="budget">Budget range</Label>
              <select
                id="budget"
                name="budget"
                className="w-full h-9 px-3 py-1 rounded-md border bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                value={form.budget}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select budget...</option>
                <option value="under-500">Under $500</option>
                <option value="500-2000">$500 – $2,000</option>
                <option value="2000-10000">$2,000 – $10,000</option>
                <option value="10000-25000">$10,000 – $25,000</option>
                <option value="25000+">$25,000+</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timeline">Timeline</Label>
              <select
                id="timeline"
                name="timeline"
                className="w-full h-9 px-3 py-1 rounded-md border bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
                value={form.timeline}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select timeline...</option>
                <option value="asap">ASAP (rush)</option>
                <option value="1-2-weeks">1–2 weeks</option>
                <option value="1-month">~1 month</option>
                <option value="2-3-months">2–3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Project details *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe what you're building, what problem it solves, and any technical context..."
              value={form.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="min-h-[120px] resize-none"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            We reply within 24 hours. No spam, no pressure.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
