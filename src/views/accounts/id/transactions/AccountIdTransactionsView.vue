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

    <!-- Account Summary card -->
    <Suspense>
      <AccountSummaryRenderer :id="id" />

      <template #fallback>
        <div class="border card">
          <div class="card-body">Loading account summary...</div>
        </div>
      </template>
    </Suspense>

    <!-- Import Transactions card -->
    <ImportTransactions :accountId="id" />

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
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import AccountSummaryRenderer from '@/components/views/accounts/id/AccountSummaryRenderer.vue';
import ImportTransactions from '@/components/views/accounts/id/transactions/ImportTransactions.vue';
import FilteredTransactions from '@/components/views/accounts/id/transactions/FilteredTransactions.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { currentAccount } = storeToRefs(accountsStore);
const { loadAccountById } = accountsStore;

onMounted(async () => await loadAccountById(Number.parseInt(props.id)));
</script>
