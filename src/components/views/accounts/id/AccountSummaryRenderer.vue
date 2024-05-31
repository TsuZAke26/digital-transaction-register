<template>
  <div v-if="currentAccountSummary" class="border card">
    <div class="card-body">
      <div
        v-if="currentAccountSummary"
        id="account-summary-renderer"
        class="flex flex-wrap justify-between"
      >
        <div>
          <div class="font-semibold">{{ currentAccountSummary.name }}</div>
          <div class="text-sm">{{ currentAccountSummary.accountType }}</div>
        </div>

        <div :class="styleAmount(currentAccountSummary.balance)" class="text-2xl font-semibold">
          {{ formatAmount(currentAccountSummary.balance) }}
        </div>
      </div>

      <div class="justify-end card-actions">
        <button
          :disabled="!currentAccountSummary"
          @click="handleShowEditAccountModal"
          type="button"
          class="btn btn-sm btn-secondary"
        >
          Edit Account
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { storeToRefs } from 'pinia';

import { useAccountsStore } from '@/stores/accounts';

import { formatAmount, styleAmount } from '@/util/format-utils';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(toRef(props, 'id').value);

const accountsStore = useAccountsStore();
const { currentAccountSummary } = storeToRefs(accountsStore);
const { loadAccountById, loadAccountBalanceById } = accountsStore;

function handleShowEditAccountModal() {
  const editAccountDialogEl: HTMLElement | null = document.getElementById('modal-edit-account');
  if (editAccountDialogEl instanceof HTMLDialogElement) {
    editAccountDialogEl.showModal();
  }
}

await loadAccountById(idAsNumber);
await loadAccountBalanceById(idAsNumber);
</script>
