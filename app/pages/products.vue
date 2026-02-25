<script setup lang="ts">
// 1. Fix: Use '~~' to point to the root 'shared' directory
import type { TestProduct } from "~~/shared/types";

const num = ref<number | null>(null);
const testProduct = ref<TestProduct | null>(null);
const errorMsg = ref<string | null>(null);
const errorCode = ref<number | null>(null);
const isSubmitting = ref(false);

const submitForm = async () => {
  if (num.value === null) return;

  testProduct.value = null;
  errorMsg.value = null;
  errorCode.value = null;
  isSubmitting.value = true;

  try {
    const res = await $fetch<TestProduct>("/api/products", {
      method: "POST",
      body: { num: num.value },
    });
    testProduct.value = res;
  }
  catch (err: any) {
    errorMsg.value = err.data?.message || err.statusMessage || err.message || "Something unexpected happened.";
    errorCode.value = err.statusCode;
  }
  finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="max-w-4xl mx-auto py-12 px-4 flex flex-col-reverse sm:flex-row gap-6">
    <UCard class="max-w-md mx-auto shadow-sm w-full sm:max-w-100">
      <template #header>
        <div class="flex items-center align-middle gap-2">
          <UIcon name="i-heroicons-magnifying-glass-circle"
                 class="w-6 h-6 text-primary mt-1" />
          <span class="text-2xl font-bold">Product Finder</span>
        </div>
      </template>

      <form @submit.prevent="submitForm"
            class="space-y-4">
        <UFormGroup label="Product ID"
                    name="id"
                    help="Enter a number between 1 and 5 (IDs 4 and 5 don't exist)"
                    required>
          <UInput v-model="num"
                  type="number"
                  icon="i-heroicons-hashtag"
                  size="lg"
                  :disabled="isSubmitting"
                  min="1"
                  max="5"
                  class="mb-3" />
        </UFormGroup>

        <UButton type="submit"
                 block
                 size="lg"
                 icon="i-heroicons-paper-airplane"
                 :loading="isSubmitting"
                 color="primary"
                 variant="solid">
          {{ isSubmitting ? 'Searching...' : 'Find Product' }}
        </UButton>
      </form>

      <template #footer
                v-if="testProduct || errorMsg">
        <!-- Server Error -->
        <UAlert v-if="errorMsg && errorCode && errorCode === 500"
                icon="i-heroicons-exclamation-triangle"
                color="error"
                variant="soft"
                title="Server Error"
                :description="errorMsg" />
        <!-- Other Errors -->
        <UAlert v-if="errorMsg && errorCode && errorCode !== 500"
                icon="i-heroicons-exclamation-triangle"
                color="warning"
                variant="soft"
                title="Search Failed"
                :description="errorMsg" />

        <!-- Success State -->
        <div v-if="testProduct"
             class="transition-all duration-300">
          <div
               class="flex flex-col gap-2 p-4 rounded-lg bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">Result
                Found</span>
              <UBadge color="primary"
                      variant="subtle"
                      size="sm">ID: {{ testProduct.id }}</UBadge>
            </div>
            <p class="text-lg font-semibold">{{ testProduct.name }}</p>
          </div>
        </div>
      </template>
    </UCard>
    <UCard class="font-mono bg-indigo-200/50 dark:bg-indigo-900/20 border-indigo-200/50 dark:border-indigo-900/50">
      <template #header>
        <p>Example of form error handling</p>
      </template>
      <ul class="list-disc ml-5 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-3 mt-3">
        <li>
          search for product IDs 1-5
        </li>
        <li>
          1, 2, 3 exist, 4, 5 do not exist
        </li>
        <li>50% of the time a server error will occur</li>
        <li>the server error has a different appearance than when the product is not Found</li>
      </ul>
    </UCard>
  </section>
</template>
