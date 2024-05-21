<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Account Summary card -->
      <Suspense>
        <AccountSummaryRenderer :id="id" />

        <template #fallback>
          <div class="border card">
            <div class="card-body">Loading account summary...</div>
          </div>
        </template>
      </Suspense>

      <!-- Transactions Preview card -->
      <div class="border card">
        <div class="card-body">
          <div class="flex justify-between card-title">
            Transactions
            <div
              class="flex items-center text-sm cursor-pointer"
              @click="$router.push({ name: 'account-transactions' })"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </div>
          </div>

          <Suspense>
            <LatestTransactions :account-id="id" />

            <template #fallback>
              <div>Loading recent transactions...</div>
            </template>
          </Suspense>

          <div class="justify-end card-actions">
            <button @click="handleShowAddTransactionModal" class="btn btn-sm btn-primary">
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <AddTransactionModal :account-id="id" />
  <EditAccountModal v-if="account" :account="account" />
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import AddTransactionModal from '@/components/modals/AddTransactionModal.vue';
import EditAccountModal from '@/components/modals/EditAccountModal.vue';

import AccountSummaryRenderer from '@/components/views/accounts/id/AccountSummaryRenderer.vue';
import LatestTransactions from '@/components/views/accounts/id/LatestTransactions.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { getAccountFromStore } = accountsStore;

const transactionsStore = useTransactionsStore();
const { resetState } = transactionsStore;

const account = computed(() => getAccountFromStore(Number.parseInt(props.id)));

function handleShowAddTransactionModal() {
  const addTransactionDialogEl: HTMLElement | null =
    document.getElementById('modal-add-transaction');
  if (addTransactionDialogEl instanceof HTMLDialogElement) {
    addTransactionDialogEl.showModal();
  }
}

onBeforeMount(() => resetState());
</script>
