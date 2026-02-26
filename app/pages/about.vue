<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

useHead({
  title: 'Info Site - About',
  meta: [
    { name: 'description', content: 'Learn about this information site' }
  ]
})

const value = shallowRef(new CalendarDate(2026, 2, 6))
const message = ref('')

</script>
<template>
  <div class="max-w-3xl mx-auto py-12 px-4">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">About This Project</h1>
      <p class="mt-2 text-gray-600 dark:text-gray-400">Information and resources about this project.</p>
    </div>

    <UCard class="bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800">
      <template #header>
        <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          <UIcon name="i-heroicons-information-circle"
                 class="w-5 h-5" />
          <span>Project Links</span>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Repo Link -->
        <a href="/"
           class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 group transition-all duration-200">
          <div
               class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary-50 group-hover:text-primary-600 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400 transition-colors">
            <UIcon name="i-heroicons-code-bracket"
                   class="w-6 h-6" />
          </div>
          <div>
            <span class="block text-xs font-medium text-gray-500 uppercase tracking-widest">Repository</span>
            <span
                  class="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">coming soon...</span>
          </div>
          <UIcon name="i-heroicons-arrow-top-right-on-square"
                 class="hidden sm:block w-5 h-5 ml-auto text-gray-400 group-hover:text-primary-500 transition-colors" />
        </a>

        <!-- Live Link -->
        <a href="/"
           class="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 group transition-all duration-200">
          <div
               class="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary-50 group-hover:text-primary-600 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400 transition-colors">
            <UIcon name="i-heroicons-globe-alt"
                   class="w-6 h-6" />
          </div>
          <div>
            <span class="block text-xs font-medium text-gray-500 uppercase tracking-widest">Live Demo</span>
            <span
                  class="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">in progress...</span>
          </div>
          <UIcon name="i-heroicons-arrow-top-right-on-square"
                 class="hidden sm:block w-5 h-5 ml-auto text-gray-400 group-hover:text-primary-500 transition-colors" />
        </a>
      </div>
    </UCard>
  </div>
</template>
