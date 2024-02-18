import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';

import type { AccountPreview } from '@/types/ui/account-preview';
import type { Accounts } from '@/types/supabase/db-tables';
import type { NewAccount } from '@/types/ui/accounts';
import { fetchAccountPreviews, fetchAccounts, insertAccount } from '@/supabase/db-accounts';

// import { useProgress } from '@/composables/progress';

const toast = useToast();
// const { startGradualProgress, stopGradualProgress } = useProgress();

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews: Ref<AccountPreview[]> = ref([]);
  async function getAccountPreviews() {
    // startGradualProgress();
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
    // stopGradualProgress();
  }

  const accounts: Ref<Accounts[]> = ref([]);
  async function getAccounts() {
    const fetchedAccounts = await fetchAccounts();
    fetchedAccounts.forEach((fetchedAccount) => {
      if (!accounts.value.find((existingAccount) => existingAccount.id === fetchedAccount.id)) {
        accounts.value.push(fetchedAccount);
      }
    });
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

  return { accountPreviews, getAccountPreviews, accounts, getAccounts, addAccount };
});
