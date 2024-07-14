<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Path Breadcrumbs -->
      <!-- <div class="text-sm breadcrumbs">
        <ul>
          <li @click="$router.push({ name: 'home' })"><a>Home</a></li>
          <li @click="$router.push({ name: 'accounts' })"><a>Accounts</a></li>
          <li @click="$router.push({ name: 'account', params: { id: id } })">
            <a>{{ currentAccount?.name }}</a>
          </li>
          <li>Spending Report</li>
        </ul>
      </div> -->

      <!-- Spend Report card -->
      <div class="border card">
        <div class="card-body">
          <div class="card-title">{{ currentAccount?.name }} Spending Report</div>

          <Suspense>
            <AccountSpendReport :account-id="id" />
            <template #fallback>Loading spend report data...</template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import AccountSpendReport from '@/components/views/accounts/id/reports/AccountSpendReport.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { loadAccountById } = accountsStore;
const { currentAccount } = storeToRefs(accountsStore);

onMounted(async () => await loadAccountById(Number.parseInt(props.id)));
</script>
