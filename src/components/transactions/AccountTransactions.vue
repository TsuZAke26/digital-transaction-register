<template>
  <div v-if="transactionsByAccount(accountId).length > 0" class="space-y-1">
    <TransactionRow
      v-for="transaction in transactionsByAccount(accountId)"
      :key="transaction.id"
      :transaction="transaction"
    />
  </div>

  <div v-else>No transactions exist for account</div>
</template>

<script setup lang="ts">
import { useTransactionsStore } from '@/stores/transactions';

import { getThirtyDaysAgo } from '@/util/date-utils';

import TransactionRow from '@/components/transactions/TransactionRow.vue';

const props = defineProps({
  id: { type: String, required: true }
});
const accountId = Number.parseInt(props.id);

const transactionsStore = useTransactionsStore();
const { transactionsByAccount, loadTransactionsByAccountForDateRange } = transactionsStore;

const today = new Date();
const thirtyDaysAgo = getThirtyDaysAgo(today);
await loadTransactionsByAccountForDateRange(accountId, thirtyDaysAgo, today);
</script>
