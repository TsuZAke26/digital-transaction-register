<template>
  <div
    :key="transaction.id"
    class="flex flex-row items-center justify-between font-medium text-gray-500 text-md"
  >
    <div class="flex flex-row gap-2">
      <span>{{ formatTransactionDate(transaction.date) }}</span>
      <span>{{ transaction.name }}</span>
    </div>

    <span :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'">
      {{ formatCurrency(transaction.amount) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { formatTransactionDate, formatCurrency } from '@/util/format-utils';
import type { Database } from '@/types/supabase';

defineProps({
  transaction: {
    type: Object as PropType<Database['public']['Tables']['transactions']['Row']>,
    required: true
  }
});
</script>
@/types/supabase
