# User Experience — Mahalaya: The Eternal Return

## Core Experience

Create an immersive, cinematic website using the provided Mahalaya audio file and ten numbered image frames.

**The image sequence must always follow this exact order: Frame 1 → Frame 2 → Frame 3 → Frame 4 → Frame 5 → Frame 6 → Frame 7 → Frame 8 → Frame 9 → Frame 10.**

Do not reorder, skip, duplicate, or reinterpret the frames. The filenames and frame numbers determine the sequence.


## 1. Main Experience

- Display the current frame prominently.
- Start with Frame 1.
- Progress sequentially through Frames 2, 3, 4, 5, 6, 7, 8, 9, and 10.
- Use smooth cinematic transitions between frames.
- Preserve the original appearance and composition of the provided images.
- Use the supplied Mahalaya audio as the soundtrack.

## 2. Audio Synchronization

- Use the audio playback time to control the active frame.
- Configure the start and end time for each frame in one centralized timeline configuration.
- Keep frames in numerical order from 1 to 10.
- Do not invent timestamps or assume that every frame should have an equal duration.
- If exact timestamps are unavailable, make them configurable for later adjustment.
- Pausing, resuming, seeking, or replaying must keep the displayed frame synchronized with the audio.

## 3. Player Controls

Provide functional controls for:

- Play and pause.
- Audio seeking and progress.
- Previous and next frame.
- Current playback time and total duration.
- Optional frame navigation.

Previous and next controls must follow the numerical frame order. Selecting a frame must seek to its configured audio position.

## 4. Final Frame

When playback reaches the end, display **Frame 10** and keep it visible.

Provide options to replay the experience or return to the beginning.

## 5. Visual Design

Use a premium cinematic aesthetic inspired by Bengali cultural heritage:

- Charcoal black, deep crimson, antique gold, and warm ivory.
- Bengali and English typography.
- Subtle alpana and traditional textile-inspired details.
- Smooth fades and restrained cinematic motion.
- Responsive layouts for desktop and mobile.

Keep the supplied images as the primary visual content. Do not generate replacement images or use unrelated artwork.

## Critical Rule

**Always display the supplied images in this exact numerical order: Frame 1 → Frame 2 → Frame 3 → Frame 4 → Frame 5 → Frame 6 → Frame 7 → Frame 8 → Frame 9 → Frame 10.**

Do not infer a different order from the story, image contents, filenames beyond their frame numbers, or any previous version of the user experience document.

Inspect the existing project, update `userexperience.md`, and ensure the implementation follows this sequence throughout playback, seeking, chapter navigation, and replay.