<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Account Summary card -->
      <div class="border card">
        <div class="card-body">
          <Suspense>
            <AccountSummaryRenderer :id="id" />

            <template #fallback>
              <div>Loading account summary...</div>
            </template>
          </Suspense>
        </div>
      </div>

      <!-- Transactions Preview card -->
      <div class="border card">
        <div class="card-body">
          <div class="flex justify-between card-title">
            Transactions
            <button @click="handleShowAddTransactionModal" class="btn btn-sm btn-primary">
              Add Transaction
            </button>
          </div>

          <Suspense>
            <TransactionsListRenderer :id="id" />

            <template #fallback>
              <div>Loading recent transactions...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
  <AddTransactionModal :account-id="id" />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';

import { useTransactionsStore } from '@/stores/transactions';

import AddTransactionModal from '@/components/modals/AddTransactionModal.vue';
import AccountSummaryRenderer from '@/components/views/accounts/id/AccountSummaryRenderer.vue';
import TransactionsListRenderer from '@/components/views/accounts/id/TransactionsListRenderer.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});

const transactionsStore = useTransactionsStore();
const { resetState } = transactionsStore;

let addTransactionDialogEl: HTMLElement | null;
function handleShowAddTransactionModal() {
  if (addTransactionDialogEl instanceof HTMLDialogElement) {
    addTransactionDialogEl.showModal();
  }
}

onBeforeMount(() => resetState());

onMounted(() => {
  addTransactionDialogEl = document.getElementById('modal-add-transaction');
});
</script>
