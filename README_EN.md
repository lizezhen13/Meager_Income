<h1 align="center">💰 Meager Income</h1>

<p align="center">
 🌐 <a href="README.md">🇨🇳 中文</a> | 🇺🇸 English
</p>

A lightweight and fun **real-time salary visualizer**. Enter your salary information, and it will calculate in real time how much you earn every second, every minute, and every hour—making tedious work time visible and quantifiable.

---

## ✨ Features

- ⚡ **Real-time Income Calculation** — Based on monthly salary, work hours, and working days per month, it displays how much you've earned so far in real time
- 📊 **Multi-dimensional Income Stats** — Shows income rate per second, minute, hour, and day
- ⏱️ **Work Timer** — Accurately tracks today's work duration
- 📈 **Work Progress Bar** — Visually displays the percentage of today's work completed
- 🏆 **Achievement System** — Unlock fun achievements as your income accumulates, adding joy to your work
- 📱 **Responsive Design** — Adapted for both desktop and mobile devices
- 🐳 **Docker Support** — One-click containerized deployment

---

## 🛠️ Tech Stack

| Tech | Description |
|------|-------------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite 6 | Build Tool |
| CSS Modules | Component-level Style Isolation |

---

## 🚀 Quick Start

### 💻 Local Development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The dev server runs at `http://localhost:1213` by default.

### 📦 Production Build

```bash
npm run build
```

Build output goes to the `dist/` directory.

### 🐳 Docker Deployment

```bash
# One-click startup with Docker Compose
docker-compose up -d
```

The service will be exposed at `http://localhost:1213`

---

## 📖 Usage

1. 🔧 Open the app and enter your **monthly salary**, **daily work hours**, and **monthly working days** on the settings page
2. ▶️ Click "**Start Working**" to enter the work interface
3. 👀 Watch your income numbers grow in real time
4. ⏯️ Pause, resume, or end the timer at any time
5. 🎉 Unlock fun achievements after reaching income milestones

---

## 📂 Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom Hooks (core timer & income logic)
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   └── main.tsx         # App entry point
├── docker-compose.yml   # Docker Compose config
├── Dockerfile           # Docker image build
├── nginx.conf           # Nginx config
├── index.html           # HTML entry
├── package.json
└── vite.config.ts       # Vite config
```