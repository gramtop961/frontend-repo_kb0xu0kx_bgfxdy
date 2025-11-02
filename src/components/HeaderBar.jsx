import React, { useMemo, useRef, useState } from 'react';
import { Music, Pause, Play, Sparkles } from 'lucide-react';

// Calming water ambience using Web Audio API (filtered noise + slow waves)
export default function HeaderBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainRef = useRef(null);
  const sourceRef = useRef(null);
  const filterRef = useRef(null);
  const lfoOscRef = useRef(null);
  const lfoGainRef = useRef(null);

  const timeOfDay = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return 'Raat ka sukoon, kal strong shuruat.';
    if (h < 12) return 'Subah ho gayi, naya din – naya chance.';
    if (h < 18) return 'Din beech ka – chhote steps, bada comeback.';
    return 'Shaam shaant, aaj ka din proud bana.';
  }, []);

  const createWaterBuffer = (ctx) => {
    const length = ctx.sampleRate * 3; // 3s loop
    const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        // Smooth pink-ish noise approximation
        const white = Math.random() * 2 - 1;
        data[i] = (data[i - 1] || 0) * 0.98 + white * 0.02;
      }
    }
    return buffer;
  };

  const startWater = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Noise source loop
    const buffer = createWaterBuffer(ctx);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    // Gentle lowpass filter with slow LFO for wave movement
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800; // base

    const lfoOsc = ctx.createOscillator();
    lfoOsc.type = 'sine';
    lfoOsc.frequency.value = 0.08; // very slow

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300; // LFO depth on frequency

    const gain = ctx.createGain();
    gain.gain.value = 0.0001; // start quiet

    // Wire
    lfoOsc.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Start
    src.start();
    lfoOsc.start();

    // Smooth fade in
    gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2);

    audioCtxRef.current = ctx;
    gainRef.current = gain;
    sourceRef.current = src;
    filterRef.current = filter;
    lfoOscRef.current = lfoOsc;
    lfoGainRef.current = lfoGain;
    setIsPlaying(true);
  };

  const stopWater = () => {
    try {
      const ctx = audioCtxRef.current;
      const gain = gainRef.current;
      const src = sourceRef.current;
      const lfo = lfoOscRef.current;
      if (ctx && gain && src) {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          try { src.stop(); } catch {}
          try { lfo && lfo.stop(); } catch {}
          ctx.close();
        }, 900);
      }
    } catch {}
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) stopWater();
    else startWater();
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
            aria-label={isPlaying ? 'Pause water ambience' : 'Play water ambience'}
          >
            <Music className="h-4 w-4" />
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause Calm Water</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Play Calm Water</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
