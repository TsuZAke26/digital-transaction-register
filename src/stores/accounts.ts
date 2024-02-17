import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import type { AccountPreview } from '@/types/account-preview';
import { fetchAccountPreviews } from '@/supabase/db-accounts';

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews: Ref<AccountPreview[]> = ref([]);
  async function getAccountPreviews() {
    const previews = await fetchAccountPreviews();
    previews.forEach((accountPreview) => {
      accountPreviews.value.push(accountPreview);
    });
  }

  return { accountPreviews, getAccountPreviews };
});
