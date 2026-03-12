# GEMINI.md - Recipe OS Context

This file provides context and instructions for AI agents working on the **Recipe OS** project.

## Project Overview
**Recipe OS** is a specialized recipe website built with Astro, featuring a unique "Retro-OS / Terminal / Cyberpunk" aesthetic. It emphasizes a sharp, grid-based UI with monochromatic elements, scanlines, and glow effects.

- **URL:** https://recipes.pantoine.com
- **Type:** Static Site Generated (SSG) with Astro.
- **Styling:** Custom Tailwind CSS 4 implementation with a heavy focus on CSS variables and utility classes for the "OS" look.
- **Content:** Recipes are managed via MDX in Astro Content Collections.

## Core Tech Stack
- **Framework:** Astro 5 (latest)
- **UI Library:** React 19 (used for interactive elements like timers and ingredient scaling)
- **Styling:** Tailwind CSS 4 (Integrated via Vite plugin in `astro.config.mjs`)
- **Content:** MDX (`@astrojs/mdx`)
- **Type Safety:** TypeScript

## Directory Structure
- `src/content/recipes/`: MDX files for each recipe.
- `src/content/config.ts`: Zod schema for recipe frontmatter.
- `src/components/`: Astro and React components (e.g., `Timer.jsx`, `RecipeStep.astro`).
- `src/layouts/`: Base layouts for pages and recipe details.
- `src/styles/global.css`: The heart of the "Retro-OS" design system. Contains theme variables, scanline animations, and "OS" component classes.
- `src/assets/`: Optimized images for recipes and steps.

## Building and Running
- `npm run dev`: Starts the development server at `http://localhost:4321`.
- `npm run build`: Generates the static site in the `dist/` folder.
- `npm run preview`: Previews the production build locally.
- `npm run astro check`: Runs diagnostics for Astro and TypeScript.

## Development Conventions

### 1. Adding a Recipe
Create a new `.mdx` file in `src/content/recipes/`. 
**Mandatory Frontmatter Fields:**
- `title`, `description`, `tags` (array), `baseServings` (number), `difficulty` (object: `prep`, `technique`, `cleanup` [1-10]), `ingredients` (array of objects: `name`, `quantity`, `unit`, `category`).
- `cover`: Path to an image in `src/assets/recipes/`.

### 2. Styling (Retro-OS System)
Always adhere to the established design system in `src/styles/global.css`:
- **Typography:** Use `font-dot` (DotGothic16) for headings and `font-mono` (Source Code Pro) for content.
- **Borders:** Use `surface-card` for container borders. Avoid rounded corners (`border-radius: 0`).
- **Effects:** Use `glow-accent` (cyan) or `glow-alert` (red) for emphasis.
- **Icons/Brackets:** Use the "bracket" pattern for hover states on cards.

### 3. Components
- Use `RecipeStep.astro` for structured cooking steps with images.
- Use `Timer.jsx` (with `client:load`) for interactive countdowns.
- Interactive elements should feel like "system commands" or "data logs".

## Project Constants
- **Accent Color:** `#00D1FF` (Cyan)
- **Alert Color:** `#FF4B2B` (Red)
- **Grid Size:** 40px background grid.
