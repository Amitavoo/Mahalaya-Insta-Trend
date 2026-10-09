import { useState } from 'react';
import './ChapterNav.css';

export default function ChapterNav({
  cues,
  currentFrameIdx,
  onSeekToFrame,
  isOpen: controlledOpen,
  onToggle: controlledToggle,
  onClose: controlledClose,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (controlledToggle) {
      controlledToggle();
    } else {
      setInternalOpen(o => !o);
    }
  };

  const handleClose = () => {
    if (controlledClose) {
      controlledClose();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="chapnav-toggle"
        onClick={handleToggle}
        aria-expanded={open}
        aria-label={open ? 'Close chapter navigation' : 'Open chapter navigation'}
        aria-controls="chapter-nav-panel"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          id="chapter-nav-panel"
          className="chapnav-panel"
          role="navigation"
          aria-label="Chapter navigation"
        >
          <div className="chapnav-header">
            <span className="chapnav-title">Chapters</span>
            <button
              className="chapnav-close"
              onClick={handleClose}
              aria-label="Close chapter navigation"
            >✕</button>
          </div>
          <ol className="chapnav-list">
            {cues.map((cue, idx) => (
              <li key={cue.frame}>
                <button
                  className={`chapnav-item ${idx === currentFrameIdx ? 'active' : ''}`}
                  onClick={() => { onSeekToFrame(idx); handleClose(); }}
                  aria-current={idx === currentFrameIdx ? 'true' : undefined}
                >
                  <span className="chapnav-num">{String(cue.frame).padStart(2,'0')}</span>
                  <div className="chapnav-info">
                    <span className="chapnav-bn" lang="bn">{cue.title_bn}</span>
                    <span className="chapnav-en">{cue.title_en}</span>
                  </div>
                  {idx === currentFrameIdx && (
                    <span className="chapnav-active-dot" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="chapnav-backdrop"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
    </>
  );
}
