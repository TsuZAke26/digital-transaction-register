import type { Accounts } from '@/types/supabase/db-tables';
import type { AccountPreview } from '@/types/ui/account-preview';

export function _transformToAccountPreview(accountRow: Accounts): AccountPreview {
  return {
    id: accountRow.id,
    name: accountRow.name,
    transactions: []
  };
}
