# Ardiansyah's Portfolio

A modern, full-stack developer portfolio built with React, Vite, and Tailwind CSS. 

## Features
- Fully responsive modern design
- i18n support (English & Indonesian)
- Dynamic timeline and project filtering
- Built-in type safety with TypeScript

## Project Structure

```text
webPorto/
├── public/                 # Static assets (images, icons) - URLs are mapped to /
├── src/
│   ├── components/         # React components organized by scope
│   │   ├── layout/         # Header, Footer, etc.
│   │   ├── sections/       # Main page sections (Hero, Projects, Skills)
│   │   └── ui/             # Reusable UI elements
│   ├── context/            # React Context providers (e.g., LanguageContext)
│   ├── data/               # Static data, translations, and contents
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global CSS and Tailwind configurations
│   ├── types/              # TypeScript interfaces and type definitions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
└── legacy/                 # Archival versions of the previous portfolio
```

## Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Linting & Type Checking
- Run `npm run lint` for fast linting with oxlint.
- The project is configured with `@/` path alias for cleaner imports.
