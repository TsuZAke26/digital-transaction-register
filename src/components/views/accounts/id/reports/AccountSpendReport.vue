<template>
  <!-- Report Date Range Controls -->
  <form @submit.prevent="generateSpendReportForDateRange" class="flex flex-wrap gap-4">
    <input
      id="account-spend-report-filters-start-date"
      v-model="startDate"
      class="flex-grow input input-bordered"
      type="date"
      required
    />

    <input
      id="account-spend-report-filters-end-date"
      v-model="endDate"
      class="flex-grow input input-bordered"
      type="date"
      required
    />
    <button type="submit" class="flex-grow btn btn-primary">Generate</button>
  </form>

  <div class="w-full my-4 border"></div>

  <div v-if="!loading && spendReport?.length > 0">
    <div class="overflow-x-auto border">
      <table class="table table-sm table-zebra">
        <thead>
          <tr>
            <th>Category</th>
            <th class="text-right">Total</th>
            <th class="text-right">% Spend</th>
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
  <div v-else-if="loading">Generating spend report...</div>
  <div v-else>
    No transactions loaded within date range
    <span v-if="startDate && endDate">{{ startDate }} to {{ endDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

import { fetchTransactionsByAccountIdForDateRange } from '@/api/supabase/db-transactions';

import { useTransactionsStore } from '@/stores/transactions';

import type { SpendReportItem } from '@/types/ui-types';

import {
  firstDayOfMonth,
  getThirtyDaysAgoFromDateString,
  jsDateToSupabaseDate
} from '@/util/date-utils';
import { formatAmount } from '@/util/format-utils';
import { generateSpendReport } from '@/util/spending-report-utils';
import { REGEX_DATE_FORMAT } from '@/util/regex';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});

const transactionsStore = useTransactionsStore();
const { transactionsDesc } = storeToRefs(transactionsStore);

const loading = ref(false);

const startDate = ref('');
const endDate = ref('');
function setInitialDates() {
  if (transactionsDesc.value.length > 0) {
    const endAsDateStr = transactionsDesc.value[0].date;
    const startAsDate = getThirtyDaysAgoFromDateString(endAsDateStr);
    if (startAsDate) {
      const startAsDateStr = jsDateToSupabaseDate(startAsDate);
      startDate.value = startAsDateStr;
      endDate.value = endAsDateStr;
    }
  } else {
    const endAsDateStr = jsDateToSupabaseDate(new Date());
    const startAsDateStr = firstDayOfMonth(endAsDateStr);

    startDate.value = startAsDateStr;
    endDate.value = endAsDateStr;
  }
}

const spendReport: Ref<SpendReportItem[] | undefined> = ref(undefined);
async function generateSpendReportForDateRange() {
  loading.value = true;

  if (REGEX_DATE_FORMAT.test(startDate.value) && REGEX_DATE_FORMAT.test(endDate.value)) {
    const transactionsForDateRange = await fetchTransactionsByAccountIdForDateRange(
      Number.parseInt(props.accountId),
      startDate.value,
      endDate.value
    );
    spendReport.value = generateSpendReport(transactionsForDateRange);
  }

  loading.value = false;
}

setInitialDates();
await generateSpendReportForDateRange();
</script>
