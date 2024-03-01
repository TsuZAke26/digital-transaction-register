import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import type { AccountSummary, NewAccount } from '@/types/ui-types';
import {
  fetchAccountById,
  fetchAccountBalances,
  fetchAccounts,
  insertAccount
} from '@/supabase/db-accounts';
import type { Database } from '@/types/supabase';
import { createAccountSummary } from '@/util/ui-utils';

const toast = useToast();

export const useAccountsStore = defineStore('accounts', () => {
  const accountBalances: Ref<Database['public']['Views']['account_balance']['Row'][]> = ref([]);
  async function loadAccountBalances() {
    const fetchedAccountPreviews = await fetchAccountBalances();
    if (fetchedAccountPreviews) {
      fetchedAccountPreviews.forEach((fetchedAccountPreview) => {
        if (
          !accountBalances.value.find(
            (existingPreview) => existingPreview.id === fetchedAccountPreview.id
          )
        ) {
          accountBalances.value.push(fetchedAccountPreview);
        }
      });
    }
  }

  const accounts: Ref<Database['public']['Tables']['accounts']['Row'][]> = ref([]);
  function _findAccount(accountId: number) {
    return accounts.value.find((storeAccount) => storeAccount.id === accountId);
  }
  function _findMatchingAccountBalance(accountId: number) {
    return accountBalances.value.find((storeBalance) => storeBalance.id === accountId);
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
  // const accountSummaries = computed(() => {
  //   const result: AccountSummary[] = [];

  //   accounts.value.forEach((storeAccount) => {
  //     const summary = getAccountSummary(storeAccount.id);
  //     if (summary) {
  //       result.push(summary);
  //     }
  //   });

  //   return result;
  // });
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
    if (
      fetchedAccount &&
      !accounts.value.find((existingAccount) => existingAccount.id === fetchedAccount.id)
    ) {
      accounts.value.push(fetchedAccount);
    }
  }
  async function addAccount(data: NewAccount): Promise<boolean> {
    const newAccount = await insertAccount(data);
    if (newAccount) {
      accounts.value.push(newAccount);
      toast.success('Account creation successful');
      return true;
    } else {
      toast.error('Account creation failed');
      return false;
    }
  }
  async function refreshAccountBalance(accountId: number) {
    console.log('refreshAccountBalance()');
  }

  return {
    accountBalances,
    loadAccountBalances,
    accounts,
    accountSummariesByType,
    getAccountSummary,
    loadAccounts,
    loadAccountById,
    addAccount,
    refreshAccountBalance
  };
});
