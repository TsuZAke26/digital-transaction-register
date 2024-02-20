<template>
  <div
    :key="transaction.id"
    class="flex flex-row items-center justify-between font-medium text-gray-500 text-md"
  >
    <div class="flex flex-row gap-2">
      <span>{{ formatDate(transaction.date) }}</span>
      <span>{{ transaction.name }}</span>
    </div>

    <span :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'">
      {{ formatAmount(transaction.amount) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import { formatDate, formatAmount } from '@/util/transaction-utils';

import type { Transactions } from '@/types/supabase/db-tables';

defineProps({
  transaction: {
    type: Object as PropType<Transactions>,
    required: true
  }
});
</script>
