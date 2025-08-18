import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = (searchParams.get('user') ?? process.env.CHESS_USER ?? 'rad_o').toLowerCase();
  const path = `chess/${user}/country-record.json`;

  const { blobs } = await list({ prefix: path, limit: 1 });
  if (!blobs.length) {
    return NextResponse.json({ ok: false, error: 'No data yet. Trigger /api/chess/refresh' }, { status: 404 });
  }
  const r = await fetch(blobs[0].url);
  const json = await r.json();

  return NextResponse.json(json, {
    headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' } // CDN cache 5m
  });
}