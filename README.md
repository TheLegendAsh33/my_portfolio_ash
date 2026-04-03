<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# VULN_SCANNER DevSecOps Portfolio

Static Vite + React portfolio site, ready for Vercel deployment.

## Local Development

Prerequisites: Node.js 20+ and npm

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`
3. Build for production:
   `npm run build`
4. Preview the production build:
   `npm run preview`

## Deploy on Vercel

This project is configured as a static Vite deployment.

### Zero-config deploy

1. Import the repository into Vercel.
2. Keep the root directory as `.`.
3. Let Vercel detect the framework as `Vite`.
4. Deploy.

### Manual Vercel settings

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

### Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

## Notes

- Client-side navigation uses URL hashes like `#/reports`, so rewrite rules are not required.
- The current app does not require any runtime server or secret environment variables to deploy.
