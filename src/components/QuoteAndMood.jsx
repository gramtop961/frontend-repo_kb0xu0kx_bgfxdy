import { useMemo, useState } from 'react'

const QUOTES = [
  'Aaj jo tu control kar sakta hai, wahi jeet ka start hai.',
  'Chhote steps, bada comeback. Bas aage badhta reh.',
  'Shanti se kaam, izzat se jeet.',
  'Kal ki galti se seekh, aaj ko jee, kal ko bana.',
  'Tu broken nahi, bas pause par tha — ab gently restart.',
  'Har subah ek naya chance hota hai.',
  'Discipline se freedom milti hai.'
]

const MOODS = [
  { key: 'calm', label: 'Calm', color: 'bg-teal-100 text-teal-800 border-teal-200' },
  { key: 'tired', label: 'Tired', color: 'bg-slate-100 text-slate-800 border-slate-200' },
  { key: 'stressed', label: 'Stressed', color: 'bg-rose-100 text-rose-800 border-rose-200' },
  { key: 'hopeful', label: 'Hopeful', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { key: 'focused', label: 'Focused', color: 'bg-blue-100 text-blue-800 border-blue-200' }
]

export default function QuoteAndMood({ onMoodChange }) {
  const [mood, setMood] = useState('hopeful')

  const quote = useMemo(() => {
    const idx = new Date().getDay() % QUOTES.length
    return QUOTES[idx]
  }, [])

  const handleMood = (m) => {
    setMood(m)
    onMoodChange?.(m)
  }

  return (
    <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 shadow-sm">
      <div className="mb-4">
        <div className="text-xs tracking-wide text-blue-700 font-semibold mb-1">Aaj ka Power Quote</div>
        <p className="text-slate-800 text-lg leading-relaxed">“{quote}”</p>
      </div>

      <div>
        <div className="text-xs tracking-wide text-blue-700 font-semibold mb-2">Mood Meter</div>
        <div className="flex flex-wrap gap-2">
          {MOODS.map(m => (
            <button
              key={m.key}
              onClick={() => handleMood(m.key)}
              className={`px-3 py-1.5 text-sm rounded-full border ${m.color} ${mood === m.key ? 'ring-2 ring-offset-2 ring-blue-300' : ''}`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {mood === 'stressed' && 'Saas lamba. 1 minute mein sab halka lagne lagega — tu akela nahi.'}
          {mood === 'tired' && 'Aaj dheere sahi, par rukna nahi. Paani pee, thoda stretch kar.'}
          {mood === 'calm' && 'Yahi flow banaye rakh — gentle aur focused.'}
          {mood === 'hopeful' && 'Ussi hope ko action mein badal — ek chhota next step.'}
          {mood === 'focused' && 'Laser jaisa focus — distractions ko side mein rakh.'}
        </p>
      </div>
    </section>
  )
}
