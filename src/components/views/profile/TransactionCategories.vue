<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Transaction Categories</div>

      <div v-if="categories" class="space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <TransactionCategoryBadge
            v-for="(category, index) in categories"
            :key="index"
            :category="category"
            @remove-category="removeCategory(index)"
          />
        </div>
        <div class="flex items-center gap-4">
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
        </div>
      </div>

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

import TransactionCategoryBadge from '@/components/views/profile/TransactionCategoryBadge.vue';

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
