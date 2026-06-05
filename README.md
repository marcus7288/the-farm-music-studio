# 🌾 The Farm Music Studio

A virtual AI-powered music studio for **Bryan Lewis** — built to support the full music production and publication workflow from first idea to release day.

---

## About

The Farm Music Studio is a responsive web app with a warm, barn-wood aesthetic that guides Bryan through every stage of making and releasing music. It curates the best free and paid online tools for each stage and provides a live project tracker to keep songs moving from idea to release.

---

## Features

### Studio Dashboard
- At-a-glance stats: active projects, tracks in progress, tool count
- Quick Launch buttons — one tap to open any key tool (BandLab, Hookpad, LANDR, DistroKid, Canva, SubmitHub)
- Snapshot of current projects with status badges
- Visual production pipeline overview

### Production Workflow
Six guided stages, each with step-by-step instructions and curated tools:

| Stage | Focus |
|---|---|
| 1. Write | Chord progressions, lyrics, notation |
| 2. Record | Multi-track recording, voice memos, demos |
| 3. Mix | EQ, compression, effects, automation |
| 4. Master | AI mastering, loudness normalization |
| 5. Release | Distribution to Spotify, Apple Music, Bandcamp, and more |
| 6. Promote | Playlist pitching, artwork, social media, Linktree |

### Tool Library
- 24 curated online tools across 7 categories
- Filter by production stage or free/paid
- Search by name or tag
- Direct launch links for every tool

### Projects Board
- Kanban board tracking projects across all 6 stages
- Add new singles, EPs, or albums on the fly
- Per-project track listing with BPM, key, and status
- One-tap "Advance to Next Stage" from the detail panel

---

## Recommended Tools

| Stage | Tool | Free? |
|---|---|---|
| Compose | Noteflight, Hookpad, Soundtrap | Free / Paid |
| Record | BandLab, Audacity, Clyp | Free |
| Mix | BandLab Mixer, Splice, iZotope Ozone | Free / Paid |
| Master | LANDR, CloudBounce, Auphonic | Free / Paid |
| Distribute | DistroKid, TuneCore, SoundCloud, Bandcamp | Free / Paid |
| Collaborate | Splice, Google Drive, Notion | Free / Paid |
| Promote | SubmitHub, Groover, Canva, Linktree | Free / Paid |

---

## Tech Stack

- **React 18** with TypeScript
- **React Router v6** for client-side navigation
- Responsive CSS with mobile-first media queries
- No UI framework — all custom farm-themed styles
- Deployed via **Netlify** (`netlify.toml` included)

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm 8+

### Run locally

```bash
git clone https://github.com/marcus7288/the-farm-music-studio
cd the-farm-music-studio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

The `build/` folder is ready to serve as a static site.

---

## Deployment (Netlify)

This repo includes a `netlify.toml` with build settings pre-configured.

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **Add new site → Import an existing project**
3. Connect GitHub and select `marcus7288/the-farm-music-studio`
4. Netlify auto-detects the config — click **Deploy site**

The `[[redirects]]` rule ensures React Router works correctly on direct URL visits.

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx        # Sticky nav with mobile hamburger menu
│   ├── ToolCard.tsx      # Tool display card with launch link
│   └── ProjectCard.tsx   # Project summary card for kanban
├── data/
│   ├── tools.ts          # 24 curated tools with metadata
│   └── projects.ts       # Demo projects and status config
├── pages/
│   ├── Dashboard.tsx     # Studio home with quick launch
│   ├── WorkflowPage.tsx  # 6-stage guided workflow
│   ├── ToolsPage.tsx     # Filterable tool library
│   └── ProjectsPage.tsx  # Kanban project tracker
├── responsive.css        # Mobile/tablet media queries
└── index.css             # Global base styles
```

---

## Tips for Bryan

- **Claim Spotify for Artists** before your first release — verification takes a few days
- **Submit to Spotify editorial playlists** at least 7 days before release date via Spotify for Artists
- **Export mixes as 24-bit WAV with no limiting** before uploading to LANDR
- **DistroKid** is best for frequent releases (flat annual fee); **TuneCore** suits 1–2 releases/year
- **Create a project for every idea**, even rough voice memos — use the "Idea" column as a parking lot
- **Advance project status in real time**, not after the fact, to keep the board accurate

---

## License

MIT
