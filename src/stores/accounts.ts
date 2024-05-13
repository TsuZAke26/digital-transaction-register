import { computed, ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import type { AccountSummary, NewAccount } from '@/types/ui-types';
import {
  fetchAccountById,
  fetchAccountBalances,
  fetchAccountBalanceById,
  fetchAccounts,
  insertAccount
} from '@/api/supabase/db-accounts';
import type { Database } from '@/types/supabase';
import { createAccountSummary } from '@/util/ui-utils';

const toast = useToast();

export const useAccountsStore = defineStore('accounts', () => {
  const accountBalances: Ref<Database['public']['Views']['account_balance']['Row'][]> = ref([]);
  function _findMatchingAccountBalance(accountId: number) {
    return accountBalances.value.find((storeBalance) => storeBalance.id === accountId);
  }
  async function loadAccountBalances() {
    const fetchedAccountPreviews = await fetchAccountBalances();
    if (fetchedAccountPreviews) {
      fetchedAccountPreviews.forEach((fetchedAccountPreview) => {
        const fetchedAccountInStoreIndex = accountBalances.value.findIndex(
          (existingPreview) => existingPreview.id === fetchedAccountPreview.id
        );

        // Replace existing account balance with that fetched from database if already present
        if (fetchedAccountInStoreIndex > -1) {
          accountBalances.value.splice(fetchedAccountInStoreIndex, 1, fetchedAccountPreview);
        }
        // Otherwise, simply add it to the account balances in the store
        else {
          accountBalances.value.push(fetchedAccountPreview);
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
  function _findAccount(accountId: number) {
    return accounts.value.find((storeAccount) => storeAccount.id === accountId);
  }
  async function loadAccounts() {
    const fetchedAccounts = await fetchAccounts();
    fetchedAccounts?.forEach((fetchedAccount) => {
      if (!accounts.value.find((existingAccount) => existingAccount.id === fetchedAccount.id)) {
        accounts.value.push(fetchedAccount);
      }
    });
  }
  async function loadAccountById(id: number) {
    const fetchedAccount = await fetchAccountById(id);
    if (fetchedAccount) {
      const existingAccountIndex = accounts.value.findIndex(
        (existingAccount) => fetchedAccount.id === existingAccount.id
      );
      if (existingAccountIndex) {
        accounts.value.splice(existingAccountIndex, 1, fetchedAccount);
      } else {
        accounts.value.push(fetchedAccount);
      }
    }
  }
  function getAccountFromStore(id: number) {
    return _findAccount(id);
  }
  async function addAccount(data: NewAccount): Promise<boolean> {
    const newAccount = await insertAccount(data);
    if (newAccount) {
      accounts.value.push(newAccount);
      toast.success('Account creation successful');
      await loadAccounts();
      return true;
    } else {
      toast.error('Account creation failed');
      return false;
    }
  }

  function getAccountSummary(accountId: number) {
    const account = _findAccount(accountId);
    const accountBalance = _findMatchingAccountBalance(accountId);

    if (account && accountBalance) {
      return createAccountSummary(account, accountBalance);
    }
  }
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
    accountSummariesByType,
    getAccountSummary,
    loadAccounts,
    loadAccountById,
    getAccountFromStore,
    addAccount,
    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot));
}
