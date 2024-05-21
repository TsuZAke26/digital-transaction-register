import { computed, ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  deleteTransaction,
  fetchTransactionsByAccountId,
  fetchTransactionsByAccountIdForDateRange,
  insertTransaction,
  insertTransactions,
  updateTransaction
} from '@/api/supabase/db-transactions';

import type { Database } from '@/types/supabase';

import { jsDateToSupabaseDate } from '@/util/date-utils';
import { sortTransactionsDesc } from '@/util/sort-utils';

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
  const latestTransactions = computed(() => {
    return transactions.value.sort(sortTransactionsDesc).slice(0, 5);
  });

  function _transactionIndexInStore(id: number) {
    return transactions.value.findIndex((storeTranasction) => storeTranasction.id === id);
  }

  function transactionsByAccountInDateRange(accountId: number, from: Date, to: Date) {
    const transactionsInRangeFromStore = transactions.value.filter((storeTransaction) => {
      const matchesAccount = accountId === storeTransaction.account_id;
      const gteFromDate = storeTransaction.date >= jsDateToSupabaseDate(from);
      const lteToDate = storeTransaction.date <= jsDateToSupabaseDate(to);

      return matchesAccount && gteFromDate && lteToDate;
    });

    return transactionsInRangeFromStore.sort(sortTransactionsDesc);
  }

  async function loadTransactionsByAccount(accountId: number) {
    const fetchedTransactions = await fetchTransactionsByAccountId(accountId);
    if (fetchedTransactions && fetchedTransactions.length > 0) {
      fetchedTransactions.forEach((fetchedTransaction) => {
        if (
          !transactions.value.find(
            (existingTransaction) => existingTransaction.id === fetchedTransaction.id
          )
        ) {
          transactions.value.push(fetchedTransaction);
        }
      });
    }
  }
  async function loadTransactionsByAccountInDateRange(accountId: number, from: Date, to: Date) {
    const fetchedTransactionsForDateRange = await fetchTransactionsByAccountIdForDateRange(
      accountId,
      jsDateToSupabaseDate(from),
      jsDateToSupabaseDate(to)
    );
    if (fetchedTransactionsForDateRange && fetchedTransactionsForDateRange.length > 0) {
      fetchedTransactionsForDateRange.forEach((fetchedTransaction) => {
        if (
          !transactions.value.find(
            (existingTransaction) => existingTransaction.id === fetchedTransaction.id
          )
        ) {
          transactions.value.push(fetchedTransaction);
        }
      });
    } else {
      await loadTransactionsByAccount(accountId);
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
    latestTransactions,
    transactionsByAccountInDateRange,
    loadTransactionsByAccount,
    loadTransactionsByAccountInDateRange,
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
