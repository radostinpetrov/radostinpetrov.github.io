import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

const GAME_CODES: Record<string, number> = {
  win: 1, checkmated: -1, agreed: 0, repetition: 0, timeout: -1, resigned: -1,
  stalemate: 0, lose: -1, insufficient: 0, '50move': 0, abandoned: -1, timevsinsufficient: 0,
};

async function getJSON(url: string) {
  const res = await fetch(url, { headers: { 'User-Agent': 'ChessComVisualisation' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function countryOf(username: string, cache: Map<string,string>) {
  if (cache.has(username)) return cache.get(username)!;
  const data = await getJSON(`https://api.chess.com/pub/player/${username}`);
  const code = data?.country ? data.country.split('/').pop() : 'XX';
  cache.set(username, code);
  return code;
}

async function aggregateCountryScores(user: string) {
  const archives = await getJSON(`https://api.chess.com/pub/player/${user}/games/archives`);
  const months: string[] = archives?.archives ?? [];
  const countryScores = new Map<string, number>();
  const countryCache = new Map<string, string>();

  for (const monthUrl of months) {
    const { games } = await getJSON(monthUrl);
    for (const g of games) {
      const white = g.white.username.toLowerCase();
      const black = g.black.username.toLowerCase();
      const iAmWhite = white === user;
      const opponent = iAmWhite ? black : white;
      const result = iAmWhite ? g.white.result : g.black.result;
      const score = GAME_CODES[result] ?? 0;
      const country = await countryOf(opponent, countryCache);
      countryScores.set(country, (countryScores.get(country) ?? 0) + score);
    }
  }

  const data = Array.from(countryScores.entries())
    .map(([country, score]) => ({ country, score }))
    .sort((a, b) => a.score - b.score);

  return { user, updatedAt: new Date().toISOString(), data };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user = (searchParams.get('user') ?? process.env.CHESS_USER ?? 'rad_o').toLowerCase();

    const payload = await aggregateCountryScores(user);
    const path = `chess/${user}/country-record.json`;

    const blob = await put(path, JSON.stringify(payload), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json'
    });

    return NextResponse.json({ ok: true, path, url: blob.url }, { headers: CORS_HEADERS });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ ok: false, error: message }, { status: 500, headers: CORS_HEADERS });
  }
}