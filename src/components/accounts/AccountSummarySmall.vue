<template>
  <div
    @click="handleNavigateToAccountRoute"
    class="flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer"
  >
    <div>{{ name }}</div>
    <div class="flex items-center">
      <div :class="styleAmount(balance)">{{ formatAmount(balance) }}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="w-6 h-6 dark:fill-white"
      >
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { formatAmount, styleAmount } from '@/util/format-utils';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

const router = useRouter();

function handleNavigateToAccountRoute() {
  router.push({
    name: 'account',
    params: {
      id: props.id
    }
  });
}
</script>
