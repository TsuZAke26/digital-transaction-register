<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Transaction Categories</div>
      <ul v-if="categories" class="mt-2 space-y-3">
        <!-- Category list item generator -->
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="flex items-center justify-between"
        >
          <span class="text-lg">{{ category }}</span>
          <button @click="removeCategory(index)" class="text-white btn btn-sm btn-circle btn-error">
            X
          </button>
        </li>

        <!-- Add Category list item -->
        <li class="flex items-center justify-between gap-4">
          <input
            v-model="newCategory"
            placeholder="New Category"
            class="w-full input input-bordered"
          />
          <button
            @click="handleAddCategory"
            class="text-white btn btn-primary"
            :disabled="!newCategory.length"
          >
            Add
          </button>
        </li>
      </ul>

      <div class="w-full my-4 border"></div>

      <div class="justify-end card-actions">
        <button @click="handleSaveCategories" class="text-white btn btn-primary">
          Save Categories
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';

const toast = useToast();

const userStore = useUserStore();
const { categories } = storeToRefs(userStore);
const { addCategory, removeCategory, saveAppSettings } = userStore;

const newCategory = ref('');
function handleAddCategory() {
  if (newCategory.value.length > 0) {
    addCategory(newCategory.value);
    if (categories.value.includes(newCategory.value)) {
      newCategory.value = '';
    }
  }
}
async function handleSaveCategories() {
  try {
    await saveAppSettings();
    toast.success('Settings saved successfully!');
  } catch (error) {
    console.error('Error saving application settings: ', error);
    toast.error('Error savings settings');
  }
}
</script>
