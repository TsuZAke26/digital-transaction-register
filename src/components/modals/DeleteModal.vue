<template>
  <dialog id="modal-delete" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <!-- Modal Title -->
      <h3 class="text-xl font-bold">Delete {{ type }}</h3>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

const props = defineProps({
  accountId: {
    type: Number
  },
  transactionId: {
    type: Number
  }
});

const accountsStore = useAccountsStore();
const { deleteAccount } = accountsStore;

const transactionsStore = useTransactionsStore();
const { deleteTransaction } = transactionsStore;

const type = computed(() => {
  const accountId = toRef(props, 'accountId');
  const transactionId = toRef(props, 'transactionId');

  return accountId.value ? 'Account' : transactionId.value ? 'Transaction' : '';
});
</script>
