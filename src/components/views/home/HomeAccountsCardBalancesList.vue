<template>
  <div class="space-y-4">
    <div v-if="loaded && accountBalances.length === 0">No accounts found</div>
    <div v-else>
      <AccountBalanceSmall
        v-for="accountBalance in accountBalances"
        :key="accountBalance.id as number"
        :name="accountBalance.name as string"
        :balance="accountBalance.balance as number"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import AccountBalanceSmall from '@/components/views/home/AccountBalanceSmall.vue';

const accountsStore = useAccountsStore();
const { accountBalances, loadAccountBalances } = accountsStore;

const loaded = ref(false);
await loadAccountBalances().then(() => {
  loaded.value = true;
  console.log('Account loading completed');
});
</script>
