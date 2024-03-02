<template>
  <div v-if="transactionsByAccount(accountId).slice(0, previewCount).length > 0" class="space-y-1">
    <div
      v-for="transaction in transactionsByAccount(accountId).slice(0, previewCount)"
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
  </div>

  <div v-else>No transactions exist for account</div>
</template>

<script setup lang="ts">
import { useTransactionsStore } from '@/stores/transactions';

import { getThirtyDaysAgo } from '@/util/date-utils';
import { formatTransactionDate, formatCurrency } from '@/util/format-utils';

const props = defineProps({
  id: { type: String, required: true },
  previewCount: { type: Number, default: 5 }
});
const accountId = Number.parseInt(props.id);

const transactionsStore = useTransactionsStore();
const { transactionsByAccount, loadTransactionsByAccountForDateRange } = transactionsStore;

const today = new Date();
await loadTransactionsByAccountForDateRange(accountId, getThirtyDaysAgo(today), today);
</script>
