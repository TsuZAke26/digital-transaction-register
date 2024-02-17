<template>
  <div v-if="accountPreviews.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card
      v-for="preview in accountPreviews"
      :key="preview.id"
      :title="preview.name"
      class="w-full border shadow-none cursor-pointer"
      @click="handleAccountCardClick(preview.id)"
    >
      <template #body>
        <div v-if="preview.transactions.length" class="flex flex-col gap-4">
          <div
            v-for="transaction in preview.transactions"
            :key="transaction.id"
            class="flex flex-row items-center justify-between font-medium text-gray-500 text-md"
          >
            <div class="flex flex-row gap-2">
              <span>{{ formatDate(transaction.date) }}</span>
              <span>{{ transaction.name }}</span>
            </div>

            <span :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'">
              {{ formatAmount(transaction.amount) }}
            </span>
          </div>
        </div>
        <div v-else>No transactions yet</div>
      </template>
    </Card>
  </div>
  <div v-else class="text-xl font-semibold text-center">No accounts exist yet :(</div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';

import { formatDate, formatAmount } from '@/util/transaction-utils';

import Card from '@/components/daisy/Card.vue';

const accountsStore = useAccountsStore();
const { accountPreviews, getAccountPreviews } = accountsStore;

setTimeout(async () => {
  await getAccountPreviews();
}, 3000);

const handleAccountCardClick = (accountId: number) => {
  console.log(`Account id: ${accountId}`);
};
</script>
