<script setup lang="ts">

const config = useRuntimeConfig();
const env = config.public.nodeEnv;
const cacheDriver = config.public.cacheDriver;

useHead({
  title: 'Info Site',
  meta: [
    { name: 'description', content: 'A info site' }
  ]
});
</script>

<template>
  <div class="max-w-5xl mx-auto py-12 px-4 flex flex-col gap-12">
    <!-- Hero Section -->
    <div class="text-center">
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Welcome to this site.</p>
    </div>

    <UCard
           class="bg-primary-50/10 dark:bg-primary-900/10 border-primary-200/50 dark:border-primary-800/50 shadow-xl overflow-hidden relative group">
      <!-- Decorative background element -->
      <div
           class="absolute -right-12 -top-12 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl transition-all group-hover:bg-primary-500/20" />

      <div class="py-12 flex flex-col items-center text-center relative z-10">
        <div
             class="mb-6 inline-flex items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 text-primary-600 dark:text-primary-400 transform transition-transform group-hover:scale-110 ease-out duration-300">
          <UIcon name="i-heroicons-sparkles"
                 class="w-10 h-10" />
        </div>

        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          This site is coming <span
                class="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-indigo-500">soon...</span>
        </h2>

        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
          Stay tuned for more information.
        </p>

        <div class="mt-8 flex gap-3">
          <div
               class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            Development In Progress
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
