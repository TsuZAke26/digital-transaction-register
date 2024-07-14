<template>
  <div tabindex="0" class="border collapse collapse-arrow">
    <input type="checkbox" />
    <div class="text-xl font-semibold collapse-title">Transaction Categories</div>
    <div class="collapse-content">
      <div v-if="transactionCategories" class="space-y-4">
        <!-- Add New Category -->
        <div
          class="flex items-center justify-between w-full gap-4 py-2 pl-4 pr-2 border rounded-md"
        >
          <input v-model="newCategory" placeholder="New Category" class="w-full" />
          <button
            @click="handleAddCategory"
            class="btn btn-primary btn-sm btn-circle"
            :disabled="!newCategory.length"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="w-6 h-6 fill-white"
              fill="#FFFFFF"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>

        <!-- List of Transaction Categories -->
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="(category, index) in transactionCategories"
            :key="index"
            class="flex items-center justify-between py-2 pl-4 pr-2 border rounded-md"
          >
            <span class="truncate">{{ category }}</span>
            <button
              class="bg-red-500 btn btn-circle btn-sm"
              @click="removeTransactionCategory(index)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-6 h-6 fill-white"
              >
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { transactionCategories } = storeToRefs(userStore);
const { addTransactionCategory, removeTransactionCategory } = userStore;

const newCategory = ref('');
function handleAddCategory() {
  addTransactionCategory(newCategory.value);
  if (transactionCategories.value.includes(newCategory.value)) {
    newCategory.value = '';
  }
}
</script>
