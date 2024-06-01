<template>
  <div class="container max-w-5xl p-4 mx-auto space-y-4">
    <!-- Path Breadcrumbs -->
    <div class="text-sm breadcrumbs">
      <ul>
        <li @click="$router.push({ name: 'home' })"><a>Home</a></li>
        <li @click="$router.push({ name: 'accounts' })"><a>Accounts</a></li>
        <li @click="$router.push({ name: 'account', params: { id: id } })">
          <a>{{ currentAccount?.name }}</a>
        </li>
        <li>Transactions</li>
      </ul>
    </div>

    <!-- Import Transactions card -->
    <ImportTransactions :id="id" />

    <!-- Render All Transactions card -->
    <div class="border card">
      <div class="card-body">
        <div class="card-title">Transactions</div>
        <Suspense>
          <FilteredTransactions :account-id="id" />

          <template #fallback>Loading transactions...</template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import ImportTransactions from '@/components/views/accounts/id/transactions/ImportTransactions.vue';
import FilteredTransactions from '@/components/views/accounts/id/transactions/FilteredTransactions.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { currentAccount } = storeToRefs(accountsStore);
</script>
