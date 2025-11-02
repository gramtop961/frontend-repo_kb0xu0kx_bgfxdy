import { useState } from 'react'
import HeaderBar from './components/HeaderBar'
import QuoteAndMood from './components/QuoteAndMood'
import TrackersPanel from './components/TrackersPanel'
import MinuteOfCalm from './components/MinuteOfCalm'

function App() {
  const [currentMood, setCurrentMood] = useState('hopeful')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <HeaderBar />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuoteAndMood onMoodChange={setCurrentMood} />
            <TrackersPanel />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <MinuteOfCalm />
            <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <h3 className="text-slate-800 font-semibold mb-2">Music & Mood</h3>
              <p className="text-sm text-slate-600 mb-3">Mood ke hisaab se sangeet. Abhi tu <span className="font-medium text-blue-700">{currentMood}</span> feel kar raha hai.</p>
              <div className="grid grid-cols-2 gap-2">
                {['Calm Focus', 'Power Mode', 'Peace Sleep', 'Faith & Flow'].map((t) => (
                  <button key={t} className="rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-2 text-sm text-slate-700 text-left">
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-500">Note: Ye demo playlist buttons hain. Full app me personalized tracks play honge.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
