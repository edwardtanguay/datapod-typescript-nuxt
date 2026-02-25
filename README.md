# Nuxt 4 Showcase

A demonstration of modern web development capabilities using Nuxt 4, Vue 3, and Tailwind CSS. This project showcases a responsive, interactive application with server-side API integration and seamless deployment.

![Screenshot](https://github.com/user-attachments/assets/78a4266a-e00c-404b-be93-4c26a4802b06)

## 🚀 Live Demo

[View Live Site](https://showcase-nuxt-003.vercel.app/)

## ✨ Key Features

-   **Modern Stack**: Built with Nuxt 4, Vue 3, and TypeScript.
-   **UI & Styling**: Styled with Tailwind CSS and Nuxt UI for a clean, modern look.
-   **Dark/Light Mode**: Fully supported color modes using `@nuxtjs/color-mode`.
-   **Responsive Navigation**: Optimized for both desktop and mobile devices.
-   **Interactive Forms**: Demonstrates API integration with error handling.
-   **Server-Side Logic**: Includes server API routes for data handling.
-   **Easy Deployment**: Configured for one-click publishing to Vercel.

## 🛠️ Tech Stack

-   **Framework**: [Nuxt 4](https://nuxt.com)
-   **UI Library**: [Nuxt UI](https://ui.nuxt.com)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com)
-   **Language**: [TypeScript](https://www.typescriptlang.org)

## 📦 Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/edwardtanguay/showcase-nuxt-003.git

# Navigate to the project directory
cd showcase-nuxt-003

# Install dependencies
npm install
```

### env file

This is a dummy env file at the moment to demonstrate the zod validation.

```
NODE_ENV=development
LOG_LEVEL=warn
CACHE_DRIVER=redis
TURSO_DATABASE_URL=libsql://test.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOiJIUzI1NiI
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build

Build the application for production:

```bash
npm run build
```

## 🎨 Configuration

You can customize the layout colors and other UI settings in `app/app.config.ts`.

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'gray'
    }
  }
})
```

## 📂 Project Structure

-   `app/`: Core application files (pages, components, layouts).
-   `server/`: Server-side API routes and utilities.
-   `public/`: Static assets.
-   `nuxt.config.ts`: Nuxt configuration file.

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply push your code to a GitHub repository and import it into Vercel. All defaults should work out of the box.

## 🔗 Explore More

Check out more of Edward's projects:
[https://edwards-projects.vercel.app](https://edwards-projects.vercel.app)
