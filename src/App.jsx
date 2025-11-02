import React from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import PhasesDashboard from './components/PhasesDashboard.jsx';
import PowerQuotes from './components/PowerQuotes.jsx';
import MinuteOfCalm from './components/MinuteOfCalm.jsx';
import WellnessBoard from './components/WellnessBoard.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <HeaderBar />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <PhasesDashboard />
        <PowerQuotes />
        <MinuteOfCalm />
        <WellnessBoard />
      </main>
    </div>
  );
}
