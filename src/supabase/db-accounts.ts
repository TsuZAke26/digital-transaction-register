import { anonClient } from './supabase-client';
import type { Accounts } from '@/types/supabase/db-tables';
import type { AccountPreview } from '@/types/ui/account-preview';

export async function fetchAccountPreviews(): Promise<AccountPreview[]> {
  // try {
  //   const { data: accounts_data, error: accounts_error } = await anonClient
  //     .from('accounts')
  //     .select('id, name, account_type');
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

export async function fetchAccounts(): Promise<Accounts[]> {
  // let result: Accounts[] = [];
  // try {
  //   const { data: accounts_data, error: accounts_error } = await anonClient
  //     .from('accounts')
  //     .select();
  //   if (accounts_error) {
  //     throw accounts_error;
  //   }
  //   result = accounts_data;
  // } catch (error) {
  //   console.error(error);
  // }
  // return result;

  return [
    {
      account_type: 'Checking',
      balance: 1.23,
      created_at: '2024-02-16',
      id: 1,
      name: 'Checking Account 1',
      user_id: '21476b83-c5fa-4cfc-8f16-05cfce647538'
    }
  ];
}
