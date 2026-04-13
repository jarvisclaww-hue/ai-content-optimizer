import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}

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

  // Log enquiry (replace with email service e.g. Resend/SendGrid when ready)
  console.log('[PRIA Contact Form]', {
    timestamp: new Date().toISOString(),
    name,
    email,
    projectType,
    budget: body.budget || 'not specified',
    timeline: body.timeline || 'not specified',
    message,
  });

  return NextResponse.json({ success: true });
}
