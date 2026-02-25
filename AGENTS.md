# Agent Instructions for Nuxt 4 Showcase

This document provides instructions and guidelines for AI agents working on this project.

## Project Overview

*   **Framework**: Nuxt 4 (Vue 3, TypeScript).
*   **UI Library**: Nuxt UI (`@nuxt/ui`).
*   **Styling**: Tailwind CSS.
*   **State Management**: Nuxt built-in state management (useState, etc.).
*   **API**: Server routes in `server/api` using `h3`.
*   **Validation**: `zod`.

## Directory Structure

*   `app/`: Main application source code.
    *   `components/`: Vue components.
    *   `pages/`: Application pages (file-based routing).
    *   `layouts/`: Layout components.
    *   `lib/`: Utility functions.
    *   `app.config.ts`: Nuxt UI configuration (colors, etc.).
    *   `app.vue`: Main app entry point.
*   `server/`: Server-side code.
    *   `api/`: API routes (mapped to `/api/*`).
*   `shared/`: Shared code between client and server (e.g., types).
*   `public/`: Static assets.

## Coding Conventions

### Frontend (Vue/Nuxt)

*   **Script Setup**: Use `<script setup lang="ts">` for all components.
*   **Styling**: Use Tailwind CSS utility classes directly in the template. Avoid `<style>` blocks unless necessary for complex custom styles.
*   **UI Components**: Prioritize using `Nuxt UI` components (e.g., `<UButton>`, `<UInput>`) over raw HTML elements.
*   **Icons**: Use icons from `@heroicons/vue` (as seen in `app/components/FeaturesGrid.vue`).
*   **Data Fetching**: Use `useFetch` or `$fetch` for API calls.

### Backend (Server API)

*   **Handler Definition**: Use `defineEventHandler` from `h3`.
*   **Error Handling**: Use `createError` to return structured errors (`statusCode`, `statusMessage`, `data`).
*   **Typing**: Import shared types from `../../shared/types` to ensure type safety.
*   **Validation**: Use explicit validation for request bodies (e.g., `zod` if needed, or manual checks).

### Shared

*   **Types**: Define interfaces used by both frontend and backend in `shared/types.ts`.

## Configuration

*   **UI Colors**: `app/app.config.ts` defines the color palette (primary, neutral, etc.).
*   **Nuxt Config**: `nuxt.config.ts` handles modules and build settings.

## Development

*   **Package Manager**: `npm`
*   **Run Dev Server**: `npm run dev`
*   **Build**: `npm run build`

## Simulation & Data

*   **Latency**: Some API routes (e.g., `server/api/products.post.ts`, `server/api/employees/index.get.ts`) simulate network latency using `setTimeout`. Maintain this pattern for demonstration purposes if requested.
*   **Random Errors**: Some API routes simulate random failures (e.g., 500 errors).
*   **In-Memory Data**: Employee data is stored in-memory in `server/api/employees/data.ts`. Changes will not persist across server restarts.
