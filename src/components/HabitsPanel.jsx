import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Flame, Leaf, Plus, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'habits_v1';

const DEFAULT_HABITS = [
  { id: 'no_alcohol', label: 'Alcohol zero', fixed: true },
  { id: 'sleep_11', label: 'Sleep by 11', fixed: true },
  { id: 'mobility', label: 'Workout / Mobility', fixed: true },
  { id: 'learn_skill', label: 'Learn new skill', fixed: true },
  { id: 'reconnect', label: 'Message or call someone you love', fixed: true },
];

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { streaks: {}, days: {}, custom: [] };
  } catch {
    return { streaks: {}, days: {}, custom: [] };
  }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export default function HabitsPanel() {
  const [state, setState] = useState(loadState);
  const [newHabit, setNewHabit] = useState('');
  const today = todayKey();

  useEffect(() => saveState(state), [state]);

  const habits = useMemo(() => {
    return [...DEFAULT_HABITS, ...(state.custom || [])];
  }, [state.custom]);

  const doneToday = useMemo(() => state.days[today] || {}, [state, today]);

  const toggleHabit = (id, label) => {
    setState((prev) => {
      const days = { ...(prev.days || {}) };
      const streaks = { ...(prev.streaks || {}) };
      const todayMap = { ...(days[today] || {}) };
      const wasDone = !!todayMap[id];
      if (wasDone) {
        delete todayMap[id];
      } else {
        todayMap[id] = true;
        streaks[id] = (streaks[id] || 0) + 1;
        window.dispatchEvent(new CustomEvent('reward-earned', { detail: { title: `Habit: ${label} ✔️`, points: 5 } }));
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

  const addHabit = () => {
    const label = newHabit.trim();
    if (!label) return;
    const id = `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;
    setState((prev) => ({ ...prev, custom: [...(prev.custom || []), { id, label }] }));
    setNewHabit('');
    window.dispatchEvent(new CustomEvent('reward-earned', { detail: { title: 'New Habit Added', points: 3 } }));
  };

  const removeHabit = (id) => {
    setState((prev) => {
      const custom = (prev.custom || []).filter((h) => h.id !== id);
      const days = { ...(prev.days || {}) };
      // Remove any marks for this habit from all days
      Object.keys(days).forEach((k) => {
        if (days[k] && days[k][id]) delete days[k][id];
      });
      const streaks = { ...(prev.streaks || {}) };
      if (streaks[id]) delete streaks[id];
      return { ...prev, custom, days, streaks };
    });
  };

  const completion = useMemo(() => {
    const count = habits.filter(h => doneToday[h.id]).length;
    return Math.round((count / Math.max(habits.length, 1)) * 100);
  }, [doneToday, habits]);

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
        {habits.map((h) => {
          const isDone = !!doneToday[h.id];
          const isCustom = !h.fixed;
          return (
            <li key={h.id}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleHabit(h.id, h.label)}
                  className={`flex-1 flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
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
                {isCustom && (
                  <button
                    onClick={() => removeHabit(h.id)}
                    className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Remove habit"
                    title="Remove habit"
                  >
                    <Trash2 className="h-4 w-4 text-neutral-600" />
                  </button>
                )}
              </div>
              <div className="mt-1 text-[11px] text-neutral-500">Streak: <span className="font-semibold text-neutral-700 dark:text-neutral-200">{state.streaks[h.id] || 0}</span></div>
            </li>
          );
        })}
      </ul>

      {habits.length > 0 && habits.every(h => doneToday[h.id]) && (
        <div className="mt-4 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 inline-flex items-center gap-2">
          <Flame className="h-4 w-4" /> You can do it, I believe in you!
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10">
        <p className="text-sm font-medium mb-2">Add a habit</p>
        <div className="flex items-center gap-2">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addHabit(); }}
            placeholder="e.g., Read 10 pages"
            className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <button
            onClick={addHabit}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </section>
  );
}
