# ivansortino.github.io

Home page of Kept, at https://ivansortino.github.io/kept/. Vite + React + Tailwind, built and deployed to GitHub Pages
by `.github/workflows/deploy.yml` on every push to `main`.

- `npm i`, then `npm run dev` to preview (at `/kept/`); `npm run build` writes the site to `dist/kept/` and copies `root/` to `dist/`.
- `root/index.html` sends the root (the OAuth consent home page, old links) on to `/kept/`.
- Keep `root/googleae333c1ca2e00843.html`: Search Console verification, at the root.
- Privacy policy lives in the `kept-policy` repo (`/kept-policy/`), linked from the app: do not move it.
- Clips: `tracker/brag-output/work/takes/*.mp4` (the launch video takes) as 432x960 H.264 in `public/clips/`, with a poster each; stills from `tracker/store/screenshots/raw/` in `public/assets/stills/`.
- `src/Phone.tsx` plays a clip only while it is on screen, and never with reduced motion.
