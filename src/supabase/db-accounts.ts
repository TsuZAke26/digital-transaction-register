import { anonClient } from './supabase-client';
import type { Accounts } from '@/types/db-tables';

import type { AccountPreview } from '@/types/account-preview';

export async function fetchAccountPreviews(): Promise<AccountPreview[]> {
  // try {
  //   const { data: accounts_data, error: accounts_error } = await anonClient
  //     .from('accounts')
  //     .select();
  //   if (accounts_error) {
  //     throw accounts_error;
  //   }

  //   return accounts_data.map((accountRow) => _transformToAccountPreview(accountRow));
  // } catch (error) {
  //   console.error(error);
  // }

  return [
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
  ];
}

function _transformToAccountPreview(accountRow: Accounts): AccountPreview {
  return {
    id: accountRow.id,
    name: accountRow.name,
    transactions: []
  };
}
