<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card
      v-for="accountBalance in accountBalances"
      :key="accountBalance.id as number"
      :title="accountBalance.name as string"
      class="w-full border shadow-md cursor-pointer"
      @click="handleAccountPreviewCardClick(accountBalance.id as number)"
    >
      <template #body>
        <div class="text-4xl font-bold text-end">
          {{ formatCurrency(accountBalance.balance as number) }}
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts';

import { formatCurrency } from '@/util/format-utils';

import Card from '@/components/daisy/Card.vue';

const accountsStore = useAccountsStore();
const { accountBalances, loadAccountBalances } = accountsStore;

await loadAccountBalances();

const router = useRouter();
const handleAccountPreviewCardClick = (accountId: number) => {
  router.push({
    name: 'account',
    params: {
      id: accountId
    }
  });
};
</script>
