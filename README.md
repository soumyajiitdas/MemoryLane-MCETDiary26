# Our Memory-Lane | MCET Diary '26 📒

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white)](https://www.framer.com/motion/)

A premium, emotionally engaging digital archive designed for the **MCET Batch of 2022–2026**. **MCET Diary '26** is more than just a website; it is an immersive "Memory Lane" that captures the essence of college life through a nostalgic, vintage scrapbook aesthetic.

## 📖 Overview

MCET Diary '26 serves as a digital time capsule. It transforms static memories into an interactive journey, featuring a tactile "book-like" navigation and highly stylized visual elements that evoke the feeling of flipping through a physical diary.

### Key Highlights
- **Nostalgic Aesthetics:** A curated design system featuring aged paper textures, vintage Polaroid cards, and film grain effects.
- **Cinematic Experience:** High-fidelity end credits with a scrolling vertical film strip and nostalgic projection filters.
- **Interactive Celebration:** A global birthday recognition system and a special Graduation Day milestone mode.
- **Soulful Soundtrack:** A fully functional vintage vinyl player featuring a curated collection of tracks from our college years.
- **Tactile UI:** Draggable personal "dossiers" for every batchmate, custom fountain pen cursors, and paper-tear transitions.

## ✨ Features

### 🎞️ Cinematic End Credits
A breathtaking finale to the digital diary, inspired by classic cinema.
- **Film Strip Scroll:** A vertical scrolling film strip displaying random memories from the batch's journey.
- **Projection Effects:** Real-time film grain, projector flicker, and lens-burn effects for an authentic 70s movie feel.
- **Orchestrated Roll:** Smoothly scrolling credits featuring the entire batch (The Cast), defining moments, and emotional verses.

### 🎭 Interactive Cast Dossier
Every batchmate's profile is an interactive, draggable workspace that feels like a scattered physical desk.
- **Draggable Artifacts:** Clicking a cast member reveals a "Dossier" containing draggable birthday cards, roll number tags, polaroids, and handwritten notes.
- **Stamp Aesthetic:** Nicknames are presented as vintage ink stamps, and social links are "taped" onto the paper.
- **Physical Interaction:** Items react with realistic physics-based spring animations when dragged and dropped.

### 🎵 Batch Soundtrack (The Memory Tape)
A custom-built vinyl record player that houses the songs that defined our four years.
- **Realistic Turntable:** Features a spinning vinyl disc with dynamic labels and a moving tone-arm that reacts to play/pause states.
- **Curated Tracklist:** A collection of tracks from college events, canteen addas, and trips.
- **Visual Feedback:** CSS-animated sound wave visualizers and a blurred "ready state" for the tracklist panel.

### 🖋️ Fountain Pen Cursor
A bespoke interactive element that replaces the standard mouse cursor.
- **Context Aware:** The cursor transforms into a vintage fountain pen, leaving behind a subtle ink trail (in specific modes) and reacting to hover states.
- **Premium Feel:** Designed to enhance the "scrapbook" metaphor, making every click feel like a pen stroke.

### 📅 Global Celebration Banners
Automated banners that transform the site's atmosphere for special batch milestones.
- **Birthday Mode:** Identifies batchmates' birthdays and triggers a full-screen confetti burst with personalized greetings.
- **Graduation Countdown:** A state-of-the-art glassmorphic countdown ticker leading to the graduation ceremony.
- **Milestone Mode:** A specialized banner for Graduation Day (July 17, 2026) with exclusive celebratory visuals.

### 📖 Flipping Chapter Cards
The **Chapters** page houses the batch's timeline, now enhanced with deep interactivity.
- **Diary Entries**: Every timeline photo is a 3D flip card.
- **Auto-Flip Back**: Cards flip manually on hold and return to their original state upon release, making browsing feel like rapid-peeking into a diary.

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS for custom tokens)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Audio:** Custom Web Audio API wrapper with `PlayerContext`
- **Routing:** [React Router 7](https://reactrouter.com/)

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Navbar, Footer, Page transitions, and Scroll control
│   ├── ui/           # EndCredits, Vinyl Player, FountainPen, DiaryLoader
│   └── sections/     # Hero (Easter Egg), MomentCard, ScrapbookGrid
├── context/          # PlayerContext for global audio orchestration
├── data/             # Batchmates (Cast), Chapters (Timeline), and Soundtrack data
├── pages/            # Narrative sections (Prologue, Chapters, The Cast, Scrapbook, OurNotes, LastPages)
├── hooks/            # Custom animation, intersection, and media hooks
├── utils/            # Data-formatting, sleep-prevention, and math helpers
├── App.jsx           # Routing and Global Providers
└── index.css         # Design System, Global Styles, and Keyframe Animations
```

## 🚀 Deployment & Configuration

### Hosting
The project is optimized for deployment on **Vercel** or **Render**, utilizing static site hosting for high-performance delivery.

### Installation & Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/soumyajiitdas/MemoryLane-MCETDiary26.git
   cd MemoryLane-MCETDiary26
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🛡️ License

Distributed under the **GNU License v3.0**. See `LICENSE` for more information.

---