# Our Memory Lane | MCET Diary'26 📒

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white)](https://www.framer.com/motion/)

A premium, emotionally engaging digital archive designed for the MCET Batch of 2022–2026. **MCET Diary '26** is more than just a website; it is an immersive "Memory Lane" that captures the essence of college life through a nostalgic, vintage scrapbook aesthetic.

## 📖 Overview

MCET Diary '26 serves as a digital time capsule. It transforms static memories into an interactive journey, featuring a tactile "book-like" navigation and highly stylized visual elements that evoke the feeling of flipping through a physical diary.

### Key Highlights
- **Nostalgic Aesthetics:** A curated design system featuring aged paper textures, vintage Polaroid cards, and scrapbook-style modal popups.
- **Dynamic Content:** A full directory of the "Cast" (batchmates) and key "Events" that defined the four-year journey.
- **Interactive Celebration:** A global birthday recognition system with immersive confetti effects.
- **Fluid Experience:** Seamless page transitions and micro-animations powered by Framer Motion.

## ✨ Features

### 🎞️ The Cast (Roll Call)
An interactive directory of batchmates presented as realistic **Vintage Polaroid Cards**.
- **Tactile Design:** Cards feature "masking tape" anchors and aged photo filters.
- **Scrapbook Popups:** Clicking a card reveals a detailed "scrapbook page" with:
  - Handwritten nicknames on torn paper.
  - Social link "stickers."
  - Personal one-liners on ruled notebook fragments.

### 📅 Global Birthday Banner
A festive, automated banner that appears on batchmates' birthdays.
- **Smart Logic:** Automatically identifies birthdays from the dataset.
- **Celebration Mode:** Triggers a full-screen confetti burst using `react-confetti` for a truly celebratory feel.
- **Intimate Tone:** Uses cursive typography and first-name greetings.

### 🧭 Narrative Navigation
- **Chapter-Based Flow:** Organized into Prologue, Chapters, The Cast, Scrapbook, and more.
- **Intuitive Controls:** Minimalist "Previous" and "Next" navigation to maintain the story-driven flow.

### 🌓 Dark Theme & Grain
A sophisticated dark mode base layered with a subtle film grain effect for a cinematic, premium touch.

> *“We didn't realize we were making memories, we just knew we were having fun.”*

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Vanilla CSS for custom tokens)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Special Effects:** [React Confetti](https://github.com/alampros/react-confetti)
- **Routing:** [React Router 7](https://reactrouter.com/)



## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

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

4. **Build for production:**
   ```bash
   npm run build
   ```



## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Navbar, Footer, Page Transitions
│   ├── ui/           # Modal, SectionHeading, BirthdayBanner
│   └── sections/     # ProfileCard, MomentCard
├── data/             # Centralized JSON/JS for batchmates and events
├── pages/            # Main narrative sections (Prologue, TheCast, etc.)
├── App.jsx           # Routing and Global Providers
└── index.css         # Design System and Global Styles
```



## 📝 Configuration

### Adding Batchmates
Details are managed in `src/data/batchmates.js`. Each entry supports:
- `name`: Full Name
- `nickname`: Displayed on torn paper in popup
- `birthday`: Format `MM-DD` for the banner
- `oneliner`: Personal quote
- `socialLinks`: GitHub, LinkedIn, Instagram links



## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
