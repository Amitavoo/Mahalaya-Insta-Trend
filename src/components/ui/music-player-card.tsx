import React, { useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Radio } from 'lucide-react';
import './music-player-card.css';

export interface CueItem {
  frame: number;
  start: number;
  end: number;
  title_bn: string;
  title_en: string;
  subtitle?: string;
  image: string;
}

export interface MusicPlayerCardProps {
  cue?: CueItem;
  currentTime?: number;
  duration?: number;
  playing?: boolean;
  buffering?: boolean;
  onTogglePlay?: () => void;
  onSeek?: (seconds: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onToggleChapters?: () => void;
  artistLabel?: string;
  className?: string;
}

function formatTime(seconds?: number): string {
  if (seconds === undefined || !isFinite(seconds) || isNaN(seconds) || seconds < 0) {
    return '0:00';
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80';

export const MusicPlayerCard: React.FC<MusicPlayerCardProps> = ({
  cue,
  currentTime = 0,
  duration = 0,
  playing = false,
  buffering = false,
  onTogglePlay,
  onSeek,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  onToggleChapters,
  artistLabel = 'Durga Puja Documentary · Birendra Krishna Bhadra',
  className = '',
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Compute progress ratio safely
  const effectiveDuration = duration > 0 ? duration : 5359;
  const progressRatio = Math.max(0, Math.min(1, currentTime / effectiveDuration));
  const progressPercent = Number((progressRatio * 100).toFixed(2));

  // Compute remaining time
  const remainingSeconds = Math.max(0, duration - currentTime);
  const formattedCurrentTime = formatTime(currentTime);
  const formattedRemainingTime = duration > 0 ? `-${formatTime(remainingSeconds)}` : formatTime(remainingSeconds);

  // Fallback metadata for default/standalone use
  const chapterNumber = cue?.frame ?? 1;
  const displayTitle = cue
    ? `${cue.title_bn} · ${cue.title_en}`
    : 'মহিষাসুরমর্দিনী · The Rise of Mahishasura';
  const displayImage = imgError || !cue?.image ? DEFAULT_FALLBACK_IMAGE : cue.image;

  // Handle seek calculation from clientX
  const calculateSeekTime = useCallback((clientX: number): number => {
    if (!progressBarRef.current || effectiveDuration <= 0) return 0;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clampedX = Math.max(rect.left, Math.min(clientX, rect.right));
    const ratio = (clampedX - rect.left) / rect.width;
    return ratio * effectiveDuration;
  }, [effectiveDuration]);

  // Pointer / Drag seeking interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!onSeek) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const targetSeconds = calculateSeekTime(e.clientX);
    onSeek(targetSeconds);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !onSeek) return;
    const targetSeconds = calculateSeekTime(e.clientX);
    onSeek(targetSeconds);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture release error if already released
    }
  };

  // Keyboard navigation on progress bar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onSeek) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onSeek(Math.max(0, currentTime - 10));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onSeek(Math.min(effectiveDuration, currentTime + 10));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSeek(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSeek(effectiveDuration);
    }
  };


  return (
    <div
      className={`music-player-container ${className}`.trim()}
      role="region"
      aria-label="Mahalaya audio player card"
    >
      <div className="main-music-card">
        {/* Hidden checkbox preserved for pure-CSS state compatibility */}
        <input
          type="checkbox"
          id="play-toggle"
          hidden
          checked={playing}
          readOnly
          aria-hidden="true"
        />

        {/* Track Info */}
        <div className="track-info">
          <div className="album-art" title={`Chapter ${chapterNumber} artwork`}>
            <img
              key={cue?.image ?? 'default'}
              src={displayImage}
              alt={`Chapter ${chapterNumber}: ${displayTitle}`}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>

          <div className="track-details">
            <div className="track-title" title={displayTitle}>
              {displayTitle}
            </div>
            <div className="artist-name" title={artistLabel}>
              {artistLabel}
            </div>
          </div>

          {/* Equalizer Volume Bars */}
          <div
            className={`volume-bars ${playing ? 'is-active' : 'is-paused'}`}
            aria-hidden="true"
            title={playing ? 'Audio playing' : 'Audio paused'}
          >
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
          </div>
        </div>

        {/* Playback Controls */}
        <div className="playback-controls">
          {/* Time display */}
          <div className="time-info" aria-live="off">
            <span className="current-time">{formattedCurrentTime}</span>
            <span className="remaining-time">{formattedRemainingTime}</span>
          </div>

          {/* Progress bar and seek handle */}
          <div
            ref={progressBarRef}
            className={`progress-bar ${isDragging ? 'is-dragging' : ''}`}
            role="slider"
            aria-label="Playback progress"
            aria-valuemin={0}
            aria-valuemax={Math.round(effectiveDuration)}
            aria-valuenow={Math.round(currentTime)}
            aria-valuetext={`${formattedCurrentTime} of ${formatTime(effectiveDuration)}`}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
          >
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="progress-handle"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Button Row */}
          <div className="button-row">
            <div className="main-control-btns">
              <button
                type="button"
                className="control-button back"
                onClick={onPrev}
                disabled={!hasPrev || !onPrev}
                aria-label="Previous chapter"
                title="Previous chapter"
              >
                <SkipBack className="w-5 h-5" fill="currentColor" aria-hidden="true" />
              </button>

              <div className="play-pause-btns">
                <button
                  type="button"
                  className="control-button play-pause-button"
                  onClick={onTogglePlay}
                  aria-label={playing ? 'Pause audio' : 'Play audio'}
                  title={playing ? 'Pause' : 'Play'}
                >
                  {buffering ? (
                    <span className="play-pause-spinner" aria-hidden="true" />
                  ) : playing ? (
                    <Pause className="w-5 h-5" fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" aria-hidden="true" />
                  )}
                </button>
              </div>

              <button
                type="button"
                className="control-button next"
                onClick={onNext}
                disabled={!hasNext || !onNext}
                aria-label="Next chapter"
                title="Next chapter"
              >
                <SkipForward className="w-5 h-5" fill="currentColor" aria-hidden="true" />
              </button>
            </div>

            {/* Radar / Chapter Explorer Button */}
            <button
              type="button"
              className="control-button d"
              onClick={onToggleChapters}
              aria-label="Browse all chapters"
              title="Chapter Explorer (Browse all chapters)"
            >
              <Radio className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerCard;
