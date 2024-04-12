<template>
  <div class="flex flex-col gap-8">
    <!-- Account Info card -->
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
        <div class="text-lg font-semibold">Spend Graph for 2024-03</div>
      </template>
    </Card>

    <!-- Account Transactions card -->
    <Card title="Transactions" class="w-full border shadow-md">
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
</script>
