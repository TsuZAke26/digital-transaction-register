import { ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  fetchTransactionsByAccountId,
  fetchTransactionsByAccountIdForDateRange,
  insertTransaction
} from '@/api/supabase/db-transactions';

import type { NewTransaction } from '@/types/ui-types';
import type { Database } from '@/types/supabase';

import { jsDateToSupabaseDate } from '@/util/date-utils';
import { sortTransactionsDesc } from '@/util/sort-utils';

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
  // const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([
  //   {
  //     id: 1,
  //     account_id: 1,
  //     name: 'Mortgage payment',
  //     amount: -1531.24,
  //     category: 'Housing',
  //     date: '2024-05-01',
  //     created_at: '2024-05-01'
  //   },
  //   {
  //     id: 2,
  //     account_id: 1,
  //     name: 'IHDA Down Payment Assistance',
  //     amount: -83.33,
  //     category: 'Housing',
  //     date: '2024-05-03',
  //     created_at: '2024-05-01'
  //   }
  // ]);
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
  async function addTransaction(data: NewTransaction) {
    const newTransaction = await insertTransaction(data);
    if (newTransaction) {
      transactions.value.push(newTransaction);
      // toast.success('Transaction creation successful');
      return true;
    } else {
      // toast.error('Transaction creation failed');
      return false;
    }
  }

  function resetState() {
    transactions.value = [];
  }

  return {
    transactions,
    transactionsByAccountInDateRange,
    loadTransactionsByAccount,
    loadTransactionsByAccountInDateRange,
    addTransaction,
    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot));
}
