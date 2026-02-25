<script setup lang="ts">

const config = useRuntimeConfig();
const env = config.public.nodeEnv;
const cacheDriver = config.public.cacheDriver;

useHead({
  title: 'Nuxt 4 Showcase',
  meta: [
    { name: 'description', content: 'A showcase of Nuxt 4 features and best practices' }
  ]
});
</script>

<template>
  <div class="max-w-5xl mx-auto py-12 px-4 flex flex-col gap-12">
    <!-- Hero Section -->
    <div class="text-center">
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        This site is a collection of examples demonstrating modern Nuxt 4 features, best practices, and UI patterns.
      </p>
    </div>

		<UCard class="font-mono bg-indigo-200/50 dark:bg-indigo-900/20 border-indigo-200/50 dark:border-indigo-900/50">
			<template #header>
				<p>Examples of accessing environment variables (see /app/lib/env.ts to see how you can validate your .env variables with Zod) </p>
			</template>
			<ul class="list-disc ml-5 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-3">
				<li>NODE_ENV = {{ env }}</li>
				<li>CACHE_DRIVER = {{ cacheDriver }}</li>
			</ul>
		</UCard>
  </div>
</template>
