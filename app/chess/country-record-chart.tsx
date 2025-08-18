'use client';
import ReactECharts from 'echarts-for-react';

export default function CountryRecordChart({
  data, user, updatedAt
}: { data: { country: string; score: number }[]; user: string; updatedAt?: string }) {
  const countries = data.map(d => d.country);
  const scores = data.map(d => d.score);
  const colors = scores.map(s => (s > 0 ? '#2ecc71' : s < 0 ? '#e74c3c' : '#95a5a6'));

  const option = {
    title: { text: `Record by opponent country — ${user}`, subtext: updatedAt ? `Updated ${new Date(updatedAt).toLocaleString()}` : '' },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: countries },
    series: [{ type: 'bar', data: scores, itemStyle: { color: (p: { dataIndex: number }) => colors[p.dataIndex] } }],
    grid: { left: 120, right: 20, top: 60, bottom: 40 }
  };

  return <ReactECharts option={option} style={{ height: Math.max(420, countries.length * 18) }} />;
}