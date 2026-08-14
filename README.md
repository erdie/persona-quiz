# Persona Quiz

An interactive quiz designed to categorize participants into different personas or personality types based on their responses to a series of questions. This quiz is intended for marketing purposes. There is no scientific knowledge inside it, just for fun.

## Tech Stack

This project is built using modern web technologies:
- **[Nuxt 4](https://nuxt.com/)**: The core framework for server-side rendering, routing, and Vue integration.
- **[Vue 3](https://vuejs.org/)**: The underlying progressive JavaScript framework.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development, directly integrated via Vite.
- **[pnpm](https://pnpm.io/)**: Fast, disk space efficient package manager.

## Folder Structure

Here is an overview of the key directories in the project:

- `assets/`: Contains uncompiled assets such as stylesheets (like the global Tailwind CSS file), images, or fonts.
- `components/`: Vue components that are automatically imported across the application.
- `composables/`: Reusable Vue Composition API functions that Nuxt auto-imports.
- `data/`: Local data files, such as JSON representing quiz questions or persona definitions.
- `pages/`: Vue files that automatically correspond to the application's routes.
- `public/`: Static files served directly at the root level (e.g., `favicon.ico`).
- `server/`: Server-side API routes and middleware.
- `test/`: Contains the test suites for the application.
- `types/`: TypeScript type declarations used throughout the project.

## How to Run

Make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

### 1. Install Dependencies

```bash
# Install all required packages using pnpm
pnpm install
```

### 2. Development Server

Start the development server with hot-module replacement on `http://localhost:3000`:

```bash
pnpm run dev
```

### 3. Production Build

Build the application for production deployment:

```bash
pnpm run build
```

To locally preview the production build, run:

```bash
pnpm run preview
```

## Documentation

- [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
