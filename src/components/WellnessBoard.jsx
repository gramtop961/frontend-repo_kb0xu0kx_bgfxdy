import React from 'react';
import TrackersPanel from './TrackersPanel.jsx';
import MusicAndMood from './MusicAndMood.jsx';
import RewardsPanel from './RewardsPanel.jsx';
import ReflectionPanel from './ReflectionPanel.jsx';

export default function WellnessBoard() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrackersPanel />
        <MusicAndMood />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RewardsPanel />
        <ReflectionPanel />
      </div>
    </section>
  );
}
