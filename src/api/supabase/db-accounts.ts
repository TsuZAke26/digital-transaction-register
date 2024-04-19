import { anonClient } from '../../supabase/anon-client';
import type { NewAccount } from '@/types/ui-types';

export async function fetchAccountBalances() {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select(`id`);
    if (accounts_error) {
      throw accounts_error;
    }
    const accountIds = accounts_data.map((account) => account.id);

    const { data: account_balance_data, error: account_balance_error } = await anonClient
      .from('account_balance')
      .select()
      .in('id', accountIds);
    if (account_balance_error) {
      throw account_balance_error;
    }

    return account_balance_data;
  } catch (error) {
    console.error('Fetch Account Balances Error: ', error);
  }
}

export async function fetchAccountBalanceById(id: number) {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('account_balance')
      .select()
      .eq('id', id)
      .single();
    if (accounts_error) {
      throw accounts_error;
    }
    return accounts_data;
  } catch (error) {
    console.error('Fetch Account Balance by Id Error: ', error);
  }
}

export async function fetchAccounts() {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select();
    if (accounts_error) {
      throw accounts_error;
    }

    return accounts_data;
  } catch (error) {
    console.error('Fetch Accounts Error: ', error);
  }
}

export async function fetchAccountById(id: number) {
  try {
    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .select()
      .eq('id', id)
      .single();
    if (accounts_error) {
      throw accounts_error;
    }
    return accounts_data;
  } catch (error) {
    console.error('Fetch Account by Id Error: ', error);
  }
}

export async function insertAccount(data: NewAccount) {
  try {
    const userId = (await anonClient.auth.getSession()).data.session?.user.id;
    if (!userId) {
      throw new Error('User is not authenticated, abort new account creation');
    }

    const { data: accounts_data, error: accounts_error } = await anonClient
      .from('accounts')
      .insert({
        name: data.name,
        account_type: data.accountType,
        max_balance: data.maxBalance,
        user_id: userId
      })
      .select()
      .single();
    if (accounts_error) {
      throw accounts_error;
    }

    return accounts_data;
  } catch (error) {
    console.error('Add Account Error: ', error);
  }
}
