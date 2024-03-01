import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import {
  fetchTransactionsByAccountId,
  fetchTransactionsByAccountIdForDateRange,
  insertTransaction
} from '@/supabase/db-transactions';
import type { NewTransaction } from '@/types/ui-types';
import type { Database } from '@/types/supabase';

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
  async function loadTransactionsByAccount(accountId: number) {
    const fetchedTransactions = await fetchTransactionsByAccountId(accountId);
    if (fetchedTransactions) {
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
    const fetchedTransactions = await fetchTransactionsByAccountIdForDateRange(accountId, from, to);
    if (fetchedTransactions) {
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

  return {
    transactions,
    transactionsByAccount,
    loadTransactionsByAccount,
    loadTransactionsByAccountForDateRange,
    addTransaction
  };
});
