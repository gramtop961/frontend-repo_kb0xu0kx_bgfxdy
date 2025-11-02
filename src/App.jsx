import React from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import PowerQuotes from './components/PowerQuotes.jsx';
import MainGrid from './components/MainGrid.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-white">
      <HeaderBar />

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        {/* Keep the existing hero sections visible */}
        <PowerQuotes />

        {/* Show all interactive modules in a clean grid */}
        <MainGrid />
      </main>

      <footer className="py-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-neutral-600 dark:text-neutral-300">
          Built with intention. Keep showing up — tiny wins, daily.
        </div>
      </footer>
    </div>
  );
}
