# Our Memory-Lane | MCET Diary '23-26 📒

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white)](https://www.framer.com/motion/)

A premium, emotionally engaging digital archive designed for the **MCET Batch of 2023–2026**. **MCET Diary '26** is more than just a website; it is an immersive "Memory Lane" that captures the essence of college life through a nostalgic, vintage scrapbook aesthetic.

## 📖 Overview

MCET Diary '26 serves as a digital time capsule. It transforms static memories into an interactive journey, featuring a tactile "book-like" navigation and highly stylized visual elements that evoke the feeling of flipping through a physical diary.

### Key Highlights
- **Nostalgic Aesthetics:** A curated design system featuring aged paper textures, vintage Polaroid cards, and scrapbook-style interactions.
- **Dynamic Content:** A full directory of the "Cast" (batchmates) and key "Chapters" that defined the four-year journey.
- **Interactive Celebration:** A global birthday recognition system with immersive confetti effects.
- **Fluid Experience:** Seamless page transitions and micro-animations powered by Framer Motion.
- **Soulful Features:** Interactive "Flip Side" notes and scavenger-hunt style easter eggs.

## ✨ Features

### 🎞️ Hero "Flip-Side" Easter Egg
The landing page features scattered polaroids in the background that act as interactive artifacts.
- **3D Interaction**: Hovering or holding a polaroid scales it up and flips it to reveal a handwritten memory on the back.
- **Nostalgic Typography**: Uses the `Caveat` handwriting font and aged paper textures for an authentic "found object" feel.

### 📖 Flipping Chapter Cards
The **Chapters** page houses the batch's timeline, now enhanced with deep interactivity.
- **Diary Entries**: Every timeline photo is a 3D flip card.
- **Auto-Flip Back**: Cards flip manually on hold and return to their original state upon release, making browsing feel like rapid-peeking into a diary.
- **Mobile Optimized**: Animated hints ("Hold photo to read note") guide touch users through the interaction.

### 📅 Global Birthday Banner
A festive, automated banner that appears on batchmates' birthdays.
- **Smart Logic:** Automatically identifies birthdays from the dataset.
- **Celebration Mode:** Triggers a full-screen confetti burst using `react-confetti` for a truly celebratory feel.
- **Intimate Tone:** Uses cursive typography and first-name greetings.

### ⏳ Premium Countdown Timer
A state-of-the-art countdown ticker built with premium glassmorphism.
- **Flip-Clock Animation**: Numbers transition with smooth, physics-based "flip" animations.
- **Visual Glow**: Pulsating separators and amber-accented glows that react to the site's dark palette.

### 🎭 The Cast (Roll Call)
An interactive directory of batchmates presented as realistic **Vintage Polaroid Cards**.
- **Tactile Design**: Cards feature "masking tape" anchors and aged photo filters.
- **Scrapbook Popups**: Clicking a card reveals a detailed "personal page" with nicknames, social links, and one-liners.

> *“We didn't realize we were making memories, we just knew we were having fun.”*

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS for custom tokens)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Special Effects:** [React Confetti](https://github.com/alampros/react-confetti)
- **Routing:** [React Router 7](https://reactrouter.com/)

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Page transitions and persistent navigation
│   ├── ui/           # CountdownTimer, ChapterNav, SectionHeading
│   └── sections/     # Hero (Easter Egg), MomentCard, Scrapbook
├── data/             # Batchmates, Chapters (Timeline), and Profile data
├── pages/            # Narrative sections (Prologue, Chapters, The Cast, Scrapbook)
├── hooks/            # Custom animation and intersection hooks
├── utils/            # data-formatting helpers
├── App.jsx           # Routing and Global Providers
└── index.css         # Design System and Global Styles
```

## 🚀 Deployment & Configuration

### Hosting
The project is optimized for deployment on **Vercel**, utilizing its static site hosting capabilities for high-performance delivery of the Vite build.


### Installation & Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/memory-lane.git
   cd memory-lane
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