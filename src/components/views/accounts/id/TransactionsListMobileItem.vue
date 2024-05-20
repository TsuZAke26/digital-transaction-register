<template>
  <div class="px-4 py-2 space-y-2 border rounded-lg cursor-pointer" @click="handleTransactionClick">
    <!-- Name & amount -->
    <div class="flex items-start justify-between">
      <div class="text-sm font-medium truncate">{{ transaction.name }}</div>
      <div class="font-bold text-md" :class="styleAmount(transaction.amount)">
        {{ formatAmount(transaction.amount) }}
      </div>
    </div>

    <!-- Date & category -->
    <div class="flex items-center justify-between">
      <div class="text-sm badge badge-secondary">{{ transaction.category }}</div>
      <div class="text-sm font-medium">{{ formatTransactionDate(transaction.date) }}</div>
    </div>
  </div>

  <EditTransactionModal :transaction="transaction" />
</template>

<script setup lang="ts">
import { type PropType, onMounted } from 'vue';

import type { Database } from '@/types/supabase';

import { formatTransactionDate, formatAmount, styleAmount } from '@/util/format-utils';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';

const props = defineProps({
  transaction: {
    type: Object as PropType<Database['public']['Tables']['transactions']['Row']>,
    required: true
  }
});

let editTransactionDialogEl: HTMLElement | null;
function handleTransactionClick() {
  if (editTransactionDialogEl instanceof HTMLDialogElement) {
    editTransactionDialogEl.showModal();
  }
}

onMounted(() => {
  editTransactionDialogEl = document.getElementById(
    `modal-edit-transaction-${props.transaction.id}`
  );
});
</script>
