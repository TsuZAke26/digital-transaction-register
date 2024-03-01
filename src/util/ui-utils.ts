import type { Database } from '@/types/supabase';

export function createAccountSummary(
  account: Database['public']['Tables']['accounts']['Row'],
  accountBalance: Database['public']['Views']['account_balance']['Row']
) {
  return {
    id: account.id,
    name: account.name,
    accountType: account.account_type,
    balance: accountBalance.balance as number
  };
}
