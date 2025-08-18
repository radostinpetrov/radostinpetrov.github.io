'use client';
import { useEffect, useMemo, useState } from 'react';
import CountryRecordChart from './country-record-chart';

type CountryRecord = { user: string; updatedAt?: string; data: { country: string; score: number }[] };

function resolveApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

export default function Page() {
  const user = 'rad_o';
  const apiBase = useMemo(resolveApiBase, []);
  const [record, setRecord] = useState<CountryRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const url = `${apiBase}/api/chess/country-record?user=${encodeURIComponent(user)}`;
        let res = await fetch(url, { cache: 'no-store' });
        if (res.status === 404) {
          // Try to prime data once, then retry
          await fetch(`${apiBase}/api/chess/refresh?user=${encodeURIComponent(user)}`, { cache: 'no-store' });
          res = await fetch(url, { cache: 'no-store' });
        }
        if (!res.ok) throw new Error(`Failed to load data (HTTP ${res.status})`);
        const json = (await res.json()) as CountryRecord;
        if (!cancelled) setRecord(json);
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [apiBase, user]);

  if (loading) return <p>Loading…</p>;
  if (error) {
    const refreshHref = `${apiBase}/api/chess/refresh?user=${encodeURIComponent(user)}`;
    return (
      <div>
        <p>Could not load chess data: {error}</p>
        <p>
          Try <a href={refreshHref}>refreshing the dataset</a> and then reload this page.
        </p>
      </div>
    );
  }
  if (!record) return <p>No data.</p>;
  return <CountryRecordChart data={record.data} user={record.user} updatedAt={record.updatedAt} />;
}