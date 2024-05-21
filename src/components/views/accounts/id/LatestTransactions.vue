<template>
  <div v-if="loaded && latestTransactions?.length === 0">No transactions found</div>
  <div v-else>
    <TransactionsListRenderer :transactions="latestTransactions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import { getThirtyDaysAgo } from '@/util/date-utils';

import TransactionsListRenderer from '@/components/transactions/TransactionsListRenderer.vue';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(props.accountId);

const loaded = ref(false);

const transactionsStore = useTransactionsStore();
const { latestTransactions } = storeToRefs(transactionsStore);
const { loadTransactionsByAccountInDateRange } = transactionsStore;

const now = new Date();
await loadTransactionsByAccountInDateRange(idAsNumber, getThirtyDaysAgo(now), now).then(() => {
  loaded.value = true;
});
</script>
