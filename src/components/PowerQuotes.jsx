import React, { useEffect, useMemo, useState } from 'react';

const QUOTES = [
  { text: 'Discipline is choosing what you want most over what you want now.', author: 'Abraham Lincoln' },
  { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Will Durant' },
  { text: 'Small daily wins create unstoppable momentum.', author: 'Gaurav 2.0' },
  { text: 'The comeback is always stronger than the setback.', author: 'Unknown' },
  { text: 'You do not rise to the level of your goals. You fall to the level of your systems.', author: 'James Clear' },
  { text: 'Kal se nahi, aaj se — bas ek chhota step.', author: 'Grit' },
  { text: 'Your future self is watching. Make him proud.', author: 'Anonymous' },
  { text: 'Every act of discipline is a vote for the person you wish to become.', author: 'Atomic Habits' },
  { text: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
];

// Change quote every 6 hours, and also change daily by date key
function rollingIndex(len) {
  const now = new Date();
  const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const bucket = Math.floor(now.getHours() / 6); // 0..3
  const key = `${dayKey}-${bucket}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % len;
}

function useTodayQuote() {
  const idx = useMemo(() => rollingIndex(QUOTES.length), []);
  return QUOTES[idx];
}

export default function PowerQuotes() {
  const q = useTodayQuote();
  const [popup, setPopup] = useState('');

  // One-per-day popup
  useEffect(() => {
    const now = new Date();
    const dayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const seenKey = `quote_popup_${dayKey}`;
    try {
      const seen = localStorage.getItem(seenKey);
      if (!seen) {
        setPopup(`Power quote: “${q.text}” — ${q.author}`);
        localStorage.setItem(seenKey, '1');
      }
    } catch {}
  }, [q]);

  useEffect(() => {
    if (!popup) return;
    const t = setTimeout(() => setPopup(''), 2600);
    return () => clearTimeout(t);
  }, [popup]);

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
        <p className="text-xs uppercase tracking-widest text-orange-600/80 dark:text-orange-300/80 font-medium mb-3">Power Quote</p>
        <blockquote className="text-2xl md:text-3xl font-semibold leading-snug text-neutral-900 dark:text-white">
          “{q.text}”
        </blockquote>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">— {q.author}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Action</p>
            <p className="text-sm font-medium">Write one tiny win you’ll secure today.</p>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Focus</p>
            <p className="text-sm font-medium">Remove one distraction for 30 minutes.</p>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-neutral-900/50 border border-black/5 dark:border-white/10 p-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Momentum</p>
            <p className="text-sm font-medium">Start before you feel ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
