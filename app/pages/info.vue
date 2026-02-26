<script setup lang="ts">
useHead({
  title: 'Information - Professional Nuxt Site',
  meta: [
    { name: 'description', content: 'Detailed information and upcoming updates for this project.' }
  ]
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-12 px-4">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Info Page</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">This page will be created soon.</p>
    </div>

    <UCard class="bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800">
      <template #header>
        <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          <UIcon name="i-heroicons-information-circle"
                 class="w-5 h-5" />
          <span>General Information</span>
        </div>
      </template>

      <div class="py-8 text-center">
        <div
             class="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
          <UIcon name="i-heroicons-information-circle"
                 class="w-8 h-8" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Information will appear here soon</h2>
        <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">This site is being created at the moment. You will find information here soon.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div class="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-newspaper"
                   class="text-primary-500 w-5 h-5" />
            <span class="font-medium text-gray-900 dark:text-gray-100">Information</span>
          </div>
          <p class="text-xs text-gray-500 uppercase tracking-wider italic">In progress</p>
        </div>

        <div class="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-lifebuoy"
                   class="text-primary-500 w-5 h-5" />
            <span class="font-medium text-gray-900 dark:text-gray-100">More information</span>
          </div>
          <p class="text-xs text-gray-500 uppercase tracking-wider italic">Coming soon</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
