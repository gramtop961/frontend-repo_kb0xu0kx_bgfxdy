import React, { useEffect, useRef, useState } from 'react';

function createWaterAmbience(audioCtx) {
  // Pink-ish noise generator for calm ambience
  const bufferSize = 4096;
  const node = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  node.onaudioprocess = function (e) {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      output[i] = pink * 0.02; // keep it very soft
    }
  };
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1000;
  node.connect(filter);
  const gain = audioCtx.createGain();
  gain.gain.value = 0.2;
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  return { node, gain };
}

export default function HeaderBar() {
  const [playing, setPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const ambienceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleAmbience = async () => {
    if (!audioCtxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      ambienceRef.current = createWaterAmbience(ctx);
    }
    if (playing) {
      audioCtxRef.current.suspend();
      setPlaying(false);
    } else {
      await audioCtxRef.current.resume();
      setPlaying(true);
    }
  };

  const hour = new Date().getHours();
  const greeting = hour < 5
    ? 'Raat ka shaant focus'
    : hour < 12
      ? 'Subah ki shuruaat strong!'
      : hour < 17
        ? 'You can do it, I believe in you!'
        : 'Shaam ki finishing strong';

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/60 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-inner" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Gaurav 2.0 – The Comeback</h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">{greeting}</p>
          </div>
        </div>
        <button
          onClick={toggleAmbience}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: playing ? '#22c55e' : '#ef4444' }} />
          {playing ? 'Calm ambience: On' : 'Calm ambience: Off'}
        </button>
      </div>
    </header>
  );
}
