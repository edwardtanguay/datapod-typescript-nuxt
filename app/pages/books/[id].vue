<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

import allBooks from '~~/data-parsed/books.json';

const pending = ref(false);
const error = ref(null);

const book = computed(() => {
  if (!allBooks) return null;
  return (allBooks as any[]).find((b: any) => b.dpodId === id);
});

const otherBooks = computed(() => {
  if (!allBooks) return [];
  return (allBooks as any[]).filter((b: any) => b.dpodId !== id);
});

useHead({
  title: book.value ? `${book.value.title} - Info Site` : 'Book Details - Info Site',
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Back Link -->
    <div class="flex items-center gap-2">
      <NuxtLink 
        to="/books" 
        class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 transition-transform duration-200 hover:-translate-x-1" />
        Back to all books
      </NuxtLink>
    </div>

    <!-- Error/Loading States -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-32 space-y-4">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-primary-500 animate-spin" />
      <p class="text-gray-500 dark:text-gray-400 font-medium">Loading book details...</p>
    </div>

    <div v-else-if="!book" class="text-center py-32 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-700">
      <UIcon name="i-heroicons-book-open" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">The book you're looking for doesn't exist or has been removed.</p>
      <UButton to="/books" color="primary" size="lg">Return to Library</UButton>
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-16 animate-in fade-in duration-700">
      <div class="relative py-12 px-6 sm:px-12 bg-gray-50/50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden group">
        <div class="relative z-10 flex flex-col md:flex-row gap-12 items-start">
          <!-- Book Detail Icon Placeholder -->
          <div class="w-full md:w-1/3 flex justify-center">
            <div class="w-48 h-64 bg-linear-to-br from-primary-600 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center p-8 group transition-all duration-500 hover:scale-105 hover:-rotate-1">
              <UIcon name="i-heroicons-book-open" class="w-full h-full text-white/90 drop-shadow-lg" />
            </div>
          </div>

          <div class="flex-1 space-y-6">
            <div class="flex flex-col gap-2">
              <UBadge v-if="book.year" color="primary" variant="subtle" size="lg" class="w-fit">{{ book.year }}</UBadge>
              <h1 class="text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight drop-shadow-sm">
                {{ book.title }}
              </h1>
              <p v-if="book.author" class="text-2xl font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                <span class="text-gray-400 font-normal italic">by</span> {{ book.author }}
              </p>
            </div>

            <UDivider class="my-8" />

            <div v-if="book.description" class="space-y-4">
              <h3 class="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-xs opacity-50">Overview</h3>
              <p class="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-serif italic border-l-4 border-primary-500/30 pl-6 py-2">
                {{ book.description }}
              </p>
            </div>
            
            <div v-else class="text-gray-400 italic">No detailed description provided for this work.</div>

            <div class="pt-8 flex flex-wrap gap-4 font-mono text-gray-400 uppercase tracking-widest text-xs">
              <div class="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                Created: {{ book.dpodWhenCreated }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Books Suggestion -->
      <div v-if="otherBooks.length > 0" class="space-y-8 pb-12">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            <UIcon name="i-heroicons-rectangle-stack" class="w-7 h-7 text-primary-500" />
            More From Our Collection
          </h2>
          <NuxtLink to="/books" class="text-sm font-bold text-primary-600 hover:underline">View All</NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="b in otherBooks.slice(0, 4)" 
            :key="b.dpodId" 
            :to="`/books/${b.dpodId}`"
            class="group p-5 bg-gray-50/50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <h4 class="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ b.title }}
            </h4>
            <p v-if="b.author" class="text-xs text-gray-500 mt-1 line-clamp-1 italic">
              {{ b.author }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
