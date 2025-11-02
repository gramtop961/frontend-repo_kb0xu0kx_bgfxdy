import React from 'react';
import HeaderBar from './components/HeaderBar';
import MainGrid from './components/MainGrid';
import MusicAndMood from './components/MusicAndMood';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <HeaderBar />

        <MusicAndMood />

        <MainGrid />

        <footer className="mt-8 text-center text-xs text-slate-500">
          Made with care. Small steps, big comeback.
        </footer>
      </div>
    </div>
  );
}
