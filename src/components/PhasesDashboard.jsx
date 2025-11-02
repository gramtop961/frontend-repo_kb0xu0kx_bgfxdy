import React from 'react';
import { CheckCircle2, Moon, Leaf, Heart, Flame, Target, Dumbbell, Sparkles } from 'lucide-react';

function PhaseCard({ title, subtitle, color, items, action }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md`}>
      <div className={`mb-3 inline-flex items-center gap-2 rounded-xl px-3 py-1 text-xs font-semibold text-white`} style={{ background: color }}>
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
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-sky-700 active:scale-[0.98]"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}

export default function PhasesDashboard() {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 p-5 border border-slate-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-slate-800">Three Phases of Your Comeback</h2>
        <span className="text-xs text-slate-500">21 + 30 + 30 days</span>
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
            onClick: () => alert('Phase 1 started – chhote steps daily!'),
          }}
        />

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
            onClick: () => alert('Phase 2 – energy up, relations up!'),
          }}
        />

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
            onClick: () => alert('Phase 3 – rise and shine, Gaurav!'),
          }}
        />
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
