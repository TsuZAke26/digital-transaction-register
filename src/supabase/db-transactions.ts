import type { NewTransaction } from '@/types/ui/transaction';
import { anonClient } from './supabase-client';
import type { Transactions } from '@/types/supabase/db-tables';

export async function fetchTransactionsByAccountId(accountId: number) {
  try {
    const { data: transactions_data, error: transactions_error } = await anonClient
      .from('transactions')
      .select()
      .eq('account_id', accountId);
    if (transactions_error) {
      throw transactions_error;
    }
    return transactions_data as Transactions[];
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
        account_id: data.accountId
      })
      .select();
    if (transactions_error) {
      throw transactions_error;
    }

    return transactions_data[0] as Transactions;
  } catch (error) {
    console.error('Add Account Error: ', error);
  }
}
