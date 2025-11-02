import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Moon, Leaf, Heart, Flame, Target, Dumbbell, Sparkles, Check, ChevronRight, PartyPopper, X } from 'lucide-react';
import HabitsPanel from './HabitsPanel.jsx';

function PhaseCard({ title, subtitle, color, items, actionLabel, icon, progress, onStart, phaseKey }) {
  const isCompleted = progress === 4;
  const isInProgress = progress > 0 && progress < 4;

  const buttonLabel = isCompleted ? 'Completed' : isInProgress ? 'In Progress' : actionLabel;
  const buttonStyle = isCompleted
    ? 'bg-emerald-600 hover:bg-emerald-700'
    : isInProgress
      ? 'bg-indigo-600 hover:bg-indigo-700'
      : 'bg-sky-600 hover:bg-sky-700';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div
        className="mb-3 inline-flex items-center gap-2 rounded-xl px-3 py-1 text-xs font-semibold text-white"
        style={{ background: color }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>{title}</span>
      </div>
      <p className="text-sm text-slate-600 mb-4">{subtitle}</p>
      <ul className="space-y-2 text-sm">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
            <span className="text-slate-700">{it}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onStart}
        className={`mt-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${buttonStyle}`}
        aria-pressed={isInProgress}
        disabled={isCompleted}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : icon}
        <span>{buttonLabel}</span>
      </button>
    </div>
  );
}

export default function PhasesDashboard() {
  const [toast, setToast] = useState('');
  const [celebrate, setCelebrate] = useState('');

  const [p1Step, setP1Step] = useState(() => {
    try { const raw = localStorage.getItem('p1_step'); return raw ? Number(raw) : 0; } catch { return 0; }
  });
  const [p2Step, setP2Step] = useState(() => {
    try { const raw = localStorage.getItem('p2_step'); return raw ? Number(raw) : 0; } catch { return 0; }
  });
  const [p3Step, setP3Step] = useState(() => {
    try { const raw = localStorage.getItem('p3_step'); return raw ? Number(raw) : 0; } catch { return 0; }
  });

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const reward = (title, points = 5) => {
    window.dispatchEvent(new CustomEvent('reward-earned', { detail: { title, points } }));
  };

  const handleStep = (phase, n) => {
    const setFns = { p1: setP1Step, p2: setP2Step, p3: setP3Step };
    const key = `${phase}_step`;
    setFns[phase](n);
    try { localStorage.setItem(key, String(n)); } catch {}

    if (n === 4) {
      const msg = `${phase.toUpperCase()} completed — well done!`;
      setToast(msg);
      setCelebrate(phase.toUpperCase());
      reward(`${phase.toUpperCase()} Completed`, 20);
      if (navigator?.vibrate) { try { navigator.vibrate([15, 30, 15]); } catch {} }
    } else {
      setToast(`${phase.toUpperCase()}: Step ${n} done`);
      reward(`${phase.toUpperCase()}: Step ${n} completed`, 8);
      if (navigator?.vibrate) { try { navigator.vibrate(10); } catch {} }
    }
  };

  const Stepper = ({ phase, value, colorClass }) => (
    <div className={`mt-4 rounded-xl border p-3 ${colorClass.container}`}>
      <p className={`text-xs font-medium mb-2 flex items-center gap-2 ${colorClass.text}`}>
        <ChevronRight className="h-4 w-4" /> {phase.toUpperCase()} Steps
      </p>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => handleStep(phase, n)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition ${
              value >= n ? `${colorClass.activeBtn}` : `${colorClass.idleBtn}`
            }`}
            aria-pressed={value >= n}
          >
            {value >= n ? 'Completed' : `Step ${n}`}
          </button>
        ))}
      </div>
      <p className={`mt-2 text-[11px] ${colorClass.hint}`}>
        {value === 4 ? 'All four steps done — awesome progress!' : 'Tap each step as you finish it. Last step marks completion.'}
      </p>
    </div>
  );

  const styles = {
    p1: {
      container: 'border-sky-200 bg-sky-50',
      text: 'text-sky-800',
      activeBtn: 'bg-sky-600 text-white border-sky-700',
      idleBtn: 'bg-white text-sky-700 border-sky-300 hover:bg-sky-100',
      hint: 'text-sky-700',
    },
    p2: {
      container: 'border-emerald-200 bg-emerald-50',
      text: 'text-emerald-800',
      activeBtn: 'bg-emerald-600 text-white border-emerald-700',
      idleBtn: 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100',
      hint: 'text-emerald-700',
    },
    p3: {
      container: 'border-amber-200 bg-amber-50',
      text: 'text-amber-800',
      activeBtn: 'bg-amber-600 text-white border-amber-700',
      idleBtn: 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100',
      hint: 'text-amber-700',
    },
  };

  // Daily trackers (Phase 1: 21 days, Phase 2 & 3: 30 days)
  const TRACK_KEY = 'phases_daily_v1';
  const [daily, setDaily] = useState(() => {
    try { const raw = localStorage.getItem(TRACK_KEY); return raw ? JSON.parse(raw) : { p1: {}, p2: {}, p3: {} }; } catch { return { p1: {}, p2: {}, p3: {} }; }
  });
  useEffect(() => {
    try { localStorage.setItem(TRACK_KEY, JSON.stringify(daily)); } catch {}
  }, [daily]);

  const phaseLengths = { p1: 21, p2: 30, p3: 30 };

  const todayIndex = useMemo(() => {
    const startKey = 'phases_start_date';
    let start = null;
    try {
      const raw = localStorage.getItem(startKey);
      start = raw ? new Date(raw) : null;
    } catch {}
    const today = new Date();
    if (!start) return 0; // require explicit start
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff) + 1; // day 1-based
  }, []);

  const startAll = () => {
    try { localStorage.setItem('phases_start_date', new Date().toISOString()); } catch {}
    setToast('Journey started — Day 1, let\'s go!');
  };

  const markToday = (phase) => {
    // Only allow if the 4 steps are completed today
    const stepMap = { p1: p1Step, p2: p2Step, p3: p3Step };
    if (stepMap[phase] !== 4) {
      setToast('Complete all 4 steps first');
      return;
    }
    setDaily((prev) => {
      const next = { ...prev, [phase]: { ...(prev[phase] || {}) } };
      next[phase][todayIndex] = true;
      return next;
    });
    reward(`${phase.toUpperCase()} Day ${todayIndex} ✅`, 10);
  };

  const PhaseRow = ({ phase }) => {
    const len = phaseLengths[phase];
    const dayMap = daily[phase] || {};
    return (
      <div className="rounded-xl border border-black/10 bg-white/60 p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium">{phase.toUpperCase()} — {len} days</p>
          <button
            className="text-xs rounded-full border px-2 py-1 bg-emerald-50 border-emerald-200 text-emerald-700"
            onClick={() => markToday(phase)}
          >
            Mark Today Done
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: len }).map((_, i) => {
            const day = i + 1;
            const done = !!dayMap[day];
            return (
              <div key={day} className={`h-7 rounded-md border text-[11px] flex items-center justify-center ${done ? 'bg-emerald-500/90 text-white border-emerald-600' : 'bg-white text-neutral-600 border-neutral-200'}`}>
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 p-5 border border-slate-200 relative">
      {/* toast */}
      {toast && (
        <div
          className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 z-10 rounded-full bg-black/80 px-3 py-1 text-xs text-white shadow"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}

      {/* celebration popup */}
      {celebrate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="rounded-2xl bg-white p-6 w-80 text-center relative">
            <button className="absolute right-2 top-2 text-neutral-500" onClick={() => setCelebrate('')} aria-label="Close celebration"><X className="h-4 w-4" /></button>
            <div className="text-4xl mb-2">👏🎉</div>
            <h3 className="text-lg font-semibold mb-1">{celebrate} Completed!</h3>
            <p className="text-sm text-neutral-600 mb-4">Amazing work — you earned bonus points.</p>
            <button onClick={() => setCelebrate('')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 text-sm"><PartyPopper className="h-4 w-4" /> Continue</button>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-lg font-semibold tracking-tight text-slate-800">Three Phases of Your Comeback</h2>
          <p className="text-[11px] md:text-xs text-slate-500">21 + 30 + 30 days • tap steps, mark days complete</p>
        </div>
        <button onClick={startAll} className="text-xs rounded-full border px-3 py-1 bg-indigo-50 border-indigo-200 text-indigo-700">Start Journey</button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div>
          <PhaseCard
            title="Phase 1: Control & Reset"
            subtitle="21 days – regain control, reset body & mind."
            color="linear-gradient(90deg, #22d3ee, #3b82f6)"
            items={[
              'Alcohol zero – streak tracker',
              'Sleep plan – fixed bed/wake times',
              'Daily journal + reflection prompts',
              'Calm Corner – quick breathing sessions',
            ]}
            actionLabel="Start Reset"
            icon={<Moon className="h-4 w-4" />}
            progress={p1Step}
            onStart={() => setToast('Phase 1 started — chhote steps daily!')}
            phaseKey="p1"
          />
          <Stepper phase="p1" value={p1Step} colorClass={styles.p1} />
        </div>

        <div>
          <PhaseCard
            title="Phase 2: Rebuild Energy & Relations"
            subtitle="30 days – body strong, connections warm."
            color="linear-gradient(90deg, #34d399, #10b981)"
            items={[
              'Workouts + mobility routine',
              'Simple meal templates – thali balance',
              'Message or call someone you love',
              'Learn new skill',
            ]}
            actionLabel="Begin Rebuild"
            icon={<Dumbbell className="h-4 w-4" />}
            progress={p2Step}
            onStart={() => setToast('Phase 2 – energy up, relations up!')}
            phaseKey="p2"
          />
          <Stepper phase="p2" value={p2Step} colorClass={styles.p2} />
        </div>

        <div>
          <PhaseCard
            title="Phase 3: Rise & Success"
            subtitle="30 days – goals, money, mindset."
            color="linear-gradient(90deg, #f59e0b, #ef4444)"
            items={[
              'Goal tracker + weekly review',
              'Podcasts & notes – learn daily',
              'Finance reset – expense view',
              'Morning affirmations & focus',
            ]}
            actionLabel="Let’s Rise"
            icon={<Target className="h-4 w-4" />}
            progress={p3Step}
            onStart={() => setToast('Phase 3 – rise and shine!')}
            phaseKey="p3"
          />
          <Stepper phase="p3" value={p3Step} colorClass={styles.p3} />
        </div>
      </div>

      {/* Daily Trackers */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PhaseRow phase="p1" />
        <PhaseRow phase="p2" />
        <PhaseRow phase="p3" />
      </div>

      {/* Embedded, editable habits (so you can add your own) */}
      <div className="mt-6">
        <HabitsPanel />
      </div>
    </section>
  );
}
