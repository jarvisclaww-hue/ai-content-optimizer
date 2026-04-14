import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL, setAuthCookies } from '@/lib/api/proxy';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/api/v1/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        grant_type: 'password',
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    await setAuthCookies(data.access_token);

    return NextResponse.json({ user: data.user });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
