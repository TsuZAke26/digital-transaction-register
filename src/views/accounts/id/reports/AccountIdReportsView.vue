<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">Account {{ id }} Spending</div>
    <div>
      <div v-if="spendReport.length > 0" class="overflow-x-auto border">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-right">Total</th>
              <th class="text-right">Spend %</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reportItem, index) in spendReport" :key="index">
              <td>{{ reportItem.name }}</td>
              <td class="text-right">{{ formatAmount(reportItem.total) }}</td>
              <td class="text-right">{{ reportItem.percentage }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { fetchTransactionsByAccountIdForDateRange } from '@/api/supabase/db-transactions';

import type { SpendReportItem } from '@/types/ui-types';

import { generateSpendReport } from '@/util/spending-report-utils';
import { formatAmount } from '@/util/format-utils';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const spendReport: Ref<SpendReportItem[]> = ref([]);

fetchTransactionsByAccountIdForDateRange(
  Number.parseInt(props.id),
  '2013-01-01',
  '2013-12-31'
).then((data) => {
  spendReport.value = generateSpendReport(data);
});
</script>
