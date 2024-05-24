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
      <div id="accounts-collapsible-checking" class="border bg-slate-300 collapse collapse-arrow">
        <input type="checkbox" id="accounts-collapsible-checking-checkbox" />
        <!-- Collapsible title -->
        <div class="text-xl font-semibold collapse-title">Checking</div>
        <!-- Collapsible content -->
        <div class="collapse-content">
          <!-- Checking account summaries -->
          <div v-if="loaded && accountSummariesByType('Checking').length > 0" class="space-y-2">
            <div
              v-for="accountSummary in accountSummariesByType('Checking')"
              :key="accountSummary.id"
            >
              <AccountSummarySmall
                :name="accountSummary.name"
                :balance="accountSummary.balance"
                :id="accountSummary.id"
                class="bg-white"
              />
            </div>
          </div>
          <div v-else-if="loaded && accountSummariesByType('Checking').length === 0">
            No checking accounts found
          </div>
          <div v-else>Loading checking accounts...</div>
        </div>
      </div>

      <!-- Savings -->
      <div class="border bg-slate-300 collapse collapse-arrow">
        <input type="checkbox" />
        <!-- Collapsible title -->
        <div class="text-xl font-semibold collapse-title">Savings</div>
        <!-- Collapsible content -->
        <div class="collapse-content">
          <!-- Checking account summaries -->
          <div v-if="loaded && accountSummariesByType('Savings').length > 0" class="space-y-2">
            <div
              v-for="accountSummary in accountSummariesByType('Savings')"
              :key="accountSummary.id"
            >
              <AccountSummarySmall
                :name="accountSummary.name"
                :balance="accountSummary.balance"
                :id="accountSummary.id"
                class="bg-white"
              />
            </div>
          </div>
          <div v-else-if="loaded && accountSummariesByType('Savings').length === 0">
            No savings accounts found
          </div>
          <div v-else>Loading savings accounts...</div>
        </div>
      </div>

      <!-- Credit Line -->
      <div class="border bg-slate-300 collapse collapse-arrow">
        <input type="checkbox" />
        <!-- Collapsible title -->
        <div class="text-xl font-semibold collapse-title">Credit Lines</div>
        <!-- Collapsible content -->
        <div class="collapse-content">
          <!-- Checking account summaries -->
          <div v-if="loaded && accountSummariesByType('Credit Line').length > 0" class="space-y-2">
            <div
              v-for="accountSummary in accountSummariesByType('Credit Line')"
              :key="accountSummary.id"
            >
              <AccountSummarySmall
                :name="accountSummary.name"
                :balance="accountSummary.balance"
                :id="accountSummary.id"
                class="bg-white"
              />
            </div>
          </div>
          <div v-else-if="loaded && accountSummariesByType('Credit Line').length === 0">
            No credit line accounts found
          </div>
          <div v-else>Loading credit line accounts...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import AccountSummarySmall from '@/components/views/home/AccountSummarySmall.vue';

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
