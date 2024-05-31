import type { Database } from '@/types/supabase';
import type { SpendReportItem } from '@/types/ui-types';

export function sortTransactionsDesc(
  a: Database['public']['Tables']['transactions']['Row'],
  b: Database['public']['Tables']['transactions']['Row']
) {
  if (a.date < b.date) return 1;
  else if (a.date > b.date) return -1;
  else {
    if (a.created_at < b.created_at) return 1;
    else if (a.created_at > b.created_at) return -1;
    return 0;
  }
}

export function sortSpendReportItemsByPercentDesc(a: SpendReportItem, b: SpendReportItem) {
  if (a.percentage < b.percentage) return 1;
  else if (a.percentage > b.percentage) return -1;
  else return 0;
}
