import './AudioPlayer.css';

function formatTime(seconds) {
  if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
}

export default function AudioPlayer({
  cues,
  currentFrameIdx,
  currentTime,
  duration,
  playing,
  buffering,
  onTogglePlay,
  onSeek,
  onPrevFrame,
  onNextFrame,
  onSeekToFrame,
}) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentCue = cues[currentFrameIdx];

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onSeek(ratio * duration);
  };

  const handleProgressKey = (e) => {
    if (e.key === 'ArrowLeft') onSeek(currentTime - 10);
    if (e.key === 'ArrowRight') onSeek(currentTime + 10);
  };

  return (
    <div className="audio-player" role="region" aria-label="Mahalaya audio player">
      {/* Progress bar — full width top strip */}
      <div
        className="player__progress-bar"
        role="slider"
        aria-label="Audio progress"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        tabIndex={0}
        onClick={handleProgressClick}
        onKeyDown={handleProgressKey}
      >
        {/* Chapter segment markers */}
        <div className="player__segments" aria-hidden="true">
          {cues.map((cue, i) => (
            <div
              key={cue.frame}
              className="segment-marker"
              style={{ left: `${(cue.start / (duration || 5359)) * 100}%` }}
              title={cue.title_en}
              onClick={(e) => { e.stopPropagation(); onSeekToFrame(i); }}
            />
          ))}
        </div>
        <div className="player__progress-fill" style={{ width: `${progress}%` }} />
        <div className="player__progress-thumb" style={{ left: `${progress}%` }} />
      </div>

      {/* Controls row */}
      <div className="player__controls">
        {/* Left — time */}
        <div className="player__time" aria-live="off">
          <span className="time-current">{formatTime(currentTime)}</span>
          <span className="time-sep">·</span>
          <span className="time-total">{formatTime(duration)}</span>
        </div>

        {/* Centre — transport */}
        <div className="player__transport">
          <button
            className="transport-btn"
            onClick={onPrevFrame}
            aria-label="Previous chapter"
            title="Previous chapter"
            disabled={currentFrameIdx === 0}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>

          <button
            className="transport-btn play-btn"
            onClick={onTogglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            title={playing ? 'Pause' : 'Play'}
          >
            {buffering ? (
              <span className="buffering-ring" aria-hidden="true" />
            ) : playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <button
            className="transport-btn"
            onClick={onNextFrame}
            aria-label="Next chapter"
            title="Next chapter"
            disabled={currentFrameIdx === cues.length - 1}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14 5.45 3.86L8 17.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

        {/* Right — chapter info */}
        <div className="player__chapter-info">
          {playing && <span className="now-playing-dot" aria-hidden="true" />}
          <div className="chapter-info-text" aria-live="polite">
            <span className="chapter-info-num">Ch. {currentCue.frame} / {cues.length}</span>
            <span className="chapter-info-title" lang="bn">{currentCue.title_bn}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
