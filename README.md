# SULAB Platform-Linked Skeleton

This repo keeps only platform linkage files (GitHub Actions, Vercel, VSCode). All app code has been removed.

- GitHub Actions: .github/workflows/*
- Vercel config: vercel.json
- VSCode config: .vscode/*
- Git: .gitignore

Next steps:
1) Add or import your app code (e.g., Vite/Next).
2) Ensure vite.config.ts outDir matches vercel.json outputDirectory (currently build).
3) Push to main to trigger Vercel deployment.

