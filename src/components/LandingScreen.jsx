import './LandingScreen.css';

export default function LandingScreen({ onStart, error }) {
  return (
    <div className="landing" role="main" aria-label="Mahalaya landing screen">
      {/* Cinematic background — Frame 01 as hero */}
      <div className="landing__bg">
        <img
          src="/frames/frame-01.png"
          alt="Bengali riverside temple at sunrise — an establishing cinematic frame"
          className="landing__bg-img"
          loading="eager"
        />
        <div className="landing__bg-overlay" />
        <div className="landing__bg-gradient" />
      </div>

      {/* Particle / light leak decoration */}
      <div className="landing__particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Content */}
      <div className="landing__content">
        {/* Decorative line */}
        <div className="landing__ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span className="ornament-symbol">ॐ</span>
          <span className="ornament-line" />
        </div>

        <p className="landing__eyebrow">Birendra Krishna Bhadra presents</p>

        <h1 className="landing__title">
          <span className="landing__title-bn" lang="bn">মহালয়া</span>
          <span className="landing__title-divider" aria-hidden="true">—</span>
          <span className="landing__title-en">The Eternal Return</span>
        </h1>

        <p className="landing__tagline">
          An immersive cinematic journey through the myth of Mahishasuramardini
        </p>

        <div className="landing__meta" aria-hidden="true">
          <span>10 Chapters</span>
          <span className="dot">·</span>
          <span>Mahalaya Recording</span>
          <span className="dot">·</span>
          <span>~89 Minutes</span>
        </div>

        {error && (
          <p className="landing__error" role="alert">{error}</p>
        )}

        <button
          className="landing__cta"
          onClick={onStart}
          aria-label="Begin the journey — starts audio playback"
        >
          <span className="cta-text">Begin the Journey</span>
          <span className="cta-icon" aria-hidden="true">▶</span>
        </button>

        <p className="landing__hint">Best experienced with headphones · Audio required</p>
      </div>

      {/* Bottom ornament */}
      <div className="landing__bottom-ornament" aria-hidden="true">
        <svg viewBox="0 0 200 16" xmlns="http://www.w3.org/2000/svg" className="ornament-svg">
          <path d="M0 8 Q50 0 100 8 Q150 16 200 8" stroke="#C08A38" strokeWidth="0.5" fill="none" opacity="0.6" />
          <circle cx="100" cy="8" r="2" fill="#C08A38" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
