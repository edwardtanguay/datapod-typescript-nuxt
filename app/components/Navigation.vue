<script setup lang="ts">
import { ref } from 'vue'
import { HomeIcon, Bars3Icon, XMarkIcon, SunIcon, MoonIcon, InformationCircleIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const navItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Info', path: '/info', icon: QuestionMarkCircleIcon },
  { name: 'About', path: '/about', icon: InformationCircleIcon },
]
</script>

<template>
  <nav
       class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
    <div class="container-custom">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/"
                  class="text-xl font-bold text-primary-700 hover:text-primary-800 transition-colors dark:text-primary-500 dark:hover:text-primary-400">
          Nuxt Showcase 003
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink v-for="item in navItems"
                    :key="item.path"
                    :to="item.path"
                    class="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors font-medium dark:text-gray-300 dark:hover:text-primary-400"
                    active-class="text-primary-600 dark:text-primary-400">
            <component :is="item.icon"
                       class="h-5 w-5" />
            <span>{{ item.name }}</span>
          </NuxtLink>

          <!-- Desktop Color Mode Toggle -->
          <button @click="toggleColorMode"
                  class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode">
            <SunIcon v-if="colorMode.value === 'dark'"
                     class="h-5 w-5" />
            <MoonIcon v-else
                      class="h-5 w-5" />
          </button>
        </div>

        <div class="flex items-center space-x-2 md:hidden">
          <!-- Mobile Color Mode Toggle -->
          <button @click="toggleColorMode"
                  class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                  aria-label="Toggle dark mode">
            <SunIcon v-if="colorMode.value === 'dark'"
                     class="h-5 w-5" />
            <MoonIcon v-else
                      class="h-5 w-5" />
          </button>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
                  class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
                  aria-label="Toggle menu">
            <Bars3Icon v-if="!mobileMenuOpen"
                       class="h-6 w-6" />
            <XMarkIcon v-else
                       class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2">
      <div v-if="mobileMenuOpen"
           class="md:hidden absolute left-0 right-0 border-t border-gray-200 bg-white shadow-lg z-50 dark:bg-gray-900 dark:border-gray-800">
        <div class="container-custom py-4 space-y-2">
          <NuxtLink v-for="item in navItems"
                    :key="item.path"
                    :to="item.path"
                    @click="mobileMenuOpen = false"
                    class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors font-medium dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
                    active-class="bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
            <component :is="item.icon"
                       class="h-5 w-5" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>
