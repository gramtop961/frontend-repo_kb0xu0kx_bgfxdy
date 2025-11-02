import React from 'react';
import HeaderBar from './components/HeaderBar.jsx';
import PowerQuotes from './components/PowerQuotes.jsx';
import HabitsPanel from './components/HabitsPanel.jsx';
import WellnessBoard from './components/WellnessBoard.jsx';
import MinuteOfCalm from './components/MinuteOfCalm.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <HeaderBar />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <PowerQuotes />
        <HabitsPanel />
        <MinuteOfCalm />
        <WellnessBoard />
      </main>
    </div>
  );
}
