# UPNAAD — Public Image Assets Guide

## Files to Replace with Your Real Assets

| File | Size | Purpose | Priority |
|---|---|---|---|
| `opengraph-image.png` | 1200×630 | Social sharing preview (Twitter, LinkedIn, Facebook) | 🔴 High |
| `favicon.png` | 32×32 | Browser tab icon | 🔴 High |
| `icon-192.png` | 192×192 | Android home screen / Chrome PWA | 🔴 High |
| `icon-512.png` | 512×512 | Android splash screen / PWA | 🔴 High |
| `icon-512-maskable.png` | 512×512 | Android adaptive icon (add 20% safe zone padding) | 🟡 Medium |
| `apple-icon.png` | 180×180 | iOS home screen icon | 🔴 High |
| `logo.png` | Any | Site logo shown in sidebar/navbar | 🔴 High |

## Notes

- **Maskable icon**: must have solid background (not transparent) and your logo should be within the center 80% of the image. Android adaptive icons clip to circles/squircles.
- **opengraph-image.png**: Use Figma, Canva, or your design tool to export exactly 1200×630px.
- **All icon files are currently placeholders** — they use a generated UPNAAD icon you can use until your real logo is ready.

## Apple iOS Specifics
- Add splash screen images in `/public/` for standalone PWA mode if needed
- iOS standalone web app works with the 180×180 `apple-icon.png`

## Android / Chrome Specifics
- `192×192` is the minimum for Chrome to show the install banner
- `512×512` is used for the splash screen
- Maskable icons avoid white borders on Android adaptive icon shapes
