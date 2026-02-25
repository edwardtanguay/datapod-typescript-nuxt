<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import type { AccordionItem } from '@nuxt/ui'

// calendar
const theDate = shallowRef(new CalendarDate(2026, 2, 1))

// accordian
const items = ref<AccordionItem[]>([
  {
    label: 'Is Nuxt UI free to use?',
    content: 'Yes! Nuxt UI is completely free and open source under the MIT license. All 125+ components are available to everyone.',
  },
  {
    label: 'Can I use Nuxt UI with Vue without Nuxt?',
    content: 'Yes! While optimized for Nuxt, Nuxt UI works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.'
  },
  {
    label: 'Is Nuxt UI production-ready?',
    content: 'Yes! Nuxt UI is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.'
  }
])

</script>
<template>
  <div class="flex gap-8 flex-wrap flex-col">
    <section>
      <h2>Buttons</h2>
      <div class="flex gap-4 flex-wrap">
        <UButton>Click me</UButton>
        <UButton color="neutral">Button</UButton>
        <UButton color="neutral"
                 variant="outline">Button</UButton>
        <UButton icon="i-lucide-rocket"
                 size="md"
                 color="primary"
                 variant="solid">Button</UButton>
        <UButton trailing-icon="i-lucide-arrow-right"
                 size="md">Button</UButton>
        <UButton color="secondary"
                 loading
                 loading-icon="i-lucide-loader">Loading...</UButton>
        <UButton class="rounded-full">Button</UButton>
      </div>
    </section>

    <section>
      <h2>Calendar</h2>
      <UCard class="w-full sm:w-96">
        <UCalendar v-model="theDate" />
      </UCard>
    </section>

    <section>
      <h2>Accordian</h2>
      <UCard class="w-full sm:w-96">
        <UAccordion :items="items">
          <template #content="{ item }">
            <p class="pb-3.5 text-sm text-muted">
              {{ item.content }}
            </p>
          </template>
        </UAccordion>
      </UCard>
    </section>
  </div>
</template>
