import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Send, CalendarCheck2 } from 'lucide-react';

const STORAGE_KEY = 'reflection_v1';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function loadReflections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveReflections(obj) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); } catch {}
}

export default function ReflectionPanel() {
  const [data, setData] = useState(loadReflections);
  const [text, setText] = useState('');
  const today = todayKey();

  useEffect(() => saveReflections(data), [data]);

  useEffect(() => {
    setText(data[today]?.text || '');
  }, [today]);

  const submit = () => {
    if (!text.trim()) return;
    const firstTimeToday = !data[today];
    setData((prev) => ({ ...prev, [today]: { text: text.trim(), date: new Date().toISOString() } }));
    if (firstTimeToday) {
      window.dispatchEvent(new CustomEvent('reward-earned', { detail: { title: 'Reflection completed', points: 10 } }));
    }
    if (navigator?.vibrate) { try { navigator.vibrate(12); } catch {} }
  };

  const lastEntries = useMemo(() => {
    const entries = Object.entries(data).map(([k, v]) => ({ id: k, ...v }));
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    return entries.slice(0, 5);
  }, [data]);

  const completedToday = !!data[today];

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-600" />
          <h2 className="text-base font-semibold">Reflection</h2>
        </div>
        {completedToday && (
          <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
            <CalendarCheck2 className="h-3.5 w-3.5" /> Done for today
          </div>
        )}
      </div>

      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          placeholder="What went well today? What could be better? One thing you’re proud of."
        />
        <button
          onClick={submit}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 shadow active:scale-95"
        >
          <Send className="h-4 w-4" /> Save Reflection
        </button>
      </div>

      {lastEntries.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-neutral-500 mb-2">Recent</p>
          <ul className="space-y-2">
            {lastEntries.map((e) => (
              <li key={e.id} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 p-3">
                <p className="text-[11px] text-neutral-500 mb-1">{new Date(e.date).toLocaleDateString()}</p>
                <p className="text-sm whitespace-pre-wrap">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
