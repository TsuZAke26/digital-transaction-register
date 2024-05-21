<template>
  <div v-if="loaded && latestTransactions?.length === 0">No transactions found</div>
  <div v-else>
    <!-- Mobile transaction list -->
    <div class="sm:hidden">
      <TransactionsListMobile
        :transactions="latestTransactions"
        @edit="handleEditTransaction($event)"
      />
    </div>

    <!-- Non-mobile Transaction list -->
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
import { ref, toRef, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { getThirtyDaysAgo } from '@/util/date-utils';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';
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

const transactionToEdit: Ref<Database['public']['Tables']['transactions']['Row']> = ref({
  id: -1,
  name: '',
  date: '',
  category: '',
  amount: 0,
  account_id: -1,
  created_at: ''
});

const now = new Date();
await loadTransactionsByAccountInDateRange(idAsNumber, getThirtyDaysAgo(now), now).then(() => {
  loaded.value = true;
});

function handleEditTransaction(transaction: Database['public']['Tables']['transactions']['Row']) {
  transactionToEdit.value = transaction;

  const editTransactionDialogEl = document.getElementById('modal-edit-transaction');
  if (editTransactionDialogEl instanceof HTMLDialogElement) {
    editTransactionDialogEl.showModal();
  }
}
</script>
