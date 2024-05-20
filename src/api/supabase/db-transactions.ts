import { anonClient } from '@/supabase/anon-client';

import type { Database } from '@/types/supabase';
import type { NewTransaction } from '@/types/ui-types';

export async function fetchTransactionsByAccountIdForDateRange(
  accountId: number,
  from: String,
  to: String
) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .select()
    .eq('account_id', accountId)
    .gte('date', from)
    .lte('date', to);
  if (transactions_error) {
    throw transactions_error;
  }
  return transactions_data;
}

export async function fetchTransactionsByAccountId(accountId: number) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .select()
    .eq('account_id', accountId);
  if (transactions_error) {
    throw transactions_error;
  }
  return transactions_data;
}

export async function insertTransaction(data: NewTransaction) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort new transaction creation');
  }

  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .insert({
      name: data.name,
      date: data.date,
      amount: data.amount,
      category: data.category,
      account_id: data.accountId
    })
    .select()
    .single();
  if (transactions_error) {
    throw transactions_error;
  }

  return transactions_data;
}

export async function updateTransaction(
  id: number,
  data: Database['public']['Tables']['transactions']['Update']
) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort update transaction');
  }

  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (transactions_error) {
    throw transactions_error;
  }

  return transactions_data;
}

export async function deleteTransaction(id: number) {
  const userId = (await anonClient.auth.getSession()).data.session?.user.id;
  if (!userId) {
    throw new Error('User is not authenticated, abort delete transaction');
  }

  const { error: transactions_error } = await anonClient.from('transactions').delete().eq('id', id);
  if (transactions_error) {
    throw transactions_error;
  }
}
