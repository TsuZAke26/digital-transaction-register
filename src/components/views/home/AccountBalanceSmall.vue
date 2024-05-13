<template>
  <div
    @click="handleNavigateToAccountRoute"
    class="flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer"
  >
    <div>{{ name }}</div>
    <div :class="styleCurrency(balance)">{{ formatCurrency(balance) }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { formatCurrency, styleCurrency } from '@/util/format-utils';

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

<style scoped></style>
