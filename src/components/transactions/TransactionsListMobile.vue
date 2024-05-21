<template>
  <div class="space-y-2">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="px-4 py-2 space-y-2 border rounded-lg cursor-pointer"
      @click="handleTransactionClick(transaction)"
    >
      <!-- Name & amount -->
      <div class="flex items-start justify-between">
        <div class="text-sm font-medium truncate">{{ transaction.name }}</div>
        <div class="font-bold text-md" :class="styleAmount(transaction.amount)">
          {{ formatAmount(transaction.amount) }}
        </div>
      </div>

      <!-- Date & category -->
      <div class="flex items-center justify-between">
        <div class="text-sm badge badge-secondary">{{ transaction.category }}</div>
        <div class="text-sm font-medium">{{ formatTransactionDate(transaction.date) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { Database } from '@/types/supabase';

import { formatTransactionDate, formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});

const emit = defineEmits<{
  edit: [transaction: Database['public']['Tables']['transactions']['Row']];
}>();

function handleTransactionClick(transaction: Database['public']['Tables']['transactions']['Row']) {
  emit('edit', transaction);
}
</script>
