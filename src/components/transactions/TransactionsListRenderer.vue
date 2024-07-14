<template>
  <div v-if="transactions.length === 0">No transactions found</div>
  <div v-else>
    <!-- Mobile transaction list -->
    <div class="sm:hidden">
      <TransactionsListMobile :transactions="transactions" />
    </div>

    <!-- Non-mobile Transaction list -->
    <div class="hidden sm:block">
      <TransactionsListDesktop :transactions="transactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import type { Database } from '@/types/supabase';

import TransactionsListMobile from '@/components/transactions/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/transactions/TransactionsListDesktop.vue';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});
</script>
