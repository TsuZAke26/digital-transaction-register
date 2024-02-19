import { anonClient } from './supabase-client';
import type { Accounts } from '@/types/supabase/db-tables';
import type { AccountPreview } from '@/types/ui/account-preview';
import type { NewAccount } from '@/types/ui/accounts';
import { _transformToAccountPreview } from '@/util/supabase-utils';

export async function fetchAccountPreviews(): Promise<AccountPreview[] | undefined> {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select();
    if (accounts_error) {
      throw accounts_error;
    }

    return accounts_data.map((accountRow) =>
      _transformToAccountPreview(accountRow)
    ) as AccountPreview[];
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAccounts(): Promise<Accounts[]> {
  let result: Accounts[] = [];
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select();
    if (accounts_error) {
      throw accounts_error;
    }
    result = accounts_data;
  } catch (error) {
    console.error('Fetch Accounts Error: ', error);
  }
  return result;
}

export async function fetchAccountById(id: number): Promise<Accounts | undefined> {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select()
      .eq('id', id)
      .single();
    if (accounts_error) {
      throw accounts_error;
    }
    return accounts_data as Accounts;
  } catch (error) {
    console.error('Fetch Accounts Error: ', error);
  }
}

export async function insertAccount(data: NewAccount): Promise<Accounts | undefined> {
  try {
    const userId = (await anonClient.auth.getSession()).data.session?.user.id;
    if (!userId) {
      throw new Error('User is not authenticated, abort new account creartion');
    }

    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .insert({
        name: data.name,
        account_type: data.accountType,
        balance: 0,
        max_balance: data.maxBalance,
        user_id: userId
      })
      .select();
    if (accounts_error) {
      throw accounts_error;
    }

    return accounts_data[0] as Accounts;
  } catch (error) {
    console.error('Add Account Error: ', error);
  }
}
