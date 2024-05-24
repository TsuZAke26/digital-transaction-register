<template>
  <TransactionsListRenderer :transactions="filteredTransactionsPaginated" />

  <!-- Pagination controls -->
  <div class="mx-auto join">
    <!-- Previous Page button -->
    <button @click="currentPage -= 1" :disabled="currentPage === 1" class="join-item btn btn-sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>

    <button class="join-item btn btn-sm">Page {{ currentPage }}</button>

    <!-- Next Page button -->
    <button
      @click="currentPage += 1"
      :disabled="currentPage === totalPages"
      class="join-item btn btn-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, type ComputedRef, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { sortTransactionsDesc } from '@/util/sort-utils';

import TransactionsListRenderer from '@/components/transactions/TransactionsListRenderer.vue';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});
const accountIdAsNumber = Number.parseInt(props.accountId);

const transactionsStore = useTransactionsStore();
const { transactions } = storeToRefs(transactionsStore);
const { loadTransactionsByAccount } = transactionsStore;

watch(transactions, (newValue) => {
  filteredTransactions.value = newValue;
});
const filteredTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
const filteredTransactionsPaginated: ComputedRef<
  Database['public']['Tables']['transactions']['Row'][]
> = computed(() => {
  const startIndex = perPage * currentPage.value - perPage;
  const endIndex =
    perPage * currentPage.value > filteredTransactions.value.length
      ? filteredTransactions.value.length
      : perPage * currentPage.value;

  return filteredTransactions.value.slice(startIndex, endIndex).sort(sortTransactionsDesc);
});
const perPage = 8;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / perPage));

await loadTransactionsByAccount(accountIdAsNumber).then(() => {
  filteredTransactions.value = transactions.value.sort(sortTransactionsDesc);
});
</script>
