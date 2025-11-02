import React, { useMemo, useState } from 'react';
import { Droplet, Utensils, CheckCircle2, Plus, Minus, Check } from 'lucide-react';

export default function TrackersPanel() {
  const [water, setWater] = useState(0); // glasses
  const [meals, setMeals] = useState({ breakfast: false, lunch: false, dinner: false });
  const [routine, setRoutine] = useState({
    wake5: false,
    silence10: false,
    walk15: false,
    focus: false,
    noDrink: false,
    message: false,
  });

  const completed = useMemo(() => {
    const mealDone = Object.values(meals).filter(Boolean).length;
    const routineDone = Object.values(routine).filter(Boolean).length;
    // water progress normalized to 8-glass goal
    const waterScore = Math.min(water, 8) / 8;
    const totalParts = 3; // meals, routine, water
    return Math.round(((mealDone / 3 + routineDone / 6 + waterScore) / totalParts) * 100);
  }, [meals, routine, water]);

  const toggleMeal = (key) => setMeals((s) => ({ ...s, [key]: !s[key] }));
  const toggleRoutine = (key) => setRoutine((s) => ({ ...s, [key]: !s[key] }));

  return (
    <section className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur p-5 shadow-sm border border-black/5">
      <div className="grid gap-5 md:grid-cols-3">
        {/* Water */}
        <div className="rounded-xl border border-sky-100/50 p-4 bg-gradient-to-br from-sky-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-700">
              <Droplet className="h-5 w-5" />
              <h3 className="font-semibold">Water</h3>
            </div>
            <div className="text-xs text-sky-700/80">Goal: 8</div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              className="h-9 w-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow active:scale-95"
              onClick={() => setWater((w) => Math.max(0, w - 1))}
              aria-label="Decrease water"
            >
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-3xl font-bold tabular-nums text-sky-800">{water}</div>
            <button
              className="h-9 w-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow active:scale-95"
              onClick={() => setWater((w) => Math.min(12, w + 1))}
              aria-label="Increase water"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-sky-100">
            <div
              className="h-2 rounded-full bg-sky-500 transition-all"
              style={{ width: `${Math.min((water / 8) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Meals */}
        <div className="rounded-xl border border-amber-100/50 p-4 bg-gradient-to-br from-amber-50 to-white">
          <div className="flex items-center gap-2 text-amber-700">
            <Utensils className="h-5 w-5" />
            <h3 className="font-semibold">Meals</h3>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { key: 'breakfast', label: 'Breakfast' },
              { key: 'lunch', label: 'Lunch' },
              { key: 'dinner', label: 'Dinner' },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => toggleMeal(m.key)}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium border transition ${
                  meals[m.key]
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-100'
                }`}
              >
                {meals[m.key] ? <Check className="h-4 w-4" /> : null}
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Routine */}
        <div className="rounded-xl border border-indigo-100/50 p-4 bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-center gap-2 text-indigo-700">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold">Daily Routine</h3>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              { key: 'wake5', label: 'Wake 5am' },
              { key: 'silence10', label: '10-min silence' },
              { key: 'walk15', label: '15-min walk' },
              { key: 'focus', label: 'Work focus' },
              { key: 'noDrink', label: 'No drink today' },
              { key: 'message', label: 'Message someone' },
            ].map((r) => (
              <label
                key={r.key}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                  routine[r.key]
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!routine[r.key]}
                  onChange={() => toggleRoutine(r.key)}
                  className="accent-indigo-600 h-4 w-4"
                />
                <span>{r.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Daily Progress</span>
          <span className="font-mono text-slate-600">{completed}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-amber-500 to-indigo-600 transition-all" style={{ width: `${completed}%` }} />
        </div>
      </div>
    </section>
  );
}
