<script setup lang="ts">
import {
  RectangleStackIcon,
  ShoppingBagIcon,
  UsersIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline';

const features = [
  {
    name: 'Nuxt UI',
    path: '/nuxt-ui',
    description: 'Explore beautiful, accessible UI components built with Nuxt UI',
    icon: RectangleStackIcon,
    color: 'primary'
  },
  {
    name: 'Products',
    path: '/products',
    description: 'Form example using $fetch with comprehensive error handling',
    icon: ShoppingBagIcon,
    color: 'green'
  },
  {
    name: 'Employees',
    path: '/employees',
    description: 'Full CRUD implementation with $fetch and data tables',
    icon: UsersIcon,
    color: 'blue'
  },
  {
    name: 'Customers',
    path: '/customers',
    description: 'Example of a reactive form with useFetch()',
    icon: UsersIcon,
    color: 'blue'
  }
];
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<NuxtLink v-for="feature in features"
				  :key="feature.path"
				  :to="feature.path"
				  class="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700">
			<!-- Icon -->
			<div class="mb-4">
				<div class="inline-flex p-3 rounded-lg transition-colors duration-300"
					 :class="`bg-${feature.color}-50 dark:bg-${feature.color}-900/20 group-hover:bg-${feature.color}-100 dark:group-hover:bg-${feature.color}-900/40`">
					<component :is="feature.icon"
							   class="w-6 h-6 transition-colors duration-300"
							   :class="`text-${feature.color}-600 dark:text-${feature.color}-400`" />
				</div>
			</div>

			<!-- Content -->
			<h2
				class="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
				{{ feature.name }}
			</h2>
			<p class="text-gray-600 dark:text-gray-400 leading-relaxed">
				{{ feature.description }}
			</p>

			<!-- Arrow Icon -->
			<div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<svg class="w-5 h-5 text-primary-600 dark:text-primary-400"
					 fill="none"
					 stroke="currentColor"
					 viewBox="0 0 24 24">
					<path stroke-linecap="round"
						  stroke-linejoin="round"
						  stroke-width="2"
						  d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</div>
		</NuxtLink>
	</div>
</template>