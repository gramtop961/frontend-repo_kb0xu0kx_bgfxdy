import React, { useEffect, useMemo, useState } from 'react';
import { Trophy, Gift, Star } from 'lucide-react';

const STORAGE_KEY = 'rewards_v1';

function loadRewards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRewards(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export default function RewardsPanel() {
  const [rewards, setRewards] = useState(() => loadRewards());

  useEffect(() => {
    const handler = (e) => {
      const { title, points } = e.detail || {};
      if (!title) return;
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title,
        points: typeof points === 'number' ? points : 5,
        date: new Date().toISOString(),
      };
      setRewards((prev) => {
        const next = [entry, ...prev].slice(0, 20); // keep last 20
        saveRewards(next);
        return next;
      });
      if (navigator?.vibrate) {
        try { navigator.vibrate([10, 20, 10]); } catch {}
      }
    };
    window.addEventListener('reward-earned', handler);
    return () => window.removeEventListener('reward-earned', handler);
  }, []);

  const totalPoints = useMemo(() => rewards.reduce((sum, r) => sum + (r.points || 0), 0), [rewards]);

  return (
    <section className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-900/50 backdrop-blur p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-600" />
          <h2 className="text-base font-semibold">Rewards</h2>
        </div>
        <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
          <Star className="h-4 w-4" />
          <span>{totalPoints} pts</span>
        </div>
      </div>

      {rewards.length === 0 ? (
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          No rewards yet. Start a phase or complete a step to earn your first badge.
        </div>
      ) : (
        <ul className="space-y-2">
          {rewards.map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded-xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-[11px] text-neutral-500">{new Date(r.date).toLocaleString()}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                +{r.points}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
