<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Transactions</div>

      <div>
        <!-- Mobile transaction list -->
        <div class="sm:hidden">
          <TransactionsListMobile :transactions="sampleTransactions" />
        </div>

        <!-- Non-mobile Transaction list -->
        <div class="hidden sm:block">
          <TransactionsListDesktop :transactions="sampleTransactions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import TransactionsListMobile from '@/components/views/accounts/id/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/views/accounts/id/TransactionsListDesktop.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const transactionsStore = useTransactionsStore();
const { loadTransactionsByAccount } = transactionsStore;

const idAsNumber = Number.parseInt(toRef(props, 'id').value);
await loadTransactionsByAccount(idAsNumber);

const sampleTransactions: Database['public']['Tables']['transactions']['Row'][] = [
  {
    id: 1,
    account_id: 1,
    name: 'Mortgage payment',
    amount: -1531.24,
    category: 'Housing',
    date: '2024-05-01',
    created_at: '2024-05-01'
  },
  {
    id: 2,
    account_id: 1,
    name: 'IHDA Down Payment Assistance',
    amount: -83.33,
    category: 'Housing',
    date: '2024-05-01',
    created_at: '2024-05-01'
  }
];
</script>
