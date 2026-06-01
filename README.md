# ⚛ Richard P. Feynman — Interactive Digital Biography

> *"The pleasure of finding things out."* — Richard P. Feynman

An award-worthy, immersive single-page digital biography celebrating the life, science, and enduring legacy of **Richard Phillips Feynman** (1918–1988) — Nobel Laureate physicist, quantum pioneer, master educator, bongo drummer, and safe cracker.

---

## 🌟 Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/richard-feynman-showcase)

---

## ✨ Features

### 🎬 Cinematic Experience
- **Animated Loading Screen** — orbital atom spinner with progress bar
- **Three.js Particle Background** — quantum particles drifting through space
- **Custom Cursor** — glowing neon cursor with smooth follower
- **Scroll Progress Indicator** — gradient bar tracking your journey
- **Smooth Section Transitions** — GSAP-powered reveals on scroll
- **Parallax Effects** — depth in every scroll movement

### 📖 Content Sections
| Section | Description |
|---|---|
| **Hero** | Full-screen portrait, typewriter effect cycling 8 roles, animated rings |
| **Key Statistics** | CountUp.js animated counters (69 years, 1965 Nobel, 100+ papers...) |
| **Interactive Timeline** | Horizontal draggable timeline · 11 life events · click to expand |
| **Scientific Contributions** | 6 hover-reveal cards with impact scores and historical context |
| **Feynman Diagram Visualizer** | Live animated quantum diagrams — 3 interaction types |
| **Nobel Prize Showcase** | Animated gold medal · co-laureates · research summary |
| **Data Dashboard** | Chart.js: bar, radar, doughnut, and legacy gauge charts |
| **Famous Quotes** | Auto-advancing carousel with 6 quotes, dot navigation |
| **Books Gallery** | 4 flip-on-hover 3D book cards |
| **Challenger Investigation** | Interactive SVG simulation of the O-ring failure |
| **Legacy Map** | SVG USA map with animated markers for MIT, Princeton, Los Alamos, Caltech |
| **Fun Facts** | 6 animated personality cards beyond the physics |
| **Achievements Dashboard** | Scroll-triggered unlock animations for 8 achievements |

### 🎨 Design System
- **Dark space theme** with neon blue, purple, and cyan accents
- **Glassmorphism** cards with `backdrop-filter: blur`
- **Playfair Display** + **Space Mono** + **Syne** typography trio
- **CSS Variables** for consistent theming
- **Dark/Light mode** toggle
- **Mobile responsive** from 320px → 4K

---

## 📸 Screenshots

```
Hero Section          → Animated portrait with orbital rings + typewriter
Timeline              → Horizontal scroll, 11 events, click to expand
Feynman Diagrams      → Live canvas animation of electron/photon interactions
Charts Dashboard      → 4 Chart.js visualizations
Challenger Sim        → Interactive O-ring temperature demonstration
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16.0.0
- npm ≥ 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/richard-feynman-showcase.git

# Navigate into the project
cd richard-feynman-showcase

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
richard-feynman-showcase/
│
├── index.html          # Main HTML — all sections
├── styles.css          # Custom CSS — animations, glassmorphism, themes
├── script.js           # JavaScript — GSAP, Three.js, Chart.js, interactions
│
├── assets/
│   ├── images/         # (optional) Local images
│   ├── icons/          # (optional) Custom icons
│   └── data/           # (optional) JSON data files
│
├── README.md           # This file
├── package.json        # NPM config + scripts
├── vercel.json         # Vercel deployment config
└── .gitignore          # Git ignore rules
```

---

## 🌐 Deployment

### Vercel (Recommended)

**Option 1 — One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/richard-feynman-showcase)

**Option 2 — CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### GitHub Pages

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Enable GitHub Pages in repo Settings
# Source: Deploy from branch → main → / (root)
```

### Netlify

```bash
# Drag and drop the project folder to
# https://app.netlify.com/drop

# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir .
```

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Structure & semantic markup |
| CSS3 | — | Animations, glassmorphism, custom properties |
| JavaScript | ES2020+ | Interactions, data, logic |
| **Tailwind CSS** | CDN 3.x | Utility-first styling |
| **GSAP** | 3.12.5 | ScrollTrigger, TextPlugin, timeline animations |
| **Three.js** | r128 | WebGL particle background |
| **Chart.js** | 4.4.0 | Bar, radar, doughnut, gauge charts |
| **CountUp.js** | 2.8.0 | Animated number counters |
| Google Fonts | — | Playfair Display · Space Mono · Syne |

All libraries loaded via CDN — **zero build step required**.

---

## ⚡ Performance

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

**Optimizations applied:**
- Lazy initialization — charts and CountUp only trigger when sections scroll into view
- Three.js renders at `min(devicePixelRatio, 2)` to cap GPU load
- `requestAnimationFrame`-based animation loops
- Throttled scroll event listeners via GSAP ScrollTrigger
- CDN-hosted libraries with browser caching
- `font-display: swap` via Google Fonts

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`<nav>`, `<section>`, `<footer>`)
- Descriptive `alt` attributes and ARIA labels
- Keyboard navigable (Tab, Enter, Space)
- WCAG 2.1 AA contrast ratios for body text
- Reduced motion respect (can be added via `prefers-reduced-motion`)
- Skip-to-content link (can be added for full compliance)

---

## 🔬 Historical Accuracy

All content in this project is based on verified historical sources:

- Feynman, R.P. (1985). *Surely You're Joking, Mr. Feynman!* W.W. Norton.
- Feynman, R.P., Leighton, R.B., Sands, M. (1964). *The Feynman Lectures on Physics*. Addison-Wesley.
- Gleick, J. (1992). *Genius: The Life and Science of Richard Feynman*. Pantheon Books.
- Nobel Committee (1965). Nobel Prize in Physics citation.
- Presidential Commission on the Space Shuttle Challenger Accident (1986). Report to the President.
- Mehra, J. (1994). *The Beat of a Different Drum: The Life and Science of Richard Feynman*. Oxford University Press.

---

## 📄 License

MIT License — feel free to use, adapt, and learn from this project.

---

## 👏 Credits

- **Richard P. Feynman** — for making science feel like the greatest adventure possible
- **Three.js** — Mr.doob and contributors
- **GSAP** — GreenSock Animation Platform team
- **Chart.js** — Evert Timberg and contributors
- **Tailwind CSS** — Adam Wathan and team

---

## 🤝 Contributing

Pull requests welcome! Areas for improvement:
- Additional languages / internationalization
- More interactive Feynman diagrams
- Audio narration support
- WebGL shader effects

---

*"What I cannot create, I do not understand."* — Richard P. Feynman, Caltech blackboard, 1988
