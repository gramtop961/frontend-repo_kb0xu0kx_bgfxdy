import React, { useState } from 'react';

const PLAYLISTS = {
  Focus: [
    { title: 'Deep Work — Lofi', url: 'https://open.spotify.com/playlist/37i9dQZF1DX8nt8uFQ2r3d' },
    { title: 'Alpha Waves', url: 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS' },
  ],
  Energy: [
    { title: 'Beast Mode', url: 'https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP' },
    { title: 'Hype', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy' },
  ],
  Calm: [
    { title: 'Rain & Thunder', url: 'https://open.spotify.com/playlist/37i9dQZF1DXbvABJXBIyiY' },
    { title: 'Ocean Waves', url: 'https://www.youtube.com/watch?v=1ZYbU82GVz4' },
  ],
};

export default function MusicAndMood() {
  const [tab, setTab] = useState('Focus');

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Music & Mood</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Pick a vibe to match your session.</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-full bg-neutral-100/70 dark:bg-neutral-800/70">
          {Object.keys(PLAYLISTS).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                tab === k
                  ? 'bg-white dark:bg-neutral-900 shadow text-neutral-900 dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {PLAYLISTS[tab].map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group block rounded-xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">Playlist</p>
                <p className="font-medium">{p.title}</p>
              </div>
              <div className="opacity-70 group-hover:opacity-100 transition">➡️</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
