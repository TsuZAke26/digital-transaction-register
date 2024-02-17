<template>
  <div v-if="accounts.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card
      v-for="account in accounts"
      :key="account.id"
      :title="account.name"
      class="w-full border shadow-none cursor-pointer"
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
            {{ formatBalance(account.balance) }}
          </span>
        </div>
      </template>
    </Card>
  </div>
  <div v-else class="text-xl font-semibold text-center">No accounts exist yet :(</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts';
import { formatBalance } from '@/util/account-utils';

import Card from '@/components/daisy/Card.vue';

const router = useRouter();

const accountsStore = useAccountsStore();
const { accounts, getAccounts } = accountsStore;

setTimeout(async () => {
  await getAccounts();
}, 3000);

const handleAccountCardClick = (accountId: number) => {
  router.push({
    name: 'account',
    params: {
      id: accountId
    }
  });
};
</script>
