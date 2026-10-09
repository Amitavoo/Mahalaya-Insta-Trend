import { useState, useRef, useEffect, useCallback } from 'react';
import CUES from './cues';
import LandingScreen from './components/LandingScreen';
import CinematicExperience from './components/CinematicExperience';
import './App.css';

function getFrameForTime(time) {
  // Return the cue index whose window contains `time`
  for (let i = CUES.length - 1; i >= 0; i--) {
    if (time >= CUES[i].start) return i;
  }
  return 0;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(null);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [ended, setEnded] = useState(false);

  const audioRef = useRef(null);

  // Sync frame with audio time
  useEffect(() => {
    const idx = getFrameForTime(currentTime);
    if (idx !== currentFrameIdx) {
      setCurrentFrameIdx(idx);
    }
  }, [currentTime]);

  const handleStart = useCallback(async () => {
    setStarted(true);
    try {
      await audioRef.current?.play();
      setPlaying(true);
    } catch {
      // autoplay blocked — user will click play
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  const seek = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(seconds, duration));
  }, [duration]);

  const seekToFrame = useCallback((idx) => {
    seek(CUES[idx].start);
  }, [seek]);

  const goNextFrame = useCallback(() => {
    const next = Math.min(currentFrameIdx + 1, CUES.length - 1);
    seekToFrame(next);
  }, [currentFrameIdx, seekToFrame]);

  const goPrevFrame = useCallback(() => {
    const prev = Math.max(currentFrameIdx - 1, 0);
    seekToFrame(prev);
  }, [currentFrameIdx, seekToFrame]);

  const handleReplay = useCallback(() => {
    setEnded(false);
    setCurrentFrameIdx(0);
    seek(0);
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  }, [seek]);

  const handleReturnToBeginning = useCallback(() => {
    setEnded(false);
    setCurrentFrameIdx(0);
    seek(0);
    audioRef.current?.pause();
    setPlaying(false);
  }, [seek]);

  // Audio event handlers
  const onTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime ?? 0);
  const onLoadedMetadata = () => setDuration(audioRef.current?.duration ?? 0);
  const onWaiting = () => setBuffering(true);
  const onCanPlay = () => setBuffering(false);
  const onEnded = () => { setPlaying(false); setEnded(true); setCurrentFrameIdx(CUES.length - 1); };
  const onError = () => setError('Audio failed to load. Please refresh and try again.');

  return (
    <div className="app-root">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/mahalaya.mp4"
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onWaiting={onWaiting}
        onCanPlay={onCanPlay}
        onEnded={onEnded}
        onError={onError}
        aria-label="Mahalaya audio — Birendra Krishna Bhadra"
      />

      {!started ? (
        <LandingScreen onStart={handleStart} error={error} />
      ) : (
        <CinematicExperience
          cues={CUES}
          currentFrameIdx={currentFrameIdx}
          currentTime={currentTime}
          duration={duration}
          playing={playing}
          buffering={buffering}
          ended={ended}
          error={error}
          onTogglePlay={togglePlay}
          onSeek={seek}
          onSeekToFrame={seekToFrame}
          onPrevFrame={goPrevFrame}
          onNextFrame={goNextFrame}
          onReplay={handleReplay}
          onReturnToBeginning={handleReturnToBeginning}
        />
      )}
    </div>
  );
}
