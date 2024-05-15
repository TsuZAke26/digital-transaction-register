<template>
  <div v-if="loaded && localTransactions.length === 0">No transactions found</div>
  <div v-else>
    <!-- Mobile transaction list -->
    <div class="sm:hidden">
      <TransactionsListMobile :transactions="localTransactions" />
    </div>

    <!-- Non-mobile Transaction list -->
    <div class="hidden sm:block">
      <TransactionsListDesktop :transactions="localTransactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { getThirtyDaysAgo } from '@/util/date-utils';

import TransactionsListMobile from '@/components/views/accounts/id/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/views/accounts/id/TransactionsListDesktop.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(toRef(props, 'id').value);

const transactionsStore = useTransactionsStore();
const { loadTransactionsByAccount, transactionsByAccountInDateRange } = transactionsStore;

const loaded = ref(false);

const localTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
await loadTransactionsByAccount(idAsNumber).then(() => {
  const now = new Date();
  localTransactions.value = transactionsByAccountInDateRange(
    idAsNumber,
    now,
    getThirtyDaysAgo(now)
  );
  loaded.value = true;
});

// const sampleTransactions: Database['public']['Tables']['transactions']['Row'][] = [
//   {
//     id: 1,
//     account_id: 1,
//     name: 'Mortgage payment',
//     amount: -1531.24,
//     category: 'Housing',
//     date: '2024-05-01',
//     created_at: '2024-05-01'
//   },
//   {
//     id: 2,
//     account_id: 1,
//     name: 'IHDA Down Payment Assistance',
//     amount: -83.33,
//     category: 'Housing',
//     date: '2024-05-01',
//     created_at: '2024-05-01'
//   }
// ];
</script>
