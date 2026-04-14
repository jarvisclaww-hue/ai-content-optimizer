import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/api/proxy';

export async function POST() {
  await clearAuthCookies();
  return NextResponse.json({ success: true });
}
