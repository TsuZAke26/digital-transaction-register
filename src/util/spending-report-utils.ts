import type { Database } from '@/types/supabase';
import type { SpendReportItem } from '@/types/ui-types';
import { sortSpendReportItemsByPercentDesc } from './sort-utils';

function _findSpendReportItemByCategory(items: SpendReportItem[], category: string) {
  return items.findIndex((spendReportItem) => category === spendReportItem.name);
}

function _calculateSpendPercent(categoryTotal: number, spendTotal: number) {
  const percentRaw = categoryTotal / spendTotal;
  const percentPrecision4 = percentRaw.toPrecision(4);
  const percentPrecisionFloat = Number.parseFloat(percentPrecision4);
  const percentConverted = (percentPrecisionFloat * 100).toFixed(2);
  return Number.parseFloat(percentConverted);
}

export function generateSpendReport(
  transactions: Database['public']['Tables']['transactions']['Row'][],
  include: 'positive' | 'negative' | 'both' = 'negative'
) {
  let transactionTotal = 0;
  const result: SpendReportItem[] = [];

  transactions
    .filter((transaction) => {
      if (include === 'positive') {
        return transaction.amount > 0;
      } else if (include === 'negative') {
        return transaction.amount < 0;
      } else {
        return transaction;
      }
    })
    .forEach((transaction) => {
      const transactionAmountAbs = Math.abs(transaction.amount);
      const spendReportItemName = transaction.category as string;

      transactionTotal += transactionAmountAbs;

      const spendReportItemIndex = _findSpendReportItemByCategory(result, spendReportItemName);
      if (spendReportItemIndex !== -1) {
        result[spendReportItemIndex].total += transactionAmountAbs;
      } else {
        const newSpendReportItem: SpendReportItem = {
          name: transaction.category as string,
          total: transactionAmountAbs,
          percentage: 0
        };
        result.push(newSpendReportItem);
      }
    });

  result.forEach((spendReportItem) => {
    spendReportItem.total = Number.parseFloat(spendReportItem.total.toFixed(2));
    spendReportItem.percentage = _calculateSpendPercent(spendReportItem.total, transactionTotal);
  });

  // console.log(result.sort(sortSpendReportItemsByPercentDesc));

  return result.sort(sortSpendReportItemsByPercentDesc);
}
