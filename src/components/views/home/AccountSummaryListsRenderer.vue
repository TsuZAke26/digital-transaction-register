<template>
  <div class="space-y-4">
    <div v-if="loaded && accountSummaries.length > 0" class="space-y-2">
      <div v-for="accountSummary in accountSummaries.slice(0, 4)" :key="accountSummary.id">
        <AccountSummarySmall
          :name="accountSummary.name"
          :balance="accountSummary.balance"
          :id="accountSummary.id"
        />
      </div>
    </div>
    <div v-else-if="loaded && accountSummaries.length === 0"></div>
    <div v-else>No accounts found</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import AccountSummarySmall from '@/components/views/home/AccountSummarySmall.vue';

const accountsStore = useAccountsStore();
const { accountSummaries } = storeToRefs(accountsStore);
const { loadAccounts, loadAccountBalances } = accountsStore;

const loaded = ref(false);
await loadAccounts();
await loadAccountBalances().then(() => {
  loaded.value = true;
});
</script>
