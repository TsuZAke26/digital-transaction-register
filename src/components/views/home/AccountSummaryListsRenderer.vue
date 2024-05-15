<template>
  <div class="space-y-4">
    <div v-if="loaded && accounts.length === 0">No accounts found</div>
    <div v-else class="space-y-8">
      <!-- Checking account summaries -->
      <div v-if="accountSummariesByType('Checking').length > 0" class="space-y-2">
        <div class="font-semibold text-md">Checking</div>
        <div v-for="accountSummary in accountSummariesByType('Checking')" :key="accountSummary.id">
          <AccountSummarySmall
            :name="accountSummary.name"
            :balance="accountSummary.balance"
            :id="accountSummary.id"
          />
        </div>
      </div>

      <!-- Savings account summaries -->
      <div v-if="accountSummariesByType('Savings').length > 0" class="space-y-2">
        <div class="font-semibold text-md">Savings</div>
        <div v-for="accountSummary in accountSummariesByType('Savings')" :key="accountSummary.id">
          <AccountSummarySmall
            :name="accountSummary.name"
            :balance="accountSummary.balance"
            :id="accountSummary.id"
          />
        </div>
      </div>

      <!-- Credit Line account summaries -->
      <div v-if="accountSummariesByType('Credit Line').length > 0" class="space-y-2">
        <div class="font-semibold text-md">Credit Line</div>
        <div
          v-for="accountSummary in accountSummariesByType('Credit Line')"
          :key="accountSummary.id"
        >
          <AccountSummarySmall
            :name="accountSummary.name"
            :balance="accountSummary.balance"
            :id="accountSummary.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAccountsStore } from '@/stores/accounts';

import AccountSummarySmall from '@/components/views/home/AccountSummarySmall.vue';

const accountsStore = useAccountsStore();
const { accounts, accountSummariesByType } = storeToRefs(accountsStore);
const { loadAccounts, loadAccountBalances } = accountsStore;

const loaded = ref(false);
await loadAccounts();
await loadAccountBalances().then(() => {
  loaded.value = true;
});
</script>
