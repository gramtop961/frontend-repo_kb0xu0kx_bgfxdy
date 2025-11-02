import { useMemo, useState } from 'react'
import { Droplet, Minus, Plus, Utensils, CheckSquare, Timer } from 'lucide-react'

const ROUTINE_ITEMS = [
  'Wake 5am',
  '10-min silence',
  '15-min walk',
  'Work focus',
  'No drink today',
  'Message ek zaroori insaan'
]

export default function TrackersPanel() {
  const [water, setWater] = useState(6) // glasses
  const [meals, setMeals] = useState({ Breakfast: false, Lunch: false, Dinner: false })
  const [routine, setRoutine] = useState(() => ROUTINE_ITEMS.reduce((acc, k) => ({ ...acc, [k]: false }), {}))

  const totalChecks = useMemo(() => Object.values(meals).length + Object.values(routine).length, [meals, routine])
  const completed = useMemo(() => {
    const m = Object.values(meals).filter(Boolean).length
    const r = Object.values(routine).filter(Boolean).length
    return m + r
  }, [meals, routine])

  const progress = Math.round((completed / totalChecks) * 100)

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="grid md:grid-cols-3 gap-5">
        {/* Water Tracker */}
        <div className="rounded-xl border border-blue-100 p-4 bg-blue-50/50">
          <div className="flex items-center gap-2 mb-3 text-blue-900 font-semibold">
            <Droplet className="h-5 w-5" /> Water Tracker
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setWater(w => Math.max(0, w - 1))}
              className="p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="text-3xl font-bold text-blue-700">{water}</div>
            <button
              onClick={() => setWater(w => w + 1)}
              className="p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-blue-700">Glasses today</p>
        </div>

        {/* Meals */}
        <div className="rounded-xl border border-amber-100 p-4 bg-amber-50/50">
          <div className="flex items-center gap-2 mb-3 text-amber-900 font-semibold">
            <Utensils className="h-5 w-5" /> Meal Checklist
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(meals).map((k) => (
              <label key={k} className="flex items-center gap-2 rounded-lg bg-white border border-amber-200 px-3 py-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={meals[k]}
                  onChange={(e) => setMeals(prev => ({ ...prev, [k]: e.target.checked }))}
                />
                <span className="text-sm">{k}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Routine */}
        <div className="rounded-xl border border-emerald-100 p-4 bg-emerald-50/50">
          <div className="flex items-center gap-2 mb-3 text-emerald-900 font-semibold">
            <CheckSquare className="h-5 w-5" /> Daily Routine
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ROUTINE_ITEMS.map((it) => (
              <label key={it} className="flex items-center gap-2 rounded-lg bg-white border border-emerald-200 px-3 py-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={routine[it]}
                  onChange={(e) => setRoutine(prev => ({ ...prev, [it]: e.target.checked }))}
                />
                <span className="text-sm">{it}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2 text-slate-700 font-medium"><Timer className="h-4 w-4" /> Aaj ka Score</div>
          <div className="text-slate-600">{completed}/{totalChecks} • {progress}%</div>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  )
}
