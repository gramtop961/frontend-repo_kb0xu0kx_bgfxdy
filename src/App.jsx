import React from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import PowerQuotes from './components/PowerQuotes.jsx';
import MusicAndMood from './components/MusicAndMood.jsx';
import TrackersPanel from './components/TrackersPanel.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white">
      <HeaderBar />

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        <PowerQuotes />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <MusicAndMood />
          </div>
          <div className="md:col-span-1">
            <TrackersPanel />
          </div>
        </div>
      </main>

      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-600 dark:text-neutral-300">
          Built with intention. Keep showing up — tiny wins, daily.
        </div>
      </footer>
    </div>
  );
}
