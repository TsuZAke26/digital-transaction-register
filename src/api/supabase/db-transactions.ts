import { anonClient } from '@/supabase/anon-client';

import type { Database } from '@/types/supabase';

const QUERY_LIMIT = 1000;

export async function totalTransactions(accountId: number) {
  const { count: transactions_count, error: transactions_error } = await anonClient
    .from('transactions')
    .select('*', { count: 'exact', head: true })
    .eq('account_id', accountId);
  if (transactions_error) {
    throw transactions_error;
  }

  return transactions_count;
}

export async function readTransactionsByAccountId(accountId: number) {
  let result: Database['public']['Tables']['transactions']['Row'][] = [];

  const total = (await totalTransactions(accountId)) ?? 0;

  let currentPage = 1;
  const totalPages = Math.ceil(total / QUERY_LIMIT);
  while (currentPage <= totalPages) {
    const start = (currentPage - 1) * QUERY_LIMIT;
    const end = currentPage * QUERY_LIMIT;

    // console.log(`start: ${start}, end: ${end}, total: ${total}, totalPages: ${totalPages}`);

    const { data: transactions_data, error: transactions_error } = await anonClient
      .from('transactions')
      .select()
      .range(start, end)
      .eq('account_id', accountId)
      .order('date', { ascending: false });
    if (transactions_error) {
      throw transactions_error;
    }
    result = result.concat(transactions_data);
    currentPage += 1;
  }
  // console.log('all transctions', result);

  return result;
}

export async function readTransactionsByAccountIdWithLimit(accountId: number, limit: number) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .select()
    .eq('account_id', accountId)
    .order('date', { ascending: false })
    .limit(limit);
  if (transactions_error) {
    throw transactions_error;
  }
  return transactions_data;
}

export async function readTransactionsByAccountIdForDateRange(
  accountId: number,
  from: String,
  to: String
) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .select()
    .eq('account_id', accountId)
    .gte('date', from)
    .lte('date', to)
    .order('date', { ascending: false });
  if (transactions_error) {
    throw transactions_error;
  }
  return transactions_data;
}

export async function createTransaction(
  data: Database['public']['Tables']['transactions']['Insert']
) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .insert({
      name: data.name,
      date: data.date,
      amount: data.amount,
      category: data.category,
      account_id: data.account_id
    })
    .select()
    .single();
  if (transactions_error) {
    throw transactions_error;
  }

  return transactions_data;
}

export async function createTransactions(
  data: Database['public']['Tables']['transactions']['Insert'][]
) {
  const { data: transactions_data, error: transactions_error } = await anonClient
    .from('transactions')
    .insert(data)
    .select();
  if (transactions_error) {
    throw transactions_error;
  }

  return transactions_data;
}

export async function updateTransaction(
  id: number,
  data: Database['public']['Tables']['transactions']['Update']
) {
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
  const { error: transactions_error } = await anonClient.from('transactions').delete().eq('id', id);
  if (transactions_error) {
    throw transactions_error;
  }
}
