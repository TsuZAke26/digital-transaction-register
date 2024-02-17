import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import type { AccountPreview } from '@/types/ui/account-preview';
import { fetchAccountPreviews, fetchAccounts } from '@/supabase/db-accounts';
import type { Accounts } from '@/types/supabase/db-tables';

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews: Ref<AccountPreview[]> = ref([]);
  async function getAccountPreviews() {
    const fetchedAccountPreviews = await fetchAccountPreviews();
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

  const accounts: Ref<Accounts[]> = ref([]);
  async function getAccounts() {
    const fetchedAccounts = await fetchAccounts();
    fetchedAccounts.forEach((fetchedAccount) => {
      if (!accounts.value.find((existingAccount) => existingAccount.id === fetchedAccount.id)) {
        accounts.value.push(fetchedAccount);
      }
    });
  }
  return { accountPreviews, getAccountPreviews, accounts, getAccounts };
});
