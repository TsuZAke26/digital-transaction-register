<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <!-- Path Breadcrumbs -->
    <div class="text-sm breadcrumbs">
      <ul>
        <li @click="$router.push({ name: 'home' })"><a>Home</a></li>
        <li>Accounts</li>
      </ul>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold">All Accounts</div>
        <button
          class="text-lg btn btn-md btn-secondary"
          @click="handleShowAddAccountModal"
          type="button"
        >
          Add New Account
        </button>
      </div>

      <!-- Checking -->
      <CollapsibleAccountSummaries
        :summaries="summariesByAccountType('Checking')"
        :loading="loading"
        title="Checking"
      />

      <!-- Savings -->
      <CollapsibleAccountSummaries
        :summaries="summariesByAccountType('Savings')"
        :loading="loading"
        title="Savings"
      />

      <!-- Credit Line -->
      <CollapsibleAccountSummaries
        :summaries="summariesByAccountType('Credit Line')"
        :loading="loading"
        title="Credit Line"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import type { Database } from '@/types/supabase';

import CollapsibleAccountSummaries from '@/components/views/accounts/CollapsibleAccountSummaries.vue';

const accountsStore = useAccountsStore();
const { loading, accountSummaries } = storeToRefs(accountsStore);
const { loadAccounts, loadAccountBalances } = accountsStore;

const summariesByAccountType = computed(() => {
  return (type: Database['public']['Enums']['account_type']) => {
    return accountSummaries.value.filter((accountSummary) => {
      return type === accountSummary.accountType;
    });
  };
});

function handleShowAddAccountModal() {
  const addAccountDialogEl = document.getElementById('modal-add-account');
  if (addAccountDialogEl instanceof HTMLDialogElement) {
    addAccountDialogEl.showModal();
  }
}

loadAccounts().then(async () => {
  await loadAccountBalances();
});

onMounted(() => {
  const checkingCollapsibleCheckbox = document.getElementById(
    'accounts-collapsible-checking-checkbox'
  );
  if (checkingCollapsibleCheckbox instanceof HTMLInputElement) {
    checkingCollapsibleCheckbox.click();
  }
});
</script>
