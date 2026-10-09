import { useEffect, useState, useRef } from 'react';
import './FrameViewer.css';

const MOTION_CLASSES = {
  slowZoom: 'motion-zoom',
  panLeft:  'motion-pan-left',
  panRight: 'motion-pan-right',
  shake:    'motion-shake',
  fadeGlow: 'motion-glow',
};

export default function FrameViewer({ cue, prevCue, transitioning }) {
  const [loaded, setLoaded] = useState(false);
  const [displayCue, setDisplayCue] = useState(cue);
  const [fadingOut, setFadingOut] = useState(false);
  const timeoutRef = useRef(null);

  // Handle crossfade when cue changes
  useEffect(() => {
    if (cue.frame === displayCue.frame) return;
    setFadingOut(true);
    timeoutRef.current = setTimeout(() => {
      setDisplayCue(cue);
      setLoaded(false);
      setFadingOut(false);
    }, 600);
    return () => clearTimeout(timeoutRef.current);
  }, [cue]);

  const motionClass = MOTION_CLASSES[displayCue.motionPreset] || 'motion-zoom';

  return (
    <div className={`frame-viewer ${fadingOut ? 'fading-out' : 'fading-in'}`} aria-label={`Scene: ${displayCue.title_en}`}>
      {/* Main image */}
      <div className="frame-viewer__img-wrap">
        <img
          key={displayCue.frame}
          src={displayCue.image}
          alt={`${displayCue.title_en} — ${displayCue.subtitle}`}
          className={`frame-viewer__img ${motionClass} ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
        />

        {/* Cinematic overlays */}
        <div className="frame-viewer__vignette" aria-hidden="true" />
        <div className="frame-viewer__letterbox-top" aria-hidden="true" />
        <div className="frame-viewer__letterbox-bottom" aria-hidden="true" />
        <div className="frame-viewer__grain" aria-hidden="true" />
      </div>

      {/* Chapter label — top left */}
      <div className="frame-viewer__chapter" aria-live="polite" aria-atomic="true">
        <span className="chapter-number">Chapter {displayCue.frame}</span>
        <h2 className="chapter-title-bn" lang="bn">{displayCue.title_bn}</h2>
        <p className="chapter-title-en">{displayCue.title_en}</p>
      </div>

      {/* Subtitle at bottom */}
      <div className="frame-viewer__subtitle">
        <p>{displayCue.subtitle}</p>
      </div>
    </div>
  );
}
