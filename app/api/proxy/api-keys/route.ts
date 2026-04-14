import { NextRequest } from 'next/server';
import { proxyGet, proxyPost } from '@/lib/api/proxy';

export async function GET() {
  return proxyGet('/auth/api-keys');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxyPost('/auth/api-keys', body);
}
