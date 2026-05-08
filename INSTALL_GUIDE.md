# MyFinance PWA — Installation Guide

## What's in this folder

```
myfinance-pwa/
├── index.html        ← Your app (all the finance tracker code)
├── manifest.json     ← Makes it installable as an app
├── sw.js             ← Service worker (offline support)
├── icons/
│   ├── icon-192.png  ← App icon (Android / browser)
│   └── icon-512.png  ← App icon (splash screen)
└── INSTALL_GUIDE.md  ← This file
```

---

## Option A — Host FREE on GitHub Pages (Recommended)
*Your app gets a real URL like `https://yourname.github.io/myfinance` and works on any device*

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a new repository
1. Click the **+** button → "New repository"
2. Name it: `myfinance`
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. On your new repo page, click **"uploading an existing file"**
2. Drag ALL files from this folder into the upload area:
   - index.html
   - manifest.json
   - sw.js
   - icons/ (the whole folder)
3. Click **"Commit changes"**

### Step 4 — Enable GitHub Pages
1. Go to **Settings** tab in your repo
2. Scroll to **"Pages"** in the left menu
3. Under "Source" select: **Deploy from branch**
4. Branch: **main** / folder: **/ (root)**
5. Click **Save**
6. Wait 2 minutes → your app is live at:
   `https://YOUR-USERNAME.github.io/myfinance`

### Step 5 — Install on your phone
**Android (Chrome):**
1. Open your URL in Chrome
2. Tap the 3-dot menu → "Add to Home Screen"
3. OR wait for the install banner to appear at the bottom

**iPhone (Safari):**
1. Open your URL in Safari
2. Tap the Share button (box with arrow)
3. Scroll down → tap "Add to Home Screen"
4. Tap "Add"

---

## Option B — Run locally on your computer
*Useful for testing before hosting*

You need a simple local server (opening index.html directly won't work for PWA features).

### Using Python (easiest):
```bash
cd myfinance-pwa
python3 -m http.server 8080
```
Then open: http://localhost:8080

### Using Node.js:
```bash
npm install -g serve
serve myfinance-pwa
```

---

## Updating the app later

When you want to change something:
1. Edit `index.html`
2. In `sw.js`, change `myfinance-v1` to `myfinance-v2` (forces update)
3. Upload the changed files to GitHub
4. The app updates automatically next time users open it

---

## Your data

- All data is saved in your **browser's localStorage**
- It stays saved even when offline
- To back up: use the **Export CSV** button in the Dashboard
- To move data to a new device: export CSV, then manually re-enter or build an import feature

---

## Troubleshooting

**"Install" banner not showing on Android:**
- Make sure you're using Chrome
- The site must be on HTTPS (GitHub Pages gives you this automatically)
- You must have visited the site at least twice

**iPhone: No install banner**
- Apple doesn't show install banners — you must use Share → "Add to Home Screen" manually

**App not updating after changes:**
- Clear the app cache: Settings → Apps → Chrome → Clear Cache
- Or in Chrome: DevTools → Application → Service Workers → "Update on reload"
