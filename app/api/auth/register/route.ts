import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL, setAuthCookies } from '@/lib/api/proxy';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    // Set auth cookie
    await setAuthCookies(data.access_token);

    return NextResponse.json({
      user: data.user,
      api_key: data.api_key,
      message: data.message,
    });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
