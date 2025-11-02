import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, Flame, Leaf, Plus, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'habits_v1';
const CUSTOM_KEY = 'habits_custom_v1';

const DEFAULT_HABITS = [
  { id: 'no_alcohol', label: 'Alcohol zero', readonly: true },
  { id: 'sleep_11', label: 'Sleep by 11', readonly: true },
  { id: 'mobility', label: 'Workout / Mobility', readonly: true },
  { id: 'learn_skill', label: 'Learn new skill', readonly: true },
  { id: 'reconnect', label: 'Message or call someone you love', readonly: true },
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

function loadCustom() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCustom(list) {
  try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); } catch {}
}

export default function HabitsPanel() {
  const [state, setState] = useState(loadState);
  const [custom, setCustom] = useState(loadCustom);
  const [newHabit, setNewHabit] = useState('');
  const today = todayKey();

  useEffect(() => saveState(state), [state]);
  useEffect(() => saveCustom(custom), [custom]);

  const habits = useMemo(() => [...DEFAULT_HABITS, ...custom], [custom]);
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

  const completion = useMemo(() => {
    const count = habits.filter(h => doneToday[h.id]).length;
    return Math.round((count / Math.max(habits.length, 1)) * 100);
  }, [doneToday, habits]);

  const addHabit = (e) => {
    e.preventDefault();
    const label = newHabit.trim();
    if (!label) return;
    const id = `custom_${Date.now()}`;
    const updated = [...custom, { id, label }];
    setCustom(updated);
    setNewHabit('');
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(updated)); } catch {}
  };

  const removeHabit = (id) => {
    setCustom((prev) => prev.filter((h) => h.id !== id));
    setState((prev) => {
      const days = { ...(prev.days || {}) };
      Object.keys(days).forEach((k) => {
        if (days[k] && days[k][id]) delete days[k][id];
      });
      const streaks = { ...(prev.streaks || {}) };
      if (streaks[id]) delete streaks[id];
      return { ...prev, days, streaks };
    });
  };

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-600" />
          <h2 className="text-base font-semibold">Editable Habits</h2>
        </div>
        <button onClick={resetToday} className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
          <RotateCcw className="h-3.5 w-3.5" /> Reset today
        </button>
      </div>

      <form onSubmit={addHabit} className="mb-3 flex items-center gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add your own habit"
          className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm bg-white/80"
          aria-label="Add your own habit"
        />
        <button type="submit" className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-sm">
          <Plus className="h-4 w-4" /> Add
        </button>
      </form>

      <div className="mb-3 h-2 w-full rounded-full bg-neutral-200/70 dark:bg-neutral-800/70 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${completion}%` }} />
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-300 mb-4">{completion}% done today</p>

      <ul className="space-y-2">
        {habits.map((h) => {
          const isDone = !!doneToday[h.id];
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
                {!h.readonly && (
                  <button
                    type="button"
                    onClick={() => removeHabit(h.id)}
                    className="shrink-0 inline-flex items-center justify-center rounded-lg border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-2"
                    aria-label={`Delete habit ${h.label}`}
                  >
                    <Trash2 className="h-4 w-4" />
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
          <Flame className="h-4 w-4" /> All habits complete today — great streak energy!
        </div>
      )}
    </section>
  );
}
