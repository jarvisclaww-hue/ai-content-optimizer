import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'delivered@resend.dev'; // Change to real email

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, projectType, message } = body;

  if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Name, email, project type, and message are required.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  // Always log
  console.log('[PRIA Contact Form]', {
    timestamp: new Date().toISOString(),
    name,
    email,
    projectType,
    budget: body.budget || 'not specified',
    timeline: body.timeline || 'not specified',
    message,
  });

  // Send email via Resend if configured
  if (RESEND_API_KEY) {
    try {
      const htmlBody = `
<h2>New project enquiry</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Name</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Service</td><td style="padding:6px 0;">${escapeHtml(projectType)}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Budget</td><td style="padding:6px 0;">${escapeHtml(body.budget || 'Not specified')}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;color:#666;">Timeline</td><td style="padding:6px 0;">${escapeHtml(body.timeline || 'Not specified')}</td></tr>
</table>
<h3 style="margin-top:20px;">Project details</h3>
<p style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(message)}</p>
<hr style="margin-top:24px;border:none;border-top:1px solid #eee;" />
<p style="font-size:12px;color:#999;">Sent from PRIA contact form</p>`;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'PRIA Contact <onboarding@resend.dev>',
          to: CONTACT_EMAIL,
          reply_to: email,
          subject: `New enquiry: ${projectType} — ${name}`,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
        // Don't fail the request — form submission still logs
      }
    } catch (err) {
      console.error('Email delivery error:', err);
    }
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
