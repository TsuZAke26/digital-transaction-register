import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import type { AccountPreview } from '@/types/ui/account-preview';
import type { Accounts } from '@/types/supabase/db-tables';
import type { NewAccount } from '@/types/ui/accounts';
import {
  fetchAccountById,
  fetchAccountPreviews,
  fetchAccounts,
  insertAccount
} from '@/supabase/db-accounts';

const toast = useToast();

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews: Ref<AccountPreview[]> = ref([]);
  async function getAccountPreviews() {
    const fetchedAccountPreviews = await fetchAccountPreviews();
    if (fetchedAccountPreviews) {
      fetchedAccountPreviews.forEach((fetchedAccountPreview) => {
        if (
          !accountPreviews.value.find(
            (existingPreview) => existingPreview.id === fetchedAccountPreview.id
          )
        ) {
          accountPreviews.value.push(fetchedAccountPreview);
        }
      });
    }
  }

  const accounts: Ref<Accounts[]> = ref([]);
  function findAccountInStore(id: number) {
    return accounts.value.find((storeAccount) => id === storeAccount.id);
  }
  async function getAccounts() {
    const fetchedAccounts = await fetchAccounts();
    fetchedAccounts.forEach((fetchedAccount) => {
      if (!accounts.value.find((existingAccount) => existingAccount.id === fetchedAccount.id)) {
        accounts.value.push(fetchedAccount);
      }
    });
  }
  async function getAccountById(id: number) {
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

  return {
    accountPreviews,
    getAccountPreviews,
    accounts,
    findAccountInStore,
    getAccounts,
    getAccountById,
    addAccount
  };
});
