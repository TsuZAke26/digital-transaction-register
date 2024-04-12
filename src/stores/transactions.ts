import { ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import {
  fetchTransactionsByAccountId,
  fetchTransactionsByAccountIdForDateRange,
  insertTransaction
} from '@/supabase/db-transactions';
import type { NewTransaction } from '@/types/ui-types';
import type { Database } from '@/types/supabase';
import { jsDateToSupabaseDate } from '@/util/date-utils';

const toast = useToast();

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
  function transactionsByAccount(accountId: number) {
    return transactions.value
      .filter((storeTransaction) => accountId === storeTransaction.account_id)
      .sort((a, b) => {
        if (a.date < b.date) return 1;
        else if (a.date > b.date) return -1;
        return 0;
      });
  }
  function transactionsByAccountInDateRange(accountId: number, from: Date, to: Date) {
    const transactionsInRangeFromStore = transactions.value.filter((storeTransaction) => {
      const matchesAccount = accountId === storeTransaction.account_id;
      const gteFromDate = storeTransaction.date >= jsDateToSupabaseDate(from);
      const lteToDate = storeTransaction.date <= jsDateToSupabaseDate(to);

      return matchesAccount && gteFromDate && lteToDate;
    });

    const transactionsInRangeFromDB: Database['public']['Tables']['transactions']['Row'][] = [];
    if (transactionsInRangeFromStore.length === 0) {
      fetchTransactionsByAccountIdForDateRange(accountId, from, to).then((result) => {
        result?.forEach((fetchedTransaction) => transactionsInRangeFromDB.push(fetchedTransaction));
      });
    }

    return transactionsInRangeFromStore.concat(transactionsInRangeFromDB).sort((a, b) => {
      if (a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      return 0;
    });
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
  async function loadTransactionsByAccountForDateRange(accountId: number, from: Date, to: Date) {
    const fetchedTransactionsForDateRange = await fetchTransactionsByAccountIdForDateRange(
      accountId,
      from,
      to
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
      toast.success('Transaction creation successful');
      return true;
    } else {
      toast.error('Transaction creation failed');
      return false;
    }
  }

  function resetState() {
    transactions.value = [];
  }

  return {
    transactions,
    transactionsByAccount,
    transactionsByAccountInDateRange,
    loadTransactionsByAccount,
    loadTransactionsByAccountForDateRange,
    addTransaction,
    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot));
}
