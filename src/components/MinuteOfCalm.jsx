import { useEffect, useRef, useState } from 'react'
import { Timer, Play, Pause, X } from 'lucide-react'

export default function MinuteOfCalm() {
  const [open, setOpen] = useState(false)
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(60)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!open) {
      setRunning(false)
      setSeconds(60)
      clearInterval(intervalRef.current)
      intervalRef.current = null
      if (audioRef.current) audioRef.current.pause()
    }
  }, [open])

  useEffect(() => {
    if (running) {
      if (audioRef.current) {
        const p = audioRef.current.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      if (audioRef.current) audioRef.current.pause()
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [running])

  const percent = (seconds / 60) * 100

  return (
    <section className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-slate-800 font-semibold"><Timer className="h-5 w-5" /> Minute of Calm</div>
      </div>
      <p className="text-sm text-slate-600 mb-4">1-min breathing. 4-7-8: 4 inhale • 7 hold • 8 exhale. Bas gentle saas, gentle mind.</p>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 shadow hover:brightness-110"
      >
        Start 1-Min Calm
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-slate-900/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-slate-800 flex items-center gap-2"><Timer className="h-5 w-5" /> 60 Seconds Calm</div>
              <button className="p-2 rounded-lg hover:bg-slate-100" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            <div className="relative mx-auto mt-2 mb-6 h-40 w-40">
              <div className="absolute inset-0 rounded-full bg-slate-100" />
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-amber-400"
                style={{ clipPath: `inset(${100 - percent}% 0 0 0)` }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-4xl font-bold text-slate-800 tabular-nums">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
                <div className="text-xs text-slate-500">Breathe gentle</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setRunning(r => !r)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm border ${running ? 'bg-amber-600 text-white border-amber-600' : 'bg-blue-600 text-white border-blue-600'}`}
              >
                {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
              </button>
              <button
                onClick={() => { setSeconds(60); setRunning(false) }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-sm border bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>

            <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_8bf9df63a3.mp3?filename=soft-ambient-124110.mp3" />
          </div>
        </div>
      )}
    </section>
  )
}
