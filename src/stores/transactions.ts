import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  deleteTransaction,
  fetchLatestTransactionByAccountId,
  fetchTransactionsByAccountId,
  fetchTransactionsByAccountIdForDateRange,
  insertTransaction,
  insertTransactions,
  updateTransaction
} from '@/api/supabase/db-transactions';

import type { Database } from '@/types/supabase';

import { getThirtyDaysAgoFromJSDate, jsDateToSupabaseDate } from '@/util/date-utils';
import { sortTransactionsDesc } from '@/util/sort-utils';

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
  const transactionsDesc: ComputedRef<Database['public']['Tables']['transactions']['Row'][]> =
    computed(() => {
      return transactions.value.sort(sortTransactionsDesc);
    });
  const latestTransactions = computed(() => {
    return transactions.value.sort(sortTransactionsDesc).slice(0, 5);
  });
  function _transactionIndexInStore(id: number) {
    return transactions.value.findIndex((storeTranasction) => storeTranasction.id === id);
  }
  async function loadTransactionsByAccount(accountId: number) {
    transactions.value = await fetchTransactionsByAccountId(accountId);
  }
  async function loadLatestTransactions(accountId: number) {
    const latestTransaction = await fetchLatestTransactionByAccountId(accountId);
    const latestTransactionDate = new Date(Date.parse(latestTransaction.date));
    const thirtyDaysAgo = getThirtyDaysAgoFromJSDate(latestTransactionDate);

    await loadTransactionsByAccountInDateRange(accountId, thirtyDaysAgo, latestTransactionDate);
  }
  async function loadTransactionsByAccountInDateRange(accountId: number, from: Date, to: Date) {
    const supabaseFromDate = jsDateToSupabaseDate(from);
    const supabaseToDate = jsDateToSupabaseDate(to);
    const fetchedTransactionsForDateRange = await fetchTransactionsByAccountIdForDateRange(
      accountId,
      supabaseFromDate,
      supabaseToDate
    );
    if (fetchedTransactionsForDateRange.length > 0) {
      fetchedTransactionsForDateRange.forEach((fetchedTransaction) => {
        const transactionStoreIndex = _transactionIndexInStore(fetchedTransaction.id);
        if (transactionStoreIndex === -1) {
          transactions.value.push(fetchedTransaction);
        } else {
          transactions.value.splice(transactionStoreIndex, 1, fetchedTransaction);
        }
      });
    }
  }

  async function addTransaction(data: Database['public']['Tables']['transactions']['Insert']) {
    const newTransaction = await insertTransaction(data);
    if (newTransaction) {
      transactions.value.push(newTransaction);
    }
  }
  async function addTransactions(data: Database['public']['Tables']['transactions']['Insert'][]) {
    const newTransactions = await insertTransactions(data);
    if (newTransactions) {
      newTransactions.forEach((newTransaction) => {
        transactions.value.push(newTransaction);
      });
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

  function resetState() {
    transactions.value = [];
  }

  return {
    transactions,
    transactionsDesc,
    latestTransactions,
    loadTransactionsByAccount,
    loadLatestTransactions,
    addTransaction,
    addTransactions,
    editTransaction,
    removeTransaction,

    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot));
}
