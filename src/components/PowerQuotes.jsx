import React, { useEffect, useMemo, useState } from 'react';

const QUOTE_BUCKETS = {
  action: [
    { text: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
    { text: 'Small daily wins create unstoppable momentum.', author: 'Gaurav 2.0' },
    { text: 'Discipline is choosing what you want most over what you want now.', author: 'Abraham Lincoln' },
  ],
  focus: [
    { text: 'We are what we repeatedly do. Excellence is a habit.', author: 'Will Durant' },
    { text: 'Remove one distraction for 30 minutes. Then go again.', author: 'Focus' },
    { text: 'What gets scheduled gets done. Block it now.', author: 'Cal' },
  ],
  momentum: [
    { text: 'Start before you feel ready. Action breeds clarity.', author: 'Momentum' },
    { text: 'The comeback is always stronger than the setback.', author: 'Unknown' },
    { text: 'You do not rise to the level of your goals; you fall to the level of your systems.', author: 'James Clear' },
  ],
};

function rollingIndex(len, seed) {
  const now = new Date();
  const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const bucket = Math.floor(now.getHours() / 6); // 0..3 -> every 6 hours
  const key = `${dayKey}-${bucket}-${seed}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % len;
}

function useBucketQuote(bucket) {
  return useMemo(() => {
    const list = QUOTE_BUCKETS[bucket] || [];
    const idx = rollingIndex(list.length, bucket);
    return list[idx] || { text: 'Keep going. You are closer than you think.', author: 'Coach' };
  }, [bucket]);
}

export default function PowerQuotes() {
  const [mood, setMood] = useState('Neutral');
  const actionQ = useBucketQuote('action');
  const focusQ = useBucketQuote('focus');
  const momentumQ = useBucketQuote('momentum');
  const [popup, setPopup] = useState('');

  // One-per-day popup with the current Action quote
  useEffect(() => {
    const now = new Date();
    const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const seenKey = `quote_popup_${dayKey}`;
    try {
      const seen = localStorage.getItem(seenKey);
      if (!seen) {
        setPopup(`Today: “${actionQ.text}” — ${actionQ.author}`);
        localStorage.setItem(seenKey, '1');
      }
    } catch {}
  }, [actionQ]);

  useEffect(() => {
    if (!popup) return;
    const t = setTimeout(() => setPopup(''), 2600);
    return () => clearTimeout(t);
  }, [popup]);

  const suggestion = useMemo(() => {
    switch (mood) {
      case 'Stressed':
        return 'Breathe first. Try a 1-minute calm, then do the smallest next step.';
      case 'Low':
        return 'Light lift: pick a 5-minute task to win momentum. You can do it, I believe in you!';
      case 'Focused':
        return 'Protect the next 25 minutes. Phone away. One task only.';
      default:
        return 'Pick one: Action, Focus, or Momentum — and move one square forward.';
    }
  }, [mood]);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-orange-900/20 dark:to-amber-900/10 border border-black/5 dark:border-white/10">
      {popup && (
        <div className="absolute left-1/2 top-3 -translate-x-1/2 z-10 rounded-full bg-black/80 text-white text-xs px-3 py-1 shadow pointer-events-none" role="status" aria-live="polite">{popup}</div>
      )}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      <div className="relative p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-orange-600/80 dark:text-orange-300/80 font-medium mb-2">Power Quotes • Mood Coach</p>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-prose">Quotes rotate every few hours. Choose your mood to get a nudge that fits how you feel.</p>
          </div>
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-white/70 dark:bg-neutral-900/40 border border-black/5">
            {['Neutral', 'Focused', 'Stressed', 'Low'].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-1.5 text-xs rounded-full transition ${mood === m ? 'bg-orange-600 text-white' : 'text-orange-700'}`}
                aria-pressed={mood === m}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-[13px] text-neutral-700 dark:text-neutral-300">{suggestion}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Action</p>
            <p className="text-sm font-medium">“{actionQ.text}”</p>
            <p className="mt-1 text-[11px] text-neutral-500">— {actionQ.author}</p>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Focus</p>
            <p className="text-sm font-medium">“{focusQ.text}”</p>
            <p className="mt-1 text-[11px] text-neutral-500">— {focusQ.author}</p>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Momentum</p>
            <p className="text-sm font-medium">“{momentumQ.text}”</p>
            <p className="mt-1 text-[11px] text-neutral-500">— {momentumQ.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
