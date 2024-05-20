<template>
  <div v-if="loaded && latestTransactions?.length === 0">No transactions found</div>
  <div v-else>
    <!-- Mobile transaction list -->
    <div class="sm:hidden">
      <TransactionsListMobile :transactions="latestTransactions" />
    </div>

    <!-- Non-mobile Transaction list -->
    <div class="hidden sm:block">
      <TransactionsListDesktop :transactions="latestTransactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import { getThirtyDaysAgo } from '@/util/date-utils';

import TransactionsListMobile from '@/components/views/accounts/id/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/views/accounts/id/TransactionsListDesktop.vue';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(toRef(props, 'accountId').value);

const transactionsStore = useTransactionsStore();
const { latestTransactions } = storeToRefs(transactionsStore);
const { loadTransactionsByAccountInDateRange } = transactionsStore;

const loaded = ref(false);

const now = new Date();
await loadTransactionsByAccountInDateRange(idAsNumber, getThirtyDaysAgo(now), now).then(() => {
  loaded.value = true;
});
</script>
