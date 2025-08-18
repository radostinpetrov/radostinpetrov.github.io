import CountryRecordChart from './country-record-chart';
import { headers } from 'next/headers';

export const revalidate = 0; // always ask the API route

async function getData(user: string) {
  const hdrs = await headers();
  const host = hdrs.get('host');
  const protocol = process.env.VERCEL ? 'https' : 'http';
  const base = host ? `${protocol}://${host}` : '';
  const res = await fetch(`${base}/api/chess/country-record?user=${user}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load data');
  return res.json();
}

export default async function Page() {
  const user = 'rad_o';
  const data = await getData(user); // { user, updatedAt, data: [{country, score}] }
  return <CountryRecordChart data={data.data} user={data.user} updatedAt={data.updatedAt} />;
}