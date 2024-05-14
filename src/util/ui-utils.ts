import type { Database } from '@/types/supabase';
import type { AccountSummary } from '@/types/ui-types';

export function createAccountSummary(
  account: Database['public']['Tables']['accounts']['Row'],
  accountBalance: Database['public']['Views']['account_balance']['Row']
): AccountSummary {
  return {
    id: account.id,
    name: account.name,
    accountType: account.account_type,
    balance: accountBalance.balance as number
  };
}
