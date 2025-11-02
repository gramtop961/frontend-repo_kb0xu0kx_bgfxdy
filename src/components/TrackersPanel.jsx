import React, { useMemo, useState } from 'react';

export default function TrackersPanel() {
  const [water, setWater] = useState(0);
  const [meals, setMeals] = useState({ breakfast: false, lunch: false, dinner: false });

  const progress = useMemo(() => {
    const totalChecks = water / 8 + Object.values(meals).filter(Boolean).length; // water goal 8
    return Math.min(100, Math.round((totalChecks / (1 + 3)) * 100));
  }, [water, meals]);

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <h2 className="text-base font-semibold mb-4">Daily Trackers</h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Water Intake</p>
            <span className="text-sm font-medium">{water} / 8</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => setWater((w) => Math.max(0, w - 1))}
              className="px-3 py-1.5 text-sm rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
            >
              -
            </button>
            <button
              onClick={() => setWater((w) => Math.min(8, w + 1))}
              className="px-3 py-1.5 text-sm rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">Meals</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(meals).map((k) => (
              <button
                key={k}
                onClick={() => setMeals((m) => ({ ...m, [k]: !m[k] }))}
                className={`px-3 py-2 rounded-xl border text-sm capitalize transition ${
                  meals[k]
                    ? 'bg-green-100/70 dark:bg-green-900/30 border-green-400/40'
                    : 'bg-white/60 dark:bg-neutral-900/40 border-black/10 dark:border-white/10'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">Daily Progress</p>
          <div className="h-2 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800/70 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">{progress}% complete</p>
        </div>
      </div>
    </section>
  );
}
