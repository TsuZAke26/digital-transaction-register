<template>
  <div class="overflow-x-auto">
    <table class="table table-xs table-zebra">
      <!-- Table header -->
      <thead>
        <tr>
          <th>Category</th>
          <th>Date</th>
          <th>Name</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id" class="hover">
          <th>{{ transaction.category }}</th>
          <th>{{ formatTransactionDate(transaction.date) }}</th>
          <th>{{ transaction.name }}</th>
          <th class="text-right" :class="styleAmount(transaction.amount)">
            {{ formatAmount(transaction.amount) }}
          </th>
        </tr>
      </tbody>
    </table>
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
</script>
