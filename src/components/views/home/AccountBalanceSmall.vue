<template>
  <div class="flex items-center justify-between px-4 py-2 border rounded-md cursor-pointer">
    <div>{{ name }}</div>
    <div :class="styleCurrency(balance)">{{ formatCurrency(balance) }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatCurrency, styleCurrency } from '@/util/format-utils';

defineProps({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
});
</script>

<style scoped></style>
