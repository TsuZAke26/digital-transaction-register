<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div v-if="!accountSummary">Loading...</div>
    <AccountSummaryCard v-else :summary="accountSummary" />

    <div class="my-4" />

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import type { Database } from '@/types/supabase';

import AccountSummaryCard from '@/components/views/accounts/id/AccountSummaryCard.vue';
import TransactionsListMobile from '@/components/views/accounts/id/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/views/accounts/id/TransactionsListDesktop.vue';

const props = defineProps({
  id: String
});
const idAsNumber = Number.parseInt(props.id);

const accountsStore = useAccountsStore();
const { loadAccountById, loadAccountBalanceById, getAccountSummary } = accountsStore;

const accountSummary = ref(undefined);
loadAccountById(idAsNumber)
  .then(() => loadAccountBalanceById(idAsNumber))
  .then(() => {
    accountSummary.value = getAccountSummary(idAsNumber);
  });

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
