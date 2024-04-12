<template>
  <Card title="Settings" class="w-full border shadow-md">
    <template #body>
      <div class="space-y-4">
        <!-- Transaction Categories -->
        <div class="p-4 space-y-2 border rounded-md">
          <span class="text-lg font-semibold">Transaction Categories</span>

          <!-- Categories menu -->
          <div class="p-0 menu">
            <!-- Category Row Generator -->
            <li v-for="(category, index) in appSettings['categories']" :key="index">
              <a class="flex justify-between">
                <!-- Category text -->
                <div class="text-lg font-semibold">{{ category }}</div>

                <!-- Remove Category button -->
                <button
                  @click="handleRemoveCategory(index)"
                  class="bg-red-500 btn btn-sm btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </a>
            </li>
          </div>

          <!-- Add Category input -->
          <div class="flex items-center w-full gap-4">
            <input
              v-model="newCategory"
              placeholder="New Category"
              maxlength="25"
              class="flex-1 border input input-bordered"
            />
            <button @click="handleAddCategory" class="text-white bg-green-500 btn btn-md">
              +Add
            </button>
          </div>
        </div>
      </div>
      <button @click="saveAppSettings" class="w-full btn btn-accent">Save Settings</button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';

import Card from '@/components/daisy/Card.vue';
// import Input from '@/components/daisy/Input.vue';

const userStore = useUserStore();
const { appSettings, addCategory, removeCategory, saveAppSettings } = userStore;

const newCategory = ref('');
function handleAddCategory() {
  if (newCategory.value.length > 0) {
    console.log(`Added category: ${newCategory.value}`);
    addCategory(newCategory.value);
    newCategory.value = '';
  }
}
function handleRemoveCategory(index: any) {
  console.log(`Category index to remove: ${index}`);
  removeCategory(index);
}
</script>
