# Goal Crusher - Deployment Guide

## Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)

## Local Development
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Building for GitHub Pages

1. First, create a new repository on GitHub
2. In your repository settings, enable GitHub Pages
3. Set the source branch to `main` and the folder to `/docs`

## Build Steps
1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. The built files will be in the `dist` folder. Copy these files to a folder named `docs` in your repository.

4. Push the code to GitHub:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push
```

5. Your site will be available at: `https://[your-username].github.io/[repository-name]`

## Important Notes
- The app uses local storage to save goals, so data is stored in the browser
- Each user's goals are saved independently
- The app works entirely in the browser without needing a backend server

## Files Structure
```
├── client/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/           # Utilities and storage
│   │   └── pages/         # Page components
├── index.html             # Entry point
└── package.json          # Project configuration
```

## For Teachers/Reviewers
This is a standalone web application that demonstrates:
- Modern React development
- Local storage for data persistence
- Component-based architecture
- Responsive design
- TypeScript for type safety
