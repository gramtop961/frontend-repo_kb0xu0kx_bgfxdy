import { useEffect, useRef, useState } from 'react'
import { Music, Pause, Play } from 'lucide-react'

export default function HeaderBar() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {})
      }
    } else {
      audio.pause()
    }
  }, [playing])

  return (
    <header className="w-full flex items-center justify-between gap-4 rounded-2xl bg-white/70 backdrop-blur border border-blue-100 p-4 shadow-sm">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Gaurav Version 2.0 – The Comeback App</h1>
        <p className="text-sm text-slate-600">Tu ruk gaya hai Gaurav, khatam nahi hua. Har din ek naya start hai.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-xs text-slate-500">Soft Music</div>
        <button
          onClick={() => setPlaying(v => !v)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors border ${playing ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
          aria-pressed={playing}
        >
          <Music className="h-4 w-4" />
          {playing ? (
            <>
              <span>Playing</span>
              <Pause className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Off</span>
              <Play className="h-4 w-4" />
            </>
          )}
        </button>
        <audio
          ref={audioRef}
          loop
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_0a7b65d2d2.mp3?filename=calm-ambient-110997.mp3"
        />
      </div>
    </header>
  )
}
