import { useState } from 'react';
import FrameViewer from './FrameViewer';
import ChapterNav from './ChapterNav';
import EndScreen from './EndScreen';
import MusicPlayerCard from './ui/music-player-card';
import './CinematicExperience.css';

export default function CinematicExperience({
  cues,
  currentFrameIdx,
  currentTime,
  duration,
  playing,
  buffering,
  ended,
  error,
  onTogglePlay,
  onSeek,
  onSeekToFrame,
  onPrevFrame,
  onNextFrame,
  onReplay,
  onReturnToBeginning,
}) {
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const currentCue = cues[currentFrameIdx];
  const prevCue = currentFrameIdx > 0 ? cues[currentFrameIdx - 1] : null;

  return (
    <div className="cinematic-experience" role="main" aria-label="Mahalaya cinematic experience">
      {/* Chapter navigation panel & toggle */}
      <ChapterNav
        cues={cues}
        currentFrameIdx={currentFrameIdx}
        onSeekToFrame={onSeekToFrame}
        isOpen={chaptersOpen}
        onToggle={() => setChaptersOpen((open) => !open)}
        onClose={() => setChaptersOpen(false)}
      />

      {/* Main content area: Cinematic Frame Viewer or End Screen */}
      <div className="experience__main">
        {ended ? (
          <EndScreen
            onReplay={onReplay}
            onReturnToBeginning={onReturnToBeginning}
          />
        ) : (
          <FrameViewer
            cue={currentCue}
            prevCue={prevCue}
          />
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="experience__error" role="alert">
          <span>⚠ {error}</span>
        </div>
      )}

      {/* Custom Music Player Card — replacing old bottom player */}
      <MusicPlayerCard
        cue={currentCue}
        currentTime={currentTime}
        duration={duration}
        playing={playing}
        buffering={buffering}
        onTogglePlay={onTogglePlay}
        onSeek={onSeek}
        onPrev={onPrevFrame}
        onNext={onNextFrame}
        hasPrev={currentFrameIdx > 0}
        hasNext={currentFrameIdx < cues.length - 1}
        onToggleChapters={() => setChaptersOpen((open) => !open)}
        artistLabel="Durga Puja Documentary · Birendra Krishna Bhadra"
      />
    </div>
  );
}
