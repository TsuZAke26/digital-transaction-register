<template>
  <!-- Filtered Transactions - Mobile View -->
  <div class="sm:hidden">
    <TransactionsListMobile
      :transactions="filteredTransactions"
      @edit="handleEditTransaction($event)"
    />
  </div>

  <!-- Filtered Transactions - Desktop View -->
  <div class="hidden space-y-4 sm:grid">
    <TransactionsListDesktop
      :transactions="filteredTransactionsPaginated"
      @edit="handleEditTransaction($event)"
    />

    <!-- Pagination controls -->
    <div class="join place-content-center">
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
  </div>

  <EditTransactionModal :transaction="transactionToEdit" />
</template>

<script setup lang="ts">
import { ref, type Ref, type ComputedRef, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { sortTransactionsDesc } from '@/util/sort-utils';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';
import TransactionsListMobile from '@/components/transactions/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/transactions/TransactionsListDesktop.vue';

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

const filteredTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
watch(transactions, (newValue) => {
  filteredTransactions.value = newValue.sort(sortTransactionsDesc);
});

const filteredTransactionsPaginated: ComputedRef<
  Database['public']['Tables']['transactions']['Row'][]
> = computed(() => {
  const startIndex = perPage * currentPage.value - perPage;
  const endIndex =
    perPage * currentPage.value > filteredTransactions.value.length
      ? filteredTransactions.value.length
      : perPage * currentPage.value;

  return filteredTransactions.value.slice(startIndex, endIndex);
});
const perPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / perPage));

await loadTransactionsByAccount(accountIdAsNumber).then(() => {
  filteredTransactions.value = transactions.value.sort(sortTransactionsDesc);
});

const transactionToEdit: Ref<Database['public']['Tables']['transactions']['Row']> = ref({
  id: -1,
  name: '',
  date: '',
  category: '',
  amount: 0,
  account_id: -1,
  created_at: ''
});

function handleEditTransaction(transaction: Database['public']['Tables']['transactions']['Row']) {
  transactionToEdit.value = transaction;

  const editTransactionDialogEl = document.getElementById('modal-edit-transaction');
  if (editTransactionDialogEl instanceof HTMLDialogElement) {
    editTransactionDialogEl.showModal();
  }
}
</script>
