<template>
  <div v-if="loaded && localTransactions?.length === 0">No transactions found</div>
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
const { loadTransactionsByAccountInDateRange, transactionsByAccountInDateRange } =
  transactionsStore;

const loaded = ref(false);

const localTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
const now = new Date();
await loadTransactionsByAccountInDateRange(idAsNumber, getThirtyDaysAgo(now), now).then(() => {
  localTransactions.value = transactionsByAccountInDateRange(
    idAsNumber,
    getThirtyDaysAgo(now),
    now
  );
  loaded.value = true;
});
</script>
