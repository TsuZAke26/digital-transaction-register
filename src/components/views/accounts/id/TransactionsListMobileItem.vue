<template>
  <div
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
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import type { Database } from '@/types/supabase';

import { formatTransactionDate, formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  transaction: {
    type: Object as PropType<Database['public']['Tables']['transactions']['Row']>,
    required: true
  }
});

const emit = defineEmits<{
  edit: [transaction: Database['public']['Tables']['transactions']['Row']];
}>();

function handleTransactionClick(transaction: Database['public']['Tables']['transactions']['Row']) {
  emit('edit', transaction);
}
</script>
