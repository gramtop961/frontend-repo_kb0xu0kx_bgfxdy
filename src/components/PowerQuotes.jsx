import React from 'react';

const QUOTES = [
  {
    text: "Discipline is choosing what you want most over what you want now.",
    author: "Abraham Lincoln",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
  },
  {
    text: "Small daily wins create unstoppable momentum.",
    author: "Gaurav 2.0",
  },
  {
    text: "The comeback is always stronger than the setback.",
    author: "Unknown",
  },
  {
    text: "You do not rise to the level of your goals. You fall to the level of your systems.",
    author: "James Clear",
  },
];

function getTodayQuote() {
  const idx = new Date().getDate() % QUOTES.length;
  return QUOTES[idx];
}

export default function PowerQuotes() {
  const q = getTodayQuote();

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-orange-900/20 dark:to-amber-900/10 border border-black/5 dark:border-white/10">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      </div>
      <div className="relative p-8 md:p-10">
        <p className="text-xs uppercase tracking-widest text-orange-600/80 dark:text-orange-300/80 font-medium mb-3">Power Quote of the Day</p>
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
