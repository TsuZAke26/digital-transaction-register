<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Account Balance card -->
      <div class="p-4 border rounded-xl">
        <div class="flex flex-row items-center justify-between">
          <div class="font-semibold truncate">{{ currentAccount?.name }}</div>
          <div
            v-if="currentAccountSummary"
            :class="styleAmount(currentAccountSummary?.balance)"
            class="text-2xl font-semibold"
          >
            {{ formatAmount(currentAccountSummary?.balance) }}
          </div>
        </div>
      </div>

      <!-- Latest Transactions card -->
      <div v-if="$route.name === 'account'" class="border card">
        <div class="card-body">
          <div class="flex flex-row items-center justify-between card-title">
            <span>Latest Transactions</span>

            <button
              @click="$router.push({ name: 'account-transactions', params: { id } })"
              class="btn btn-sm btn-ghost"
            >
              View All
            </button>
          </div>
          <Suspense>
            <AccountIdLatestTransactions :account-id="id" />
            <template #fallback> Loading latest transactions... </template>
          </Suspense>
        </div>
      </div>

      <!-- Account Sub-View container -->
      <div class="mb-16 md:mb-0">
        <RouterView />
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AddTransactionModal :account-id="id" />
  <EditAccountModal v-if="currentAccount" :account="currentAccount" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import { formatAmount, styleAmount } from '@/util/format-utils';

import AddTransactionModal from '@/components/modals/AddTransactionModal.vue';
import EditAccountModal from '@/components/modals/EditAccountModal.vue';
import AccountIdLatestTransactions from '@/components/views/accounts/id/AccountIdLatestTransactions.vue';

// import LatestTransactions from '@/components/views/accounts/id/LatestTransactions.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(props.id);

const accountsStore = useAccountsStore();
const { currentAccount, currentAccountSummary } = storeToRefs(accountsStore);
const { loadAccountById, loadAccountBalanceById } = accountsStore;

loadAccountById(idAsNumber);
loadAccountBalanceById(idAsNumber);

function handleShowAddTransactionModal() {
  const addTransactionDialogEl: HTMLElement | null =
    document.getElementById('modal-add-transaction');
  if (addTransactionDialogEl instanceof HTMLDialogElement) {
    addTransactionDialogEl.showModal();
  }
}
</script>
