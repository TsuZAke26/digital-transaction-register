import { anonClient } from '../../supabase/anon-client';

import type { NewTransaction } from '@/types/ui-types';

export async function fetchTransactionsByAccountIdForDateRange(
  accountId: number,
  from: String,
  to: String
) {
  try {
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
  } catch (error) {
    console.error('Fetch Transactions by Date Range Error: ', error);
  }
}

export async function fetchTransactionsByAccountId(accountId: number) {
  try {
    const { data: transactions_data, error: transactions_error } = await anonClient
      .from('transactions')
      .select()
      .eq('account_id', accountId);
    if (transactions_error) {
      throw transactions_error;
    }
    return transactions_data;
  } catch (error) {
    console.error('Fetch Transactions Error: ', error);
  }
}

export async function insertTransaction(data: NewTransaction) {
  try {
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
  } catch (error) {
    console.error('Add Transaction Error: ', error);
  }
}
