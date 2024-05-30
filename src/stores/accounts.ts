import { computed, ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import {
  fetchAccountById,
  fetchAccountBalances,
  fetchAccountBalanceById,
  fetchAccounts,
  insertAccount,
  updateAccount,
  deleteAccount
} from '@/api/supabase/db-accounts';

import type { AccountSummary } from '@/types/ui-types';
import type { Database } from '@/types/supabase';

import { createAccountSummary } from '@/util/ui-utils';

export const useAccountsStore = defineStore('accounts', () => {
  const accountBalances: Ref<Database['public']['Views']['account_balance']['Row'][]> = ref([]);
  function _findMatchingAccountBalance(accountId: number) {
    return accountBalances.value.find((storeBalance) => storeBalance.id === accountId);
  }
  async function loadAccountBalances() {
    const fetchedAccountBalances = await fetchAccountBalances();
    if (fetchedAccountBalances) {
      fetchedAccountBalances.forEach((fetchedAccountBalance) => {
        const fetchedAccountBalanceStoreIndex = accountBalances.value.findIndex(
          (storeAccountBalance) => storeAccountBalance.id === fetchedAccountBalance.id
        );

        // Replace existing account balance with that fetched from database if already present
        if (fetchedAccountBalanceStoreIndex > -1) {
          accountBalances.value.splice(fetchedAccountBalanceStoreIndex, 1, fetchedAccountBalance);
        }
        // Otherwise, simply add it to the account balances in the store
        else {
          accountBalances.value.push(fetchedAccountBalance);
        }
      });
    }
  }
  async function loadAccountBalanceById(accountId: number) {
    const fetchedAccountBalance = await fetchAccountBalanceById(accountId);
    if (fetchedAccountBalance) {
      const accountBalanceIndex = accountBalances.value.findIndex(
        (storeBalance) => fetchedAccountBalance.id === storeBalance.id
      );
      if (accountBalanceIndex > -1) {
        accountBalances.value.splice(accountBalanceIndex, 1, fetchedAccountBalance);
      } else {
        accountBalances.value.push(fetchedAccountBalance);
      }
    }
  }

  const accounts: Ref<Database['public']['Tables']['accounts']['Row'][]> = ref([]);
  function _accountIndexInStore(id: number) {
    return accounts.value.findIndex((storeAccount) => storeAccount.id === id);
  }
  function _findAccount(id: number) {
    return accounts.value.find((storeAccount) => storeAccount.id === id);
  }
  async function loadAccounts() {
    const fetchedAccounts = await fetchAccounts();
    if (fetchedAccounts) {
      accounts.value = fetchedAccounts;
    }
  }
  async function loadAccountById(id: number) {
    const fetchedAccount = await fetchAccountById(id);
    if (fetchedAccount) {
      const existingAccountIndex = accounts.value.findIndex(
        (existingAccount) => fetchedAccount.id === existingAccount.id
      );

      if (existingAccountIndex > -1) {
        accounts.value.splice(existingAccountIndex, 1, fetchedAccount);
      } else {
        accounts.value.push(fetchedAccount);
      }
    }
  }
  function getAccountFromStore(id: number) {
    return _findAccount(id);
  }
  async function addAccount(data: Database['public']['Tables']['accounts']['Insert']) {
    const newAccount = await insertAccount(data);
    if (newAccount) {
      accounts.value.push(newAccount);
    }
  }
  async function editAccount(id: number, data: Database['public']['Tables']['accounts']['Update']) {
    const storeIndex = _accountIndexInStore(id);
    if (storeIndex === -1) {
      throw new Error('Account not found in store');
    }

    const updatedAccount = await updateAccount(id, data);
    if (updatedAccount) {
      accounts.value.splice(storeIndex, 1, updatedAccount);
    }
  }
  async function removeAccount(id: number) {
    const storeIndex = _accountIndexInStore(id);
    if (storeIndex === -1) {
      throw new Error('Account not found in store');
    }

    await deleteAccount(id);
    accounts.value.splice(storeIndex, 1);
  }

  function getAccountSummary(id: number) {
    const account = _findAccount(id);
    const accountBalance = _findMatchingAccountBalance(id);

    if (account && accountBalance) {
      return createAccountSummary(account, accountBalance);
    }
  }
  const accountSummaries = computed(() => {
    const result: AccountSummary[] = [];
    accounts.value.forEach((account) => {
      const summary = getAccountSummary(account.id);
      if (summary) {
        result.push(summary);
      }
    });
    return result;
  });
  const accountSummariesByType = computed(() => {
    return (type: Database['public']['Enums']['account_type']) => {
      const result: AccountSummary[] = [];

      const filteredAccounts = accounts.value.filter(
        (storeAccount) => type === storeAccount.account_type
      );
      filteredAccounts.forEach((filteredAccount) => {
        const summary = getAccountSummary(filteredAccount.id);
        if (summary) {
          result.push(summary);
        }
      });

      return result;
    };
  });

  function resetState() {
    accountBalances.value = [];
    accounts.value = [];
  }

  return {
    accountBalances,
    loadAccountBalances,
    loadAccountBalanceById,
    accounts,
    accountSummaries,
    accountSummariesByType,
    getAccountSummary,
    loadAccounts,
    loadAccountById,
    getAccountFromStore,
    addAccount,
    editAccount,
    removeAccount,
    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot));
}
