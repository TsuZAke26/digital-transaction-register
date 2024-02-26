<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card
      v-for="account in accounts"
      :key="account.id"
      :title="account.name"
      class="w-full border shadow-md cursor-pointer"
      @click="handleAccountCardClick(account.id)"
    >
      <template #body>
        <div class="flex flex-row items-start justify-between">
          <!-- Account Type -->
          <span class="text-sm font-light text-neutral-400">
            {{ account.account_type }}
          </span>
          <!-- Current Balance -->
          <span
            class="text-3xl font-bold text-right"
            :class="account.balance < 0 ? 'text-red-500' : null"
          >
            {{ formatCurrency(account.balance) }}
          </span>
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
const { accounts, getAccounts } = accountsStore;

await getAccounts();

const router = useRouter();
const handleAccountCardClick = (accountId: number) => {
  router.push({
    name: 'account',
    params: {
      id: accountId
    }
  });
};
</script>
