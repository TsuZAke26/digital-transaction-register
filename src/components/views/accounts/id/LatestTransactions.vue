<template>
  <div v-if="loaded && latestTransactions?.length === 0">No transactions found</div>
  <div v-else>
    <!-- Latest Transactions - Mobile View -->
    <div class="sm:hidden">
      <TransactionsListMobile
        :transactions="latestTransactions"
        @edit="handleEditTransaction($event)"
      />
    </div>

    <!-- Latest Transactions - Desktop View -->
    <div class="hidden sm:block">
      <TransactionsListDesktop
        :transactions="latestTransactions"
        @edit="handleEditTransaction($event)"
      />
    </div>
  </div>
  <EditTransactionModal :transaction="transactionToEdit" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';
import TransactionsListMobile from '@/components/transactions/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/transactions/TransactionsListDesktop.vue';

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
const { loadLatestTransactions } = transactionsStore;

await loadLatestTransactions(idAsNumber).then(() => {
  loaded.value = true;
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
