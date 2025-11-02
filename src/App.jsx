import React from 'react';
import HeaderBar from './components/HeaderBar';
import QuoteAndMood from './components/QuoteAndMood';
import MinuteOfCalm from './components/MinuteOfCalm';
import PhasesDashboard from './components/PhasesDashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <HeaderBar />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <QuoteAndMood />
            <PhasesDashboard />
          </div>
          <div className="lg:col-span-1">
            <MinuteOfCalm />
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-500">
          Made with care. Small steps, big comeback.
        </footer>
      </div>
    </div>
  );
}
