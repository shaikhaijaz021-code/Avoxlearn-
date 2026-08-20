# Avoxlearn.ai

Turn YouTube lectures into study material. Free, mobile-first study platform frontend
(React + Vite + Tailwind), installable as a home-screen app (PWA).

## Get a live link in ~2 minutes (no coding needed)

**Option A — Netlify Drop (fastest, no account needed to preview)**
1. Go to https://app.netlify.com/drop
2. First run the build locally or via Netlify's own build — easiest is Option B below,
   since Netlify Drop needs an already-built `dist` folder.

**Option B — Vercel (recommended)**
1. Go to https://vercel.com and sign up (free, GitHub/email login).
2. Click **Add New → Project**.
3. Upload this folder, or push it to a GitHub repo first and import that repo.
4. Vercel auto-detects Vite. Leave defaults (Build command: `vite build`,
   Output directory: `dist`) and click **Deploy**.
5. In ~1 minute you'll get a live link like `https://avoxlearn.vercel.app`.

**Option C — Netlify (via GitHub)**
1. Push this folder to a new GitHub repo.
2. Go to https://app.netlify.com → **Add new site → Import an existing project**.
3. Pick the repo. Build command: `npm run build`, Publish directory: `dist`.
4. Deploy — you'll get a link like `https://avoxlearn.netlify.app`.

## Run it locally first (optional, if you want to test before deploying)

```bash
npm install
npm run dev
```

Then open the local address it prints (usually `http://localhost:5173`).

## Install it on your phone (after it's deployed)

Once you have a live link:
- **iPhone (Safari):** open the link → tap Share → **Add to Home Screen**.
- **Android (Chrome):** open the link → tap the ⋮ menu → **Add to Home screen** /
  **Install app**.

It will then open full-screen from your home screen like a native app — that's what
the PWA setup in this project (`vite-plugin-pwa`, `manifest`, icons) enables.

## Project structure

```
avoxlearn/
├── index.html
├── package.json
├── vite.config.js          ← includes the PWA plugin config
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── src/
    ├── main.jsx
    ├── index.css
    └── App.jsx              ← the whole app (home, PDF flow, audio flow, about)
```

## Next steps for a real product

This is a frontend only — buttons like "Download PDF" and "Download Audio" are
previews. To make it functional you'll need a backend that can:
- Accept a YouTube URL and fetch/transcribe the lecture audio
- Run it through an LLM to generate the structured notes (definitions, formulas,
  derivations, quick revision, etc.)
- Render notes to a PDF and store it
- Generate a TTS (text-to-speech) audio version and store it
- Serve both back to the frontend for the Notes / PDF / Audio tabs

Founder: Aijaz Shaikh
