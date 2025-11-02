import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Flame, Leaf } from 'lucide-react';

const STORAGE_KEY = 'habits_v1';

const DEFAULT_HABITS = [
  { id: 'no_alcohol', label: 'Alcohol zero' },
  { id: 'sleep_11', label: 'Sleep by 11' },
  { id: 'mobility', label: 'Workout / Mobility' },
  { id: 'read10', label: 'Read 10 pages' },
  { id: 'reconnect', label: '1 connection message' },
];

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { streaks: {}, days: {} };
  } catch {
    return { streaks: {}, days: {} };
  }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export default function HabitsPanel() {
  const [state, setState] = useState(loadState);
  const today = todayKey();

  useEffect(() => saveState(state), [state]);

  const doneToday = useMemo(() => state.days[today] || {}, [state, today]);

  const toggleHabit = (id) => {
    setState((prev) => {
      const days = { ...(prev.days || {}) };
      const streaks = { ...(prev.streaks || {}) };
      const todayMap = { ...(days[today] || {}) };
      const wasDone = !!todayMap[id];
      if (wasDone) {
        delete todayMap[id];
        // do not decrement streak for historical simplicity
      } else {
        todayMap[id] = true;
        streaks[id] = (streaks[id] || 0) + 1;
        window.dispatchEvent(new CustomEvent('reward-earned', { detail: { title: `Habit: ${DEFAULT_HABITS.find(h => h.id === id)?.label} ✔️`, points: 5 } }));
      }
      days[today] = todayMap;
      return { ...prev, days, streaks };
    });
    if (navigator?.vibrate) { try { navigator.vibrate(8); } catch {} }
  };

  const resetToday = () => {
    setState((prev) => {
      const days = { ...(prev.days || {}) };
      delete days[today];
      return { ...prev, days };
    });
  };

  const completion = useMemo(() => {
    const count = DEFAULT_HABITS.filter(h => doneToday[h.id]).length;
    return Math.round((count / DEFAULT_HABITS.length) * 100);
  }, [doneToday]);

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-600" />
          <h2 className="text-base font-semibold">Habits</h2>
        </div>
        <button onClick={resetToday} className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
          <RotateCcw className="h-3.5 w-3.5" /> Reset today
        </button>
      </div>

      <div className="mb-3 h-2 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800/70 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${completion}%` }} />
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">{completion}% done today</p>

      <ul className="space-y-2">
        {DEFAULT_HABITS.map((h) => {
          const isDone = !!doneToday[h.id];
          return (
            <li key={h.id}>
              <button
                onClick={() => toggleHabit(h.id)}
                className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                  isDone
                    ? 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-400/40 text-emerald-800 dark:text-emerald-200'
                    : 'bg-white/60 dark:bg-neutral-900/40 border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-100'
                }`}
                aria-pressed={isDone}
              >
                <span>{h.label}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${isDone ? 'text-emerald-800' : 'text-neutral-500'}`}>
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : null}
                  {isDone ? 'Done' : 'Mark done'}
                </span>
              </button>
              <div className="mt-1 text-[11px] text-neutral-500">Streak: <span className="font-semibold text-neutral-700 dark:text-neutral-200">{state.streaks[h.id] || 0}</span></div>
            </li>
          );
        })}
      </ul>

      {DEFAULT_HABITS.every(h => doneToday[h.id]) && (
        <div className="mt-4 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 inline-flex items-center gap-2">
          <Flame className="h-4 w-4" /> All habits complete today — great streak energy!
        </div>
      )}
    </section>
  );
}
