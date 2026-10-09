import './EndScreen.css';

export default function EndScreen({ onReplay, onReturnToBeginning }) {
  return (
    <div className="end-screen" role="region" aria-label="Experience complete — Bijoya Dashami">
      <div className="end__bg">
        <img
          src="/frames/frame-10.png"
          alt="Bijoya Dashami — Sindoor Khela celebration in a Bengali courtyard (Frame 10)"
          className="end__bg-img"
        />
        <div className="end__bg-overlay" />
      </div>

      <div className="end__content">
        {/* Ornament */}
        <div className="end__ornament" aria-hidden="true">
          <span className="end-ornament-line" />
          <span className="end-ornament-symbol">🔱</span>
          <span className="end-ornament-line" />
        </div>

        <p className="end__eyebrow">বিজয়া দশমী · Frame 10</p>

        <h2 className="end__title">Victory. Devotion. Return.</h2>

        <p className="end__message">
          The demon is vanquished. The Goddess returns to her celestial abode.
          <br />
          Bengal bids farewell with sindoor, music, and eternal devotion.
        </p>

        <p className="end__bengali" lang="bn">
          শুভ বিজয়া দশমী
        </p>

        <div className="end__actions">
          <button
            className="end__replay-btn end__replay-btn--primary"
            onClick={onReplay}
            aria-label="Experience Again — restart and play from beginning"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
            <span>Experience Again</span>
          </button>

          <button
            className="end__replay-btn end__replay-btn--secondary"
            onClick={onReturnToBeginning || onReplay}
            aria-label="Return to Beginning — reset to Frame 1"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
            <span>Return to Beginning</span>
          </button>
        </div>

        <p className="end__credit">
          Mahishasuramardini — Birendra Krishna Bhadra
        </p>
      </div>
    </div>
  );
}
