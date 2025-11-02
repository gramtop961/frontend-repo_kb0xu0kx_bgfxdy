import React from 'react';
import QuoteAndMood from './QuoteAndMood';
import PhasesDashboard from './PhasesDashboard';
import MinuteOfCalm from './MinuteOfCalm';
import TrackersPanel from './TrackersPanel';
import RewardsPanel from './RewardsPanel';
import HabitsPanel from './HabitsPanel';
import ReflectionPanel from './ReflectionPanel';

export default function MainGrid() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <QuoteAndMood />
        <PhasesDashboard />
        <HabitsPanel />
        <ReflectionPanel />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <MinuteOfCalm />
        <TrackersPanel />
        <RewardsPanel />
      </div>
    </div>
  );
}
