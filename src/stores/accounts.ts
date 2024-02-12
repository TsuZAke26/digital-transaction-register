import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { AccountPreview } from '@/types/account-preview';

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews: Ref<AccountPreview[]> = ref([
    {
      id: 1,
      name: 'Sample Account 1',
      transactions: []
    },
    {
      id: 2,
      name: 'Sample Account 2',
      transactions: [
        {
          id: 1,
          accountId: 2,
          name: 'Withdrawal 1',
          date: '2024-02-10',
          amount: -15.49
        }
      ]
    },
    {
      id: 3,
      name: 'Sample Account 3',
      transactions: [
        {
          id: 1,
          accountId: 3,
          name: 'Deposit 1',
          date: '2024-02-14',
          amount: 5.99
        }
      ]
    }
  ]);

  return { accountPreviews };
});
