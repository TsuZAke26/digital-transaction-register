<template>
  <div class="space-y-2">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="px-4 py-2 space-y-2 border rounded-lg"
    >
      <!-- Name & amount -->
      <div class="flex items-start justify-between">
        <div class="text-sm font-semibold">{{ transaction.name }}</div>
        <div class="text-lg font-bold" :class="styleAmount(transaction.amount)">
          {{ formatAmount(transaction.amount) }}
        </div>
      </div>

      <!-- Date & category -->
      <div class="flex items-center justify-between">
        <div class="text-sm badge badge-accent">{{ transaction.category }}</div>
        <div class="text-sm font-semibold">{{ formatTransactionDate(transaction.date) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '@/types/supabase';

import { formatTransactionDate, formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});
</script>
