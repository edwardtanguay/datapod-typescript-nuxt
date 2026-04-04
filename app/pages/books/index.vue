<script setup lang="ts">
import books from '~~/data-parsed/books.json';

const pending = ref(false);
const error = ref(null);

const search = ref('');

const filteredBooks = computed(() => {
  if (!books) return [] as any[];
  
  // Create a sorted copy of the books (most recent first)
  const sorted = [...(books as any[])].sort((a, b) => 
    b.dpodWhenCreated.localeCompare(a.dpodWhenCreated)
  );

  if (!search.value) return sorted;
  
  const query = search.value.toLowerCase();
  return sorted.filter((book: any) => 
    book.title.toLowerCase().includes(query) || 
    (book.author && book.author.toLowerCase().includes(query)) ||
    (book.description && book.description.toLowerCase().includes(query))
  );
});

useHead({
  title: 'Books - Info Site',
  meta: [
    { name: 'description', content: 'Browse our collection of books.' }
  ]
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Books</h1>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">Discover and explore our catalog.</p>
      </div>
      
      <div class="w-full md:w-72">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search books..."
          size="lg"
          variant="outline"
          class="w-full"
        />
      </div>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-primary-500" />
    </div>

    <div v-else>
      <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="book in filteredBooks" 
          :key="book.dpodId" 
          :to="`/books/${book.dpodId}`"
          class="group"
        >
          <UCard class="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 overflow-hidden relative">
            
            <template #header>
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ book.title }}
                </h3>
                <UBadge v-if="book.year" color="primary" variant="subtle" size="sm">
                  {{ book.year }}
                </UBadge>
              </div>
            </template>
            
            <p v-if="book.author" class="text-gray-600 dark:text-gray-400 font-medium mb-3">
              by {{ book.author }}
            </p>
            
            <p class="text-gray-500 dark:text-gray-500 text-sm line-clamp-3 italic">
              {{ book.description || 'No description available for this book.' }}
            </p>
            
            <template #footer>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>Added: {{ book.dpodWhenCreated}}</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </template>
          </UCard>
        </NuxtLink>
      </div>
      
      <div v-else class="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
        <UIcon name="i-heroicons-folder-open" class="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">No books found</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search query.</p>
        <UButton 
          v-if="search" 
          label="Clear search" 
          variant="ghost" 
          color="neutral"
          class="mt-4"
          @click="search = ''"
        />
      </div>
    </div>
  </div>
</template>
