import React, { useMemo, useState } from 'react';
import { Heart, Smile, Meh, Frown, Zap } from 'lucide-react';

const moods = [
  { key: 'calm', label: 'Calm', color: 'bg-emerald-500', ring: 'ring-emerald-300', icon: Heart, tip: 'Saans ko dheere rakho. Slow and steady.' },
  { key: 'tired', label: 'Tired', color: 'bg-amber-500', ring: 'ring-amber-300', icon: Meh, tip: '5-minute stretch aur pani. Firse energy aayegi.' },
  { key: 'stressed', label: 'Stressed', color: 'bg-rose-500', ring: 'ring-rose-300', icon: Frown, tip: '4-7-8 breathing try karo. Tum sambhal loge.' },
  { key: 'hopeful', label: 'Hopeful', color: 'bg-sky-500', ring: 'ring-sky-300', icon: Smile, tip: 'Bas aise hi chalte rehna. Small wins matter.' },
  { key: 'focused', label: 'Focused', color: 'bg-indigo-600', ring: 'ring-indigo-300', icon: Zap, tip: '25 min deep work + 5 min break. You got this.' },
];

const quotes = [
  'Jitna rukoge, utna hi wapas daudoge. Start small, start now.',
  'Discipline is self-love in action.',
  'Kal se nahi, aaj se — bas ek chhota step.',
  'Your future self is watching. Make him proud.',
  'The comeback is always stronger than the setback.'
];

export default function QuoteAndMood() {
  const [active, setActive] = useState('hopeful');

  const quote = useMemo(() => {
    const dayIdx = new Date().getDate() % quotes.length;
    return quotes[dayIdx];
  }, []);

  return (
    <section className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur p-5 shadow-sm border border-black/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-sky-700 font-semibold">Power Quote</p>
          <h2 className="mt-1 text-xl leading-snug font-medium text-slate-800 dark:text-slate-100">“{quote}”</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {moods.find(m => m.key === active)?.tip}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {moods.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setActive(m.key)}
                className={`relative h-10 w-10 rounded-xl flex items-center justify-center text-white transition shadow ${
                  isActive ? `${m.color} ring-4 ${m.ring}` : `${m.color} opacity-70 hover:opacity-100`
                }`}
                aria-label={`Mood: ${m.label}`}
                title={m.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
