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
  const loading = ref(false);
  function _setLoading(value: boolean) {
    loading.value = value;
  }

  /* Accounts */
  const accounts: Ref<Database['public']['Tables']['accounts']['Row'][]> = ref([]);
  const currentAccount: Ref<Database['public']['Tables']['accounts']['Row'] | null> = ref(null);
  function _findAccountIndex(id: number) {
    return accounts.value.findIndex((storeAccount) => storeAccount.id === id);
  }
  async function loadAccounts() {
    _setLoading(true);
    accounts.value = await fetchAccounts();
    _setLoading(false);
  }
  async function loadAccountById(id: number) {
    _setLoading(true);

    const accountIndex = _findAccountIndex(id);
    if (accountIndex > -1) {
      currentAccount.value = accounts.value[accountIndex];
    } else {
      const fetchedAccount = await fetchAccountById(id);
      accounts.value.push(fetchedAccount);
      currentAccount.value = fetchedAccount;
    }

    _setLoading(false);
  }
  async function addAccount(data: Database['public']['Tables']['accounts']['Insert']) {
    const newAccount = await insertAccount(data);
    if (newAccount) {
      accounts.value.push(newAccount);
    }
  }
  async function editAccount(id: number, data: Database['public']['Tables']['accounts']['Update']) {
    const storeIndex = _findAccountIndex(id);
    if (storeIndex === -1) {
      throw new Error('Account not found in store');
    }

    const updatedAccount = await updateAccount(id, data);
    if (updatedAccount) {
      accounts.value.splice(storeIndex, 1, updatedAccount);
    }
  }
  async function removeAccount(id: number) {
    const storeIndex = _findAccountIndex(id);
    if (storeIndex === -1) {
      throw new Error('Account not found in store');
    }

    await deleteAccount(id);
    accounts.value.splice(storeIndex, 1);
  }

  /* Account Balances */
  const accountBalances: Ref<Database['public']['Views']['account_balance']['Row'][]> = ref([]);
  const currentAccountBalance: Ref<Database['public']['Views']['account_balance']['Row'] | null> =
    ref(null);
  function _findAccountBalanceIndex(id: number) {
    return accountBalances.value.findIndex((storeAccountBalance) => storeAccountBalance.id === id);
  }
  async function loadAccountBalances() {
    _setLoading(true);
    accountBalances.value = await fetchAccountBalances();

    const currentAccountBalanceIndex = _findAccountBalanceIndex(
      currentAccountBalance.value?.id as number
    );
    if (currentAccountBalance.value?.id && currentAccountBalanceIndex !== -1) {
      currentAccountBalance.value = accountBalances.value[currentAccountBalanceIndex];
    }
    _setLoading(false);
  }
  async function loadAccountBalanceById(id: number) {
    _setLoading(true);

    const accountBalanceIndex = _findAccountBalanceIndex(id);
    if (accountBalanceIndex > -1) {
      currentAccountBalance.value = accountBalances.value[accountBalanceIndex];
    } else {
      const fetchedAccountBalance = await fetchAccountBalanceById(id);
      accountBalances.value.push(fetchedAccountBalance);
      currentAccountBalance.value = fetchedAccountBalance;
    }

    _setLoading(false);
  }

  /* Account Summaries */
  const accountSummaries = computed(() => {
    const result: AccountSummary[] = [];
    accounts.value.forEach((account) => {
      const accountBalanceIndex = _findAccountBalanceIndex(account.id);
      if (accountBalanceIndex > -1) {
        const accountBalance = accountBalances.value[accountBalanceIndex];
        result.push(createAccountSummary(account, accountBalance));
      }
    });
    return result;
  });
  const currentAccountSummary = computed(() => {
    if (currentAccount.value && currentAccountBalance.value) {
      return createAccountSummary(currentAccount.value, currentAccountBalance.value);
    }
    return undefined;
  });

  function resetState() {
    accounts.value = [];
    currentAccount.value = null;
    accountBalances.value = [];
    currentAccountBalance.value = null;
  }

  return {
    loading,

    accounts,
    currentAccount,
    loadAccounts,
    loadAccountById,
    addAccount,
    editAccount,
    removeAccount,

    loadAccountBalances,
    loadAccountBalanceById,

    accountSummaries,
    currentAccountSummary,

    resetState
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot));
}
