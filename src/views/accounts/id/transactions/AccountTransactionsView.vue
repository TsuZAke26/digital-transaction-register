<template>
  <div>
    <Card class="border">
      <template #body>
        <div class="space-y-4">
          <!-- Transaction Date Range-->
          <div class="grid grid-cols-5 gap-4">
            <Input v-model="fromDate" class="col-span-2" placeholder="Start Date" type="date" />
            <Input v-model="toDate" class="col-span-2" placeholder="End Date" type="date" />
            <Button class="btn-secondary" @click="reloadTransactionsInDateRange"> Reload </Button>
          </div>

          <div class="w-full border border-1"></div>

          <!-- Transactions in Date Range -->
          <div>
            <!-- <div v-if="!filteredTransactions.length" class="text-center">
              No transactions in range
            </div> -->
            <div v-if="filteredTransactions.length > 0" class="flex flex-col space-y-2">
              <TransactionRow
                v-for="transaction in filteredTransactions"
                :transaction="transaction"
                :key="transaction.id"
              />
            </div>
            <div v-else class="flex flex-col space-y-2">
              <TransactionRow
                v-for="transaction in transactions"
                :transaction="transaction"
                :key="transaction.id"
              />
            </div>
          </div>

          <NewTransaction :account-id="accountId" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

import { useTransactionsStore } from '@/stores/transactions';

import { getThirtyDaysAgo, jsDateToSupabaseDate } from '@/util/date-utils';

import type { Database } from '@/types/supabase';

import Card from '@/components/daisy/Card.vue';
import Input from '@/components/daisy/Input.vue';
import Button from '@/components/daisy/Button.vue';
import TransactionRow from '@/components/transactions/TransactionRow.vue';
import NewTransaction from '@/components/transactions/NewTransaction.vue';

const route = useRoute();
const accountId = route.params.id as string;

const transactionsStore = useTransactionsStore();
const { transactions, transactionsByAccountInDateRange } = transactionsStore;

const fromDate = ref(jsDateToSupabaseDate(getThirtyDaysAgo(new Date())));
const toDate = ref(jsDateToSupabaseDate(new Date()));

const filteredTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
function reloadTransactionsInDateRange() {
  const fromAsDate = new Date(fromDate.value);
  const toAsDate = new Date(toDate.value);
  filteredTransactions.value = transactionsByAccountInDateRange(
    Number.parseInt(accountId),
    fromAsDate,
    toAsDate
  );
}
</script>
