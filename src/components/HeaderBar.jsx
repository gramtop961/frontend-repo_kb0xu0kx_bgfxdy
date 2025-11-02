import React, { useEffect, useRef, useState } from 'react';

export default function HeaderBar() {
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef(null);

  // Clean up iframe when hiding
  useEffect(() => {
    if (!showPlayer && iframeRef.current) {
      // Reset src to stop playback
      const src = iframeRef.current.getAttribute('src');
      iframeRef.current.setAttribute('src', src || '');
    }
  }, [showPlayer]);

  const hour = new Date().getHours();
  const greeting = hour < 5
    ? 'Raat ka shaant focus'
    : hour < 12
      ? 'Subah ki shuruaat strong!'
      : hour < 17
        ? 'You can do it, I believe in you!'
        : 'You can do it, I believe in you!';

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
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPlayer((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
            aria-pressed={showPlayer}
          >
            {showPlayer ? 'Pause: Unstoppable — Sia' : 'Play: Unstoppable — Sia'}
          </button>
        </div>
      </div>
      {showPlayer && (
        <div className="max-w-6xl mx-auto px-4 pb-3">
          <div className="rounded-xl overflow-hidden border border-black/10 aspect-video bg-black">
            {/* YouTube embed: Sia — Unstoppable (official lyric video). Autoplay controlled by visibility. */}
            <iframe
              ref={iframeRef}
              title="Sia - Unstoppable"
              className="w-full h-full"
              src="https://www.youtube.com/embed/YaEG2aWJnZ8?autoplay=1&modestbranding=1&rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </header>
  );
}
