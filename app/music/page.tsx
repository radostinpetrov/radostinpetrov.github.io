'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';

type SampleSource = {
  url?: string;
  file?: File | null;
};

async function decodeAudioToChannel(
  source: SampleSource,
  audioContext: AudioContext
): Promise<{ sampleRate: number; data: Float32Array }> {
  let arrayBuffer: ArrayBuffer;
  if (source.file) {
    arrayBuffer = await source.file.arrayBuffer();
  } else if (source.url) {
    const res = await fetch(source.url);
    if (!res.ok) throw new Error(`Failed to fetch audio (HTTP ${res.status})`);
    arrayBuffer = await res.arrayBuffer();
  } else {
    throw new Error('No audio source provided');
  }
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
  // Use first channel for visualization
  const channelData = audioBuffer.getChannelData(0);
  return { sampleRate: audioBuffer.sampleRate, data: channelData };
}

function minmaxWaveform(data: Float32Array, k: number): number[] {
  const groups = Math.max(1, Math.min(k, data.length));
  const step = data.length / groups;
  const peaks: number[] = new Array(groups);
  for (let i = 0; i < groups; i++) {
    const start = Math.floor(i * step);
    const endExclusive = Math.floor((i + 1) * step);
    let maxAbs = 0;
    const end = Math.min(endExclusive, data.length);
    if (end <= start) {
      // Fallback when k > data.length, keep 0
      peaks[i] = 0;
      continue;
    }
    for (let j = start; j < end; j++) {
      const v = Math.abs(data[j]);
      if (v > maxAbs) maxAbs = v;
    }
    peaks[i] = maxAbs;
  }
  return peaks;
}

export default function MusicPage() {
  const defaultUrl = useMemo(() => '/PianoSonata11.wav', []);
  const [file, setFile] = useState<File | null>(null);
  const [k, setK] = useState<number>(512);
  const [error, setError] = useState<string | null>(null);
  const [samples, setSamples] = useState<number[] | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>(defaultUrl);
  const previousObjectUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const visibleCountRef = useRef<number>(0);
  useEffect(() => { visibleCountRef.current = visibleCount; }, [visibleCount]);

  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const w = window as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctx: typeof AudioContext | undefined = w.AudioContext ?? w.webkitAudioContext;
      if (!Ctx) {
        throw new Error('Web Audio API is not supported in this browser.');
      }
      audioContextRef.current = new Ctx();
    }
    return audioContextRef.current!;
  }, []);

  // Decode and compute peaks automatically on source/k changes
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setError(null);
        setSamples(null);
        const src: SampleSource = file ? { file } : { url: defaultUrl };
        const ctx = ensureAudioContext();
        const { data } = await decodeAudioToChannel(src, ctx);
        const ks = Number.isFinite(k) && k > 0 ? Math.floor(k) : 512;
        const s = minmaxWaveform(data, ks);
        if (!cancelled) setSamples(s);
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Unknown error';
        if (!cancelled) setError(msg);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [file, defaultUrl, k, ensureAudioContext]);

  useEffect(() => {
    if (file) {
      const obj = URL.createObjectURL(file);
      setAudioUrl(obj);
      if (previousObjectUrlRef.current) URL.revokeObjectURL(previousObjectUrlRef.current);
      previousObjectUrlRef.current = obj;
    } else {
      setAudioUrl(defaultUrl);
      if (previousObjectUrlRef.current) {
        URL.revokeObjectURL(previousObjectUrlRef.current);
        previousObjectUrlRef.current = null;
      }
    }
    return () => {
      if (previousObjectUrlRef.current) {
        URL.revokeObjectURL(previousObjectUrlRef.current);
        previousObjectUrlRef.current = null;
      }
    };
  }, [file, defaultUrl]);

  // Progressive rendering tied to audio playback
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const cancelLoop = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const step = () => {
      if (a && samples && samples.length > 0) {
        const d = a.duration;
        if (Number.isFinite(d) && d > 0) {
          const t = a.currentTime;
          const ratio = Math.max(0, Math.min(1, t / d));
          const count = Math.min(samples.length, Math.max(0, Math.floor(ratio * samples.length)));
          if (count !== visibleCountRef.current) {
            setVisibleCount(count);
          }
        }
      }
      if (!a.paused && !a.ended) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        rafIdRef.current = null;
      }
    };

    const onPlay = () => {
      cancelLoop();
      rafIdRef.current = requestAnimationFrame(step);
    };
    const onPause = () => { cancelLoop(); };
    const onEnded = () => { cancelLoop(); if (samples) setVisibleCount(samples.length); };
    const onLoaded = () => { setVisibleCount(0); };

    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);
    a.addEventListener('loadedmetadata', onLoaded);

    // Initialize visibleCount if already playing or metadata present
    if (!a.paused) onPlay();
    else if (Number.isFinite(a.duration) && a.duration > 0) {
      const d = a.duration;
      const t = a.currentTime;
      const ratio = Math.max(0, Math.min(1, t / d));
      setVisibleCount(Math.floor(ratio * (samples?.length ?? 0)));
    }

    return () => {
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
      a.removeEventListener('loadedmetadata', onLoaded);
      cancelLoop();
    };
  }, [samples]);

  const option = useMemo(() => {
    const peaks = samples ?? [];
    const indices = peaks.map((_, i) => i);
    const candleData = peaks.map((y, i) => (
      i < visibleCount
        ? { value: [0, 0, -y, y] }
        : { value: [0, 0, 0, 0], itemStyle: { color: 'rgba(0,0,0,0)', color0: 'rgba(0,0,0,0)', borderColor: 'rgba(0,0,0,0)', borderColor0: 'rgba(0,0,0,0)' } }
    ));
    return {
      title: { text: 'Music waveform (min–max mirrored)' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: indices },
      yAxis: { type: 'value', min: -1, max: 1 },
      series: [
        {
          name: 'Min–Max',
          type: 'candlestick',
          data: candleData,
          barWidth: 1,
          itemStyle: {
            color: '#334155',
            color0: '#334155',
            borderColor: '#334155',
            borderColor0: '#334155',
          },
          animation: false,
        },
      ],
      grid: { left: 40, right: 20, top: 40, bottom: 40 },
    } as const;
  }, [samples, visibleCount]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-4">Music — Waveform Sampling</h1>
        <p className="text-gray-600 mb-6">
          Choose an audio file or use the default selection. Enter k to set the number of groups. The waveform will reveal as the audio plays.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audio source</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              <button
                type="button"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 border"
                onClick={() => setFile(null)}
                title="Use default audio"
              >
                Use default
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Default: {defaultUrl}</p>
          </div>

          <div>
            <audio ref={audioRef} controls src={audioUrl} className="w-full" />
          </div>

          <div>
            <label htmlFor="k-input" className="block text-sm font-medium text-gray-700 mb-1">k (number of samples)</label>
            <input
              id="k-input"
              type="number"
              min={1}
              step={1}
              value={k}
              onChange={(e) => setK(parseInt(e.target.value || '0', 10))}
              className="w-40 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}

        {samples && samples.length > 0 && (
          <div className="h-64">
            <ReactECharts option={option} style={{ height: 256 }} />
          </div>
        )}
      </div>
    </div>
  );
}


