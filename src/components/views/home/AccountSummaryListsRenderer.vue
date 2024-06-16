<template>
  <div class="space-y-4">
    <div v-if="!loading && accountSummaries.length > 0" class="space-y-2">
      <div v-for="accountSummary in accountSummaries.slice(0, 4)" :key="accountSummary.id">
        <AccountSummarySmall
          :name="accountSummary.name"
          :balance="accountSummary.balance"
          :id="accountSummary.id"
        />
      </div>
    </div>
    <div v-else-if="!loading && accountSummaries.length === 0"></div>
    <div v-else>No accounts found</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import AccountSummarySmall from '@/components/accounts/AccountSummarySmall.vue';

const accountsStore = useAccountsStore();
const { loading, accountSummaries } = storeToRefs(accountsStore);
const { loadAccounts, loadAccountBalances } = accountsStore;

await loadAccounts();
await loadAccountBalances();
</script>
