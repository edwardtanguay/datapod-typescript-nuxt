# Datapod for TypeScript and Nuxt

This is a Datapod that uses TypeScript as the backend CLI language for data parsing and Nuxt 4 as the frontend.

<img width="925" height="463" alt="grafik" src="https://github.com/user-attachments/assets/2b3bcbb0-d132-4712-96aa-86f4e44ae122" />

## 🚀 Live Demo

[View Live Site](https://datapod-typescript-nuxt.vercel.app)

## ✨ Key Features

-   **Modern Stack**: Built with Nuxt 4, Vue 3, and TypeScript.
-   **UI & Styling**: Styled with Tailwind CSS and Nuxt UI for a clean, modern look.
-   **Dark/Light Mode**: Fully supported color modes using `@nuxtjs/color-mode`.
-   **Responsive Navigation**: Optimized for both desktop and mobile devices.
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

- `npm i`
- `npm run dev`

## 🎨 Configuration

You can customize the layout colors and other UI settings in `app/app.config.ts`.

```typescript
export default defineAppConfig({
	ui: {
		colors: {
			primary: 'green',
			neutral: 'gray',
			secondary: 'orange',
			success: 'emerald',
			info: 'blue',
			warning: 'yellow',
			error: 'red'
		}
	}
})
```

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). Simply push your code to a GitHub repository and import it into Vercel. All defaults should work out of the box.

## 🔗 Explore More

Check out more of Edward's projects:
[https://edwards-projects.vercel.app](https://edwards-projects.vercel.app)
