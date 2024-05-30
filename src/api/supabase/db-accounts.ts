import { anonClient } from '@/supabase/anon-client';

import type { Database } from '@/types/supabase';

export async function fetchAccountBalances() {
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
}

export async function fetchAccountBalanceById(id: number) {
  const { data: accounts_data, error: accounts_error } = await anonClient
    .from('account_balance')
    .select()
    .eq('id', id)
    .single();
  if (accounts_error) {
    throw accounts_error;
  }
  return accounts_data;
}

export async function fetchAccounts() {
  const { data: accounts_data, error: accounts_error } = await anonClient.from('accounts').select();
  if (accounts_error) {
    throw accounts_error;
  }

  return accounts_data;
}

export async function fetchAccountById(id: number) {
  const { data: accounts_data, error: accounts_error } = await anonClient
    .from('accounts')
    .select()
    .eq('id', id)
    .single();
  if (accounts_error) {
    throw accounts_error;
  }
  return accounts_data;
}

export async function insertAccount(data: Database['public']['Tables']['accounts']['Insert']) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort new account creation');
  }

  const { data: accounts_data, error: accounts_error } = await anonClient
    .from('accounts')
    .insert({
      name: data.name,
      account_type: data.account_type,
      max_balance: data.max_balance,
      user_id: userId
    })
    .select()
    .single();
  if (accounts_error) {
    throw accounts_error;
  }

  return accounts_data;
}

export async function updateAccount(
  id: number,
  data: Database['public']['Tables']['accounts']['Update']
) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort update account');
  }

  const { data: accounts_data, error: accounts_error } = await anonClient
    .from('accounts')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (accounts_error) {
    throw accounts_error;
  }

  return accounts_data;
}

export async function deleteAccount(id: number) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort delete account');
  }

  const { error: accounts_error } = await anonClient.from('accounts').delete().eq('id', id);
  if (accounts_error) {
    throw accounts_error;
  }
}
