import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = (searchParams.get('user') ?? process.env.CHESS_USER ?? 'rad_o').toLowerCase();
    const path = `chess/${user}/country-record.json`;

    const { blobs } = await list({ prefix: path, limit: 1 });
    if (!blobs.length) {
      return NextResponse.json({ ok: false, error: 'No data yet. Trigger /api/chess/refresh' }, { status: 404 });
    }
    const r = await fetch(blobs[0].url);
    if (!r.ok) {
      return NextResponse.json({ ok: false, error: `Failed to fetch blob: ${r.status}` }, { status: 502 });
    }
    const json = await r.json();

    return NextResponse.json(json, {
      headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}