<template>
  <div class="flex flex-col gap-8">
    <!-- Account Name -->
    <div class="text-3xl font-bold text-center">{{ accountSummary?.name }}</div>

    <!-- Account Balance card -->
    <Card class="w-full border shadow-md">
      <template #body>
        <div class="flex items-start justify-between">
          <div class="text-xl font-semibold">Balance</div>
          <div class="text-4xl font-semibold">${{ accountSummary?.balance }}</div>
        </div>
      </template>
    </Card>

    <!-- Spend Breakdown card -->
    <Card class="w-full border shadow-md">
      <template #body>
        <div class="text-lg font-semibold">Spend Breakdown</div>
        <div ref="spendGraphPlotRef" class="w-full"></div>
      </template>
    </Card>

    <!-- Account Transactions card -->
    <Card title="Recent Transactions" class="w-full border shadow-md">
      <template #body>
        <div>
          <Suspense>
            <div class="space-y-4">
              <AccountTransactionsPreview :id="accountId" />
              <Button
                @click="$router.push({ name: 'account-transactions' })"
                class="btn-primary float-end"
              >
                View All Transactions
              </Button>
            </div>

            <template #fallback>
              <div class="font-medium text-md">Loading account transactions...</div>
            </template>
          </Suspense>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import Plotly, { type Data, type Layout } from 'plotly.js-dist-min';

import { useAccountsStore } from '@/stores/accounts';

import Card from '@/components/daisy/Card.vue';
import AccountData from '@/components/accounts/AccountData.vue';
import AccountTransactionsPreview from '@/components/transactions/AccountTransactionsPreview.vue';
import Button from '@/components/daisy/Button.vue';
import SkeletonCard from '@/components/app/SkeletonCard.vue';

const route = useRoute();
const accountId = route.params.id as string;

const accountsStore = useAccountsStore();
const { getAccountSummary } = accountsStore;
const accountSummary = computed(() => getAccountSummary(Number.parseInt(accountId)));

const spendGraphPlotRef: Ref<HTMLElement | null> = ref(null);
const data: Data[] = [
  {
    values: [19, 26, 55],
    labels: ['Residential', 'Non-Residential', 'Utility'],
    type: 'pie'
  }
];

const layout = {
  // title: 'Transactions for 2024-04',
  showlegend: true
};

onMounted(() => {
  Plotly.newPlot(spendGraphPlotRef.value as HTMLElement, data, layout, {
    editable: false,
    displayModeBar: false,
    staticPlot: true
  });
});
</script>
