import React, { useEffect, useRef, useState } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export default function MinuteOfCalm() {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const reset = () => {
    setRunning(false);
    setSeconds(60);
  };

  const progress = (1 - seconds / 60) * 100;

  return (
    <section className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur p-5 shadow-sm border border-black/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-700">
          <Timer className="h-5 w-5" />
          <h3 className="font-semibold">1 Minute of Calm</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRunning((r) => !r)}
            className={`rounded-lg px-3 py-2 text-sm font-medium text-white shadow active:scale-95 ${
              running ? 'bg-teal-600' : 'bg-teal-500'
            }`}
            aria-label={running ? 'Pause timer' : 'Start timer'}
          >
            {running ? <><Pause className="h-4 w-4 inline mr-1" /> Pause</> : <><Play className="h-4 w-4 inline mr-1" /> Start</>}
          </button>
          <button
            onClick={reset}
            className="rounded-lg px-3 py-2 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 shadow-sm hover:bg-white active:scale-95"
            aria-label="Reset timer"
          >
            <RotateCcw className="h-4 w-4 inline mr-1" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-6 md:grid-cols-[220px,1fr] items-center">
        <div className="relative mx-auto h-40 w-40">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle cx="50" cy="50" r="45" className="stroke-teal-100" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              strokeLinecap="round"
              className="stroke-teal-500"
              strokeWidth="10"
              fill="none"
              style={{ strokeDasharray: 2 * Math.PI * 45, strokeDashoffset: ((100 - progress) / 100) * 2 * Math.PI * 45 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold tabular-nums text-teal-700">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
              <p className="mt-1 text-xs text-teal-700/80">Breathe in 4, hold 7, out 8</p>
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-700 space-y-2">
          <p>Close your eyes gently. Shoulders down. Jaw relaxed. Breathe with this rhythm:</p>
          <ul className="list-disc pl-5 marker:text-teal-500">
            <li>Inhale through nose for a count of 4</li>
            <li>Hold for a count of 7</li>
            <li>Exhale slowly through mouth for a count of 8</li>
          </ul>
          <p className="text-slate-600">One minute done? Smile a little. You are doing great, truly.</p>
        </div>
      </div>
    </section>
  );
}
