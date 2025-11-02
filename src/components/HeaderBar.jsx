import React, { useMemo, useRef, useState } from 'react';
import { Music, Pause, Play, Sparkles } from 'lucide-react';

// Lightweight ambient tone using Web Audio API (no external files)
export default function HeaderBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const oscRef = useRef(null);

  const timeOfDay = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return 'Raat ka sukoon, kal strong shuruat.';
    if (h < 12) return 'Subah ho gayi, naya din – naya chance.';
    if (h < 18) return 'Din beech ka – chhote steps, bada comeback.';
    return 'Shaam shaant, aaj ka din proud bana.';
  }, []);

  const startTone = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, ctx.currentTime); // gentle A432
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    // smooth fade in
    gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2);

    audioCtxRef.current = ctx;
    gainRef.current = gain;
    oscRef.current = osc;
    setIsPlaying(true);
  };

  const stopTone = () => {
    try {
      const ctx = audioCtxRef.current;
      const gain = gainRef.current;
      const osc = oscRef.current;
      if (ctx && gain && osc) {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          osc.stop();
          ctx.close();
        }, 900);
      }
    } catch {}
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) stopTone();
    else startTone();
  };

  return (
    <header className="w-full rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-500 text-white p-5 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Gaurav Version 2.0 – The Comeback App</h1>
            <p className="text-white/90 text-sm">Tu ruk gaya hai Gaurav… lekin yahin se comeback shuru hota hai.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-white/90">{timeOfDay}</span>
          <button
            onClick={togglePlay}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium shadow-md transition active:scale-[0.98] ${
              isPlaying ? 'bg-white text-sky-700' : 'bg-white/20 text-white hover:bg-white/25'
            }`}
            aria-label={isPlaying ? 'Pause ambient' : 'Play ambient'}
          >
            <Music className="h-4 w-4" />
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
