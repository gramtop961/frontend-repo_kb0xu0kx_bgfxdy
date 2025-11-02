import React, { useEffect, useState } from 'react';
import { CheckCircle2, Moon, Leaf, Heart, Flame, Target, Dumbbell, Sparkles, Check, ChevronRight } from 'lucide-react';

function PhaseCard({ title, subtitle, color, items, action, active, children }) {
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
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={`mt-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white shadow active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
            active ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-sky-600 hover:bg-sky-700'
          }`}
          aria-pressed={active}
        >
          {active ? <Check className="h-4 w-4" /> : action.icon}
          <span>{active ? 'In Progress' : action.label}</span>
        </button>
      )}
      {children}
    </div>
  );
}

export default function PhasesDashboard() {
  const [started, setStarted] = useState(null); // 'p1' | 'p2' | 'p3' | null
  const [toast, setToast] = useState('');
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

  const trigger = (key, message) => {
    setStarted(key);
    setToast(message);
    reward(`${message}`, 5);
    if (navigator?.vibrate) {
      try { navigator.vibrate(15); } catch { /* no-op */ }
    }
  };

  const handleStep = (phase, n) => {
    const setFns = { p1: setP1Step, p2: setP2Step, p3: setP3Step };
    const key = `${phase}_step`;
    setFns[phase](n);
    try { localStorage.setItem(key, String(n)); } catch {}

    if (n === 3) {
      setToast(`${phase.toUpperCase()} completed — well done!`);
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
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) => (
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
        {value === 3 ? 'All three steps done — awesome progress!' : 'Tap each step as you finish it. Last step marks completion.'}
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

  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 p-5 border border-slate-200 relative">
      {/* lightweight toast */}
      {toast && (
        <div
          className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 z-10 rounded-full bg-black/80 px-3 py-1 text-xs text-white shadow"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold tracking-tight text-slate-800">Three Phases of Your Comeback</h2>
        <span className="text-[11px] md:text-xs text-slate-500">21 + 30 + 30 days</span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
          action={{
            label: 'Start Reset',
            icon: <Moon className="h-4 w-4" />,
            onClick: () => trigger('p1', 'Phase 1 started – chhote steps daily!'),
          }}
          active={started === 'p1'}
        >
          <Stepper phase="p1" value={p1Step} colorClass={styles.p1} />
        </PhaseCard>

        <PhaseCard
          title="Phase 2: Rebuild Energy & Relations"
          subtitle="30 days – body strong, connections warm."
          color="linear-gradient(90deg, #34d399, #10b981)"
          items={[
            'Workouts + mobility routine',
            'Simple meal templates – thali balance',
            'Re-connect prompts – one message a day',
            'Daily reading – 10 pages habit',
          ]}
          action={{
            label: 'Begin Rebuild',
            icon: <Dumbbell className="h-4 w-4" />,
            onClick: () => trigger('p2', 'Phase 2 – energy up, relations up!'),
          }}
          active={started === 'p2'}
        >
          <Stepper phase="p2" value={p2Step} colorClass={styles.p2} />
        </PhaseCard>

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
          action={{
            label: 'Let’s Rise',
            icon: <Target className="h-4 w-4" />,
            onClick: () => trigger('p3', 'Phase 3 – rise and shine, Gaurav!'),
          }}
          active={started === 'p3'}
        >
          <Stepper phase="p3" value={p3Step} colorClass={styles.p3} />
        </PhaseCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 text-xs">
        <div className="rounded-xl bg-white p-3 border border-slate-200">
          <div className="mb-1 flex items-center gap-2 text-slate-700">
            <Leaf className="h-4 w-4 text-emerald-600" />
            <span>Habits</span>
          </div>
          <p className="text-slate-500">Keep streaks alive – even 1% counts.</p>
        </div>
        <div className="rounded-xl bg-white p-3 border border-slate-200">
          <div className="mb-1 flex items-center gap-2 text-slate-700">
            <Heart className="h-4 w-4 text-rose-600" />
            <span>Reflection</span>
          </div>
          <p className="text-slate-500">Evening check-in – what went well today?</p>
        </div>
        <div className="rounded-xl bg-white p-3 border border-slate-200">
          <div className="mb-1 flex items-center gap-2 text-slate-700">
            <Flame className="h-4 w-4 text-amber-600" />
            <span>Rewards</span>
          </div>
          <p className="text-slate-500">Collect small wins – treat yourself weekly.</p>
        </div>
      </div>
    </section>
  );
}
