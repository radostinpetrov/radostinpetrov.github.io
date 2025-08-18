import CountryRecordChart from './country-record-chart';

export const revalidate = 0; // always ask the API route

async function getData(user: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/chess/country-record?user=${user}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load data');
  return res.json();
}

export default async function Page() {
  const user = 'rad_o';
  const data = await getData(user); // { user, updatedAt, data: [{country, score}] }
  return <CountryRecordChart data={data.data} user={data.user} updatedAt={data.updatedAt} />;
}