import React, { useMemo, useState } from 'react';

const LIB = {
  Focus: [
    { title: 'Deep Focus – Helix 1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', length: '7:20' },
    { title: 'Coding Flow – Helix 8', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', length: '5:42' },
  ],
  Calm: [
    { title: 'Calm Waves – Helix 2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', length: '6:55' },
    { title: 'Gentle Rain – Helix 6', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', length: '5:58' },
  ],
  Sleep: [
    { title: 'Sleep Drift – Helix 3', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', length: '8:01' },
    { title: 'Midnight Hush – Helix 11', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', length: '6:12' },
  ],
  Podcasts: [
    { title: 'Boost – Episode 1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', length: '9:24' },
    { title: 'Keep Going – Episode 2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', length: '7:47' },
  ],
};

export default function MusicAndMood() {
  const [tab, setTab] = useState('Focus');
  const items = useMemo(() => LIB[tab] || [], [tab]);

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">Music & Mood</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Built-in playlists and motivational podcasts.</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-full bg-neutral-100/70 dark:bg-neutral-800/70">
          {Object.keys(LIB).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3 py-1.5 text-sm rounded-full transition ${
                tab === k
                  ? 'bg-white dark:bg-neutral-900 shadow text-neutral-900 dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-300'
              }`}
              aria-pressed={tab === k}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{it.title}</p>
                <p className="text-[11px] text-neutral-500">{it.length} • in-app player</p>
              </div>
            </div>
            <audio controls className="mt-2 w-full">
              <source src={it.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-neutral-500">Tip: Use headphones. If something lifts you up, favorite it in your music app too.</p>
    </section>
  );
}
