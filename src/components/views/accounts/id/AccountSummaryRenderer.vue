<template>
  <div v-if="summary" class="border card">
    <div class="card-body">
      <div v-if="summary" id="account-summary-renderer" class="flex flex-wrap justify-between">
        <div>
          <div class="font-semibold">{{ summary.name }}</div>
          <div class="text-sm">{{ summary.accountType }}</div>
        </div>

        <div :class="styleAmount(summary.balance)" class="text-2xl font-semibold">
          {{ formatAmount(summary.balance) }}
        </div>
      </div>

      <div class="justify-end card-actions">
        <button
          :disabled="!summary"
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
import { computed, type ComputedRef, toRef } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import { formatAmount, styleAmount } from '@/util/format-utils';

import type { AccountSummary } from '@/types/ui-types';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(toRef(props, 'id').value);

const accountsStore = useAccountsStore();
const { loadAccountById, loadAccountBalanceById, getAccountSummary } = accountsStore;

const summary: ComputedRef<AccountSummary | undefined> = computed(() => {
  return getAccountSummary(idAsNumber);
});

function handleShowEditAccountModal() {
  const editAccountDialogEl: HTMLElement | null = document.getElementById('modal-edit-account');
  if (editAccountDialogEl instanceof HTMLDialogElement) {
    editAccountDialogEl.showModal();
  }
}

await loadAccountById(idAsNumber);
await loadAccountBalanceById(idAsNumber);
</script>
