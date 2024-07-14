<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <div class="text-xl font-bold text-center">Welcome, {{ displayName }}</div>

      <!-- Accounts List -->
      <AccountSummariesRenderer
        :loading="loading"
        :summaries="summariesByAccountType('Checking')"
        title="Checking"
      />

      <AccountSummariesRenderer
        :loading="loading"
        :summaries="summariesByAccountType('Savings')"
        title="Savings"
      />

      <AccountSummariesRenderer
        :loading="loading"
        :summaries="summariesByAccountType('Credit Line')"
        title="Credit Line"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';

import AccountSummariesRenderer from '@/components/views/accounts/AccountSummariesRenderer.vue';

const userStore = useUserStore();
const { displayName } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loading, accountSummaries } = storeToRefs(accountsStore);

const summariesByAccountType = computed(() => {
  return (type: Database['public']['Enums']['account_type']) => {
    return accountSummaries.value.filter((accountSummary) => {
      return type === accountSummary.accountType;
    });
  };
});
</script>
