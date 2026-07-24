# ✈️ AIVUM — Global Aviation Supply Chain & Orbital Platform

> **Precision Sourcing, Certification & Logistics for Private Aircraft Components in Orbit.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-12.23-E50914?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Overview

**AIVUM** is a next-generation web application designed for private aviation operators, MROs (Maintenance, Repair, and Overhaul facilities), and premium aerospace manufacturers. It provides a sleek, sci-fi-inspired interface for tracking, sourcing, certifying, and transporting critical flight hardware globally.

---

## ✨ Key Features

- 🛸 **Interactive Orbital Diagram**: Real-time vector-drawn mathematical ellipse orbit paths visualizing core equipment domains (Avionics, Turbofans, Landing Gear, MRO, Logistics) with interactive nodes.
- 🌌 **Parallax Starfield Canvas**: HTML5 2D Canvas rendering glowing stars with cursor-influenced parallax inertia and twinkling animations.
- 🌍 **Multilingual & RTL Native Support**: Instant language switching between **English**, **Arabic** (with full RTL layout & `Cairo` font integration), **Spanish**, and **Portuguese**.
- 📊 **Animated Telemetry & Stats**: Smooth `requestAnimationFrame` numeric counter animations triggered on viewport intersection.
- 🍱 **Bento Grid Services**: Highlighting flight hardware categories with interactive hover micro-animations.
- 🛰️ **4-Step Supply Chain Lifecycle**: Animated SVG flight paths detailing parts request, sourcing, FAA/EASA verification, and hangar delivery.
- ✉️ **Interactive Contact Form**: Floating label inputs with loading and success feedback states.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **UI Framework** | React 19 (`react`, `react-dom`) |
| **Build System** | Vite 6 |
| **Language** | TypeScript 5.8 |
| **Styling** | TailwindCSS v4 + Custom HSL Color Tokens |
| **Animations** | Motion (`motion/react`) + Native CSS Keyframes |
| **Icons** | Lucide React |
| **Fonts** | Space Grotesk, Inter, Cairo (Google Fonts) |

---

## 📂 Project Structure

```text
aivum/
├── assets/             # Static assets & metadata
├── src/
│   ├── components/     # Modular React components
│   │   ├── About.tsx         # Mission narrative & rotating global route visual
│   │   ├── Contact.tsx       # Floating label contact uplink form
│   │   ├── Footer.tsx        # Footer navigation & language selector
│   │   ├── Hero.tsx          # Hero banner with primary CTAs
│   │   ├── Navbar.tsx        # Sticky header & mobile menu overlay
│   │   ├── OrbitDiagram.tsx  # Mathematical SVG orbital diagram
│   │   ├── Process.tsx       # Supply chain lifecycle stepper
│   │   ├── Services.tsx      # Interactive Bento Grid of services
│   │   ├── Starfield.tsx     # Canvas 2D interactive star field
│   │   └── Stats.tsx         # Animated scroll-triggered counters
│   ├── App.tsx         # Main entry component & initial loader sequence
│   ├── data.ts         # Internationalization data & translations
│   ├── index.css       # Tailwind CSS v4 directives & typography
│   ├── main.tsx        # React root rendering
│   └── types.ts        # TypeScript interfaces & schema definitions
├── .env.example        # Environment variable template
├── index.html          # Entry HTML template
├── package.json        # Node dependencies & project scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration & aliases
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aivum.git
   cd aivum
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Vite local development server (`http://localhost:3000`).
- `npm run build` — Compiles TypeScript and creates optimized production bundle in `/dist`.
- `npm run preview` — Locally previews the compiled production build.
- `npm run lint` — Runs TypeScript type verification (`tsc --noEmit`).

---

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for details.

