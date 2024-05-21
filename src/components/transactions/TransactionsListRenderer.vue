<template>
  <div v-if="transactions.length === 0">No transactions found</div>
  <div v-else>
    <!-- Mobile transaction list -->
    <div class="sm:hidden">
      <TransactionsListMobile :transactions="transactions" @edit="handleEditTransaction($event)" />
    </div>

    <!-- Non-mobile Transaction list -->
    <div class="hidden sm:block">
      <TransactionsListDesktop :transactions="transactions" @edit="handleEditTransaction($event)" />
    </div>
  </div>

  <EditTransactionModal :transaction="transactionToEdit" />
</template>

<script setup lang="ts">
import { ref, type Ref, type PropType } from 'vue';

import type { Database } from '@/types/supabase';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';
import TransactionsListMobile from '@/components/transactions/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/transactions/TransactionsListDesktop.vue';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
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
