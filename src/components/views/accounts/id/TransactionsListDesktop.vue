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
          <th></th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <TransactionsListDesktopItem
          v-for="transaction in transactions"
          :key="transaction.id"
          :transaction="transaction"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { Database } from '@/types/supabase';

import TransactionsListDesktopItem from '@/components/views/accounts/id/TransactionsListDesktopItem.vue';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});
</script>
