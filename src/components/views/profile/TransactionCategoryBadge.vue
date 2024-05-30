<template>
  <div class="flex-shrink pl-2 pr-1 border rounded-full bg-info">
    <span class="flex items-center gap-1 text-lg dark:text-white">
      {{ category }}
      <button class="btn btn-circle btn-link btn-xs" @click="$emit('remove-category')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          class="w-6 h-6 dark:fill-white"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  category: {
    type: String,
    required: true
  }
});

defineEmits(['remove-category']);
</script>
