import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

const transactionsStore = useTransactionsStore();
const { transactionToEdit } = storeToRefs(transactionsStore);

export function useModals() {
  function openEditTransactionModal(
    transaction: Database['public']['Tables']['transactions']['Row']
  ) {
    transactionToEdit.value = transaction;

    const editTransactionDialogEl = document.getElementById('modal-edit-transaction');
    if (editTransactionDialogEl instanceof HTMLDialogElement) {
      editTransactionDialogEl.showModal();
    }
  }

  return {
    openEditTransactionModal
  };
}
