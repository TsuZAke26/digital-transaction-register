import { ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  readTransactionsByAccountId,
  readTransactionsByAccountIdWithLimit,
  createTransaction,
  createTransactions,
  updateTransaction,
  deleteTransaction
} from '@/api/supabase/db-transactions';

import type { Database } from '@/types/supabase';

import { sortTransactionsDesc } from '@/util/sort-utils';

export const useTransactionsStore = defineStore('transactions', () => {
  const loading = ref(false);

  const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
  function _transactionIndexInStore(id: number) {
    return transactions.value.findIndex((localTranasction) => localTranasction.id === id);
  }

  const transactionToEdit: Ref<Database['public']['Tables']['transactions']['Update']> = ref({
    id: -1,
    name: '',
    date: '',
    category: '',
    amount: 0,
    accountId: -1
  });
  function resetTransactionToEdit() {
    transactionToEdit.value = {
      id: -1,
      name: '',
      date: '',
      category: '',
      amount: 0,
      account_id: -1
    };
  }

  async function latestTransactions(accountId: number) {
    loading.value = true;
    const result = await readTransactionsByAccountIdWithLimit(accountId, 5);
    loading.value = false;
    return result;
  }
  async function loadTransactionsByAccount(accountId: number) {
    loading.value = true;
    transactions.value = await readTransactionsByAccountId(accountId);
    loading.value = false;
  }
  async function addTransaction(data: Database['public']['Tables']['transactions']['Insert']) {
    const newTransaction = await createTransaction(data);
    if (newTransaction) {
      transactions.value.push(newTransaction);
      transactions.value = transactions.value.sort(sortTransactionsDesc);
    }
  }
  async function addTransactions(data: Database['public']['Tables']['transactions']['Insert'][]) {
    const newTransactions = await createTransactions(data);
    if (newTransactions) {
      newTransactions.forEach((newTransaction) => {
        transactions.value.push(newTransaction);
      });
      transactions.value = transactions.value.sort(sortTransactionsDesc);
    }
  }
  async function editTransaction(
    id: number,
    data: Database['public']['Tables']['transactions']['Update']
  ) {
    const storeIndex = _transactionIndexInStore(id);
    if (storeIndex === -1) {
      throw new Error('Transaction not found in store');
    }

    const updatedTransaction = await updateTransaction(id, data);
    if (updatedTransaction) {
      transactions.value.splice(storeIndex, 1, updatedTransaction);
    }
  }
  async function removeTransaction(id: number) {
    const storeIndex = _transactionIndexInStore(id);
    if (storeIndex === -1) {
      throw new Error('Transaction not found in store');
    }

    await deleteTransaction(id);
    transactions.value.splice(storeIndex, 1);
  }

  return {
    loading,
    transactions,

    transactionToEdit,
    resetTransactionToEdit,

    latestTransactions,
    loadTransactionsByAccount,
    addTransaction,
    addTransactions,
    editTransaction,
    removeTransaction
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot));
}
