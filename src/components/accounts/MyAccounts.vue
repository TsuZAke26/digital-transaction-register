<template>
  <div class="space-y-8">
    <div v-for="accountType in ACCOUNT_TYPES" :key="accountType">
      <div class="text-2xl font-bold">{{ accountType }}</div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="account in accountSummariesByType(
            accountType as Database['public']['Enums']['account_type']
          )"
          :key="account.id"
          :title="account.name"
          class="w-full border shadow-md cursor-pointer"
          @click="handleAccountCardClick(account.id)"
        >
          <template #body>
            <div class="flex flex-row items-start justify-between">
              <!-- Account Type -->
              <span class="text-sm font-light text-neutral-400">
                {{ account.accountType }}
              </span>

              <!-- Current Balance -->
              <div class="text-4xl font-bold text-end">
                {{ formatCurrency(account.balance) }}
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts';

import type { Database } from '@/types/supabase';
import { ACCOUNT_TYPES } from '@/types/ui-types';

import { formatCurrency } from '@/util/format-utils';

import Card from '@/components/daisy/Card.vue';

const accountsStore = useAccountsStore();
const { loadAccounts, loadAccountBalances, accountSummariesByType } = accountsStore;

await loadAccounts();
await loadAccountBalances();

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
