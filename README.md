# Anabelle Handdoek · Senior Software Architect

Personal portfolio and résumé website built with Next.js, React, and TypeScript. Designed with a cyberpunk aesthetic featuring neon accents, dark theme, and responsive layout.

## Features

- **Cyberpunk Design**: Dark theme with neon cyan and magenta accents
- **Fully Responsive**: Mobile-first design that scales to all screen sizes
- **Accessibility**: WCAG compliant with skip links, focus states, and semantic HTML
- **Performance Optimized**: Next.js static generation with image optimization
- **Type-Safe**: Full TypeScript implementation

## Technology

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework (not currently used, but configured)
- [Vercel](https://vercel.com/) - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run types` - Run TypeScript type checking

## Project Structure

```
/
├── public/           # Static assets (images, favicon)
├── src/
│   ├── pages/        # Next.js pages
│   │   ├── index.tsx # Main portfolio page
│   │   ├── _app.tsx  # App component
│   │   └── _document.tsx # HTML document structure
│   └── styles/       # Global styles
│       └── globals.css
├── package.json
├── tsconfig.json
└── next.config.js
```

## Customization

### Content

All content is located in `src/pages/index.tsx`. Modify the data arrays to update:

- `achievements` - Key statistics and highlights
- `skills` - Technical expertise areas
- `projects` - Personal projects with images and tags
- `featured` - Featured work and professional projects
- `experience` - Work history
- `education` - Certifications and courses
- `awards` - Recognition and awards
- `links` - Social and professional links

### Styling

Global styles are in `src/styles/globals.css`. Key CSS variables:

- `--bg` - Background color
- `--neon` - Primary accent color (cyan)
- `--magenta` - Secondary accent color
- `--sunset` - Tertiary accent color
- `--text` - Text color
- `--muted` - Secondary text color

## Deployment

This project is configured for deployment on Vercel. Simply connect your Git repository to Vercel and it will automatically deploy on push.

## License

MIT License - Feel free to use this as a template for your own portfolio.
