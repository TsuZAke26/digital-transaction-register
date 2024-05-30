<template>
  <div class="container max-w-5xl p-4 mx-auto">
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
        :summaries="accountSummariesByType('Checking')"
        :loaded="loaded"
        title="Checking"
      />

      <!-- Savings -->
      <CollapsibleAccountSummaries
        :summaries="accountSummariesByType('Savings')"
        :loaded="loaded"
        title="Savings"
      />

      <!-- Credit Line -->
      <CollapsibleAccountSummaries
        :summaries="accountSummariesByType('Credit Line')"
        :loaded="loaded"
        title="Credit Line"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import CollapsibleAccountSummaries from '@/components/views/accounts/CollapsibleAccountSummaries.vue';

const accountsStore = useAccountsStore();
const { accountSummariesByType } = storeToRefs(accountsStore);
const { loadAccounts, loadAccountBalances } = accountsStore;

function handleShowAddAccountModal() {
  const addAccountDialogEl = document.getElementById('modal-add-account');
  if (addAccountDialogEl instanceof HTMLDialogElement) {
    addAccountDialogEl.showModal();
  }
}

const loaded = ref(false);
loadAccounts().then(() => {
  loadAccountBalances().then(() => {
    loaded.value = true;
  });
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
