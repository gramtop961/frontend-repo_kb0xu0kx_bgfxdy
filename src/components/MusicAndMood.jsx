import React, { useState } from 'react';
import { Music, PlayCircle, Headphones, Heart } from 'lucide-react';

const collections = [
  {
    key: 'calm',
    title: 'Calm Waterflow',
    desc: 'Slow, airy pads and gentle piano for deep breathing and focus.',
    color: 'from-sky-100 to-emerald-100',
    tracks: [
      { name: 'Ocean Breath', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
      { name: 'Weightless', url: 'https://open.spotify.com/track/2rJojEuYz7cvY8x5OB60c9' },
      { name: 'Deep Focus Piano', url: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO' },
    ],
  },
  {
    key: 'focus',
    title: 'Focus Flow',
    desc: 'Lo-fi beats and soft synths to keep you in the zone.',
    color: 'from-indigo-100 to-sky-100',
    tracks: [
      { name: 'Lofi Coding', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
      { name: 'Deep Work', url: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS' },
      { name: 'Alpha Waves', url: 'https://www.youtube.com/watch?v=q76bMs-NwRk' },
    ],
  },
  {
    key: 'energy',
    title: 'Energy & Uplift',
    desc: 'Positive, rhythmic tracks for a light energy boost.',
    color: 'from-amber-100 to-rose-100',
    tracks: [
      { name: 'Morning Motivation', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC' },
      { name: 'Good Vibes', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0hWmn8d5pRe' },
      { name: 'Sunrise Run', url: 'https://www.youtube.com/watch?v=XULUBg_ZcAU' },
    ],
  },
];

export default function MusicAndMood() {
  const [active, setActive] = useState('calm');

  const activeCollection = collections.find((c) => c.key === active) || collections[0];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <Music className="h-5 w-5 text-sky-600" />
          <h3 className="font-semibold">Music & Mood</h3>
        </div>
        <div className="flex items-center gap-2">
          {collections.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                active === c.key
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-4 rounded-xl bg-gradient-to-br ${activeCollection.color} p-4 border border-slate-200`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-700">{activeCollection.desc}</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeCollection.tracks.map((t, idx) => (
                <a
                  key={idx}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-lg border bg-white/70 backdrop-blur px-3 py-2 text-sm text-slate-800 shadow hover:shadow-md transition"
                >
                  <span className="truncate">{t.name}</span>
                  <PlayCircle className="h-5 w-5 text-sky-600 group-hover:scale-110 transition" />
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-700 bg-white/70 rounded-lg px-3 py-2 border border-slate-200 shadow">
            <Headphones className="h-4 w-4 text-sky-600" />
            <span className="text-xs">Use headphones for best effect</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-600 flex items-center gap-1">
          <Heart className="h-3.5 w-3.5 text-rose-500" />
          Curated to match the calm water ambience above.
        </div>
      </div>
    </section>
  );
}
