# Mahalaya-Insta-Trend — মহালয়া: The Eternal Return

An immersive, cinematic storytelling website celebrating the Bengali cultural heritage of **Mahalaya** and the recitation of **Mahishasuramardini** by **Birendra Krishna Bhadra**. 

The visitor journeys through 10 mythological chapters in strict numerical sequence, synchronized with the master Mahalaya audio recording, featuring a bespoke music-player interface inspired by Bengali alpana, deep charcoal, antique-gold, and crimson aesthetics.

---

## 🏛️ Project Architecture & Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Scoped Vanilla CSS & Design Tokens
- **Typography**: [Google Fonts](https://fonts.google.com/) (`Noto Serif Bengali`, `Playfair Display`, `Cormorant Garamond`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Checking & Quality**: [TypeScript](https://www.typescriptlang.org/) + [Oxlint](https://oxc.rs/)
- **Audio Engine**: Native HTML5 Audio synchronizer with single master instance

---

## 🎨 Design System & Color Tokens

Inspired by traditional Bengali iconography, Shola craft, and devotional brassware:

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--charcoal` | `#100D0C` | Primary deep surface background |
| `--charcoal-mid` | `#1A1513` | Secondary surface / container panels |
| `--charcoal-light` | `#28221F` | Hover & card borders |
| `--crimson` | `#7E201E` | Sindoor & war accent gradient base |
| `--crimson-light`| `#A8302E` | Active highlights & equalizer bars |
| `--gold` | `#C08A38` | Antique brass & gold borders |
| `--gold-light` | `#D4A855` | Accents, play controls & time stamps |
| `--ivory` | `#EDE0C7` | Headings & Bengali typography |
| `--muted-text` | `#B6A99A` | Subtitles & secondary information |

---

## 🖼️ Provided Assets & Strict Numerical Frame Order

All supplied assets are preserved in the `public/` directory:

- **Audio**: `public/audio/mahalaya.mp4` (~87.3 MB, ~89:19 runtime)
- **Image Frames**: `public/frames/frame-01.png` through `frame-10.png`

> [!IMPORTANT]
> **Strict Sequence Rule**: Images are strictly displayed in numerical order:
> **Frame 1 → Frame 2 → Frame 3 → Frame 4 → Frame 5 → Frame 6 → Frame 7 → Frame 8 → Frame 9 → Frame 10**.
> Frames are never re-ordered, skipped, or duplicated based on subjective narrative interpretation.

---

## ⏱️ Timeline & Audio Synchronization (`src/cues.js`)

Frame timing data is centralized in [src/cues.js](src/cues.js). Each frame has a configurable `start` and `end` time in seconds:

| Frame | Image Asset | Start Time (sec) | Start Time (MM:SS) | Chapter Title (Bengali & English) |
| :---: | :--- | :---: | :---: | :--- |
| **1** | `/frames/frame-01.png` | `0` | `00:00` | অহংকারের উত্থান · The Rise of Mahishasura |
| **2** | `/frames/frame-02.png` | `300` | `05:00` | স্বর্গের পতন · The Fall of Heaven |
| **3** | `/frames/frame-03.png` | `720` | `12:00` | আদ্যাশক্তির আবির্ভাব · The Manifestation of Shakti |
| **4** | `/frames/frame-04.png` | `1320` | `22:00` | দেবী দুর্গার আবির্ভাব · The Divine Reveal |
| **5** | `/frames/frame-05.png` | `1920` | `32:00` | মহাশক্তির আবির্ভাব · The Divine Power Fully Armed |
| **6** | `/frames/frame-06.png` | `2520` | `42:00` | দেবী দুর্গার জাগরণ · The Awakening of Maa Durga |
| **7** | `/frames/frame-07.png` | `3120` | `52:00` | রণযাত্রা · The March to Battle |
| **8** | `/frames/frame-08.png` | `3900` | `65:00` | মহিষাসুরের রূপান্তর · Mahishasura's Transformations |
| **9** | `/frames/frame-09.png` | `4500` | `75:00` | মহিষাসুরমর্দিনী · The Triumph of Maa Durga |
| **10**| `/frames/frame-10.png` | `4980` | `83:00` | বিজয়া দশমী · Victory, Devotion & Homecoming |

### How to Adjust Frame Timestamps
To calibrate the timeline to match specific audio moments:
1. Open `src/cues.js`.
2. Edit the `start` and `end` integer values (in seconds).
3. The player seeker, chapter drawer, and automatic frame changer will immediately reflect the new timing.

---

## 🎵 Custom Music Player Card (`src/components/ui/music-player-card.tsx`)

The custom music player replaces the default generic player:
- **Album Artwork**: Displays the active chapter's frame thumbnail with graceful error fallback.
- **Track Details**: Shows the active chapter name and artist tag (`Durga Puja Documentary · Birendra Krishna Bhadra`).
- **Live Equalizer**: 8 animated volume bars that bounce during playback and freeze when paused.
- **Precision Seeking**: Pointer drag, click, and keyboard accessible progress slider with elapsed & remaining time indicators.
- **Transport Controls**: Previous chapter, Play/Pause with buffer indicator, and Next chapter.
- **Chapter Explorer Radar Button**: Clicking the radar button triggers the sliding Chapter Explorer drawer to jump to any chapter.

---

## 🚀 Setup & Development

### Prerequisites
- Node.js 18+ (tested on Node v26)
- npm 9+

### Installation
```bash
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## ♿ Accessibility & Motion

- **Keyboard Support**: Space / Enter to toggle play/pause; Left/Right arrow keys to seek; Tab to navigate all controls.
- **Reduced Motion**: Respects `prefers-reduced-motion` across image zooms, panning, particle overlays, and equalizer animations.
- **Screen Readers**: ARIA regions, slider roles (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`), and polite live announcements for chapter transitions.
