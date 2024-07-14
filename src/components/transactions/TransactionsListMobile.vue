<template>
  <div class="space-y-2">
    <div
      v-for="transaction in transactions"
      :key="transaction.id"
      class="flex flex-row items-center gap-2 px-4 py-2 space-y-2 border rounded-lg"
    >
      <div class="w-11/12">
        <!-- Name & amount -->
        <div class="flex items-start justify-between">
          <div class="text-sm font-medium truncate">{{ transaction.name }}</div>
          <div class="font-bold text-md" :class="styleAmount(transaction.amount)">
            {{ formatAmount(transaction.amount) }}
          </div>
        </div>

        <!-- Date & category -->
        <div class="flex items-center justify-between">
          <div class="text-sm font-semibold text-white badge badge-info">
            {{ transaction.category }}
          </div>
          <div class="text-sm font-medium">{{ transaction.date }}</div>
        </div>
      </div>

      <div class="w-1/12">
        <div class="space-y-2">
          <!-- Edit Transaction -->
          <div
            @click="openEditTransactionModal(transaction)"
            class="flex items-center justify-center w-full text-white rounded-md cursor-pointer h-1/2 bg-info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 -960 960 960"
              fill="#FFFFFF"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </div>

          <!-- Delete Transaction -->
          <div
            class="flex items-center justify-center w-full text-white rounded-md cursor-pointer h-1/2 bg-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 -960 960 960"
              fill="#FFFFFF"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import { useModals } from '@/composables/useModals';

import type { Database } from '@/types/supabase';

import { formatAmount, styleAmount } from '@/util/format-utils';

// import TransactionsListMobileItem from '@/components/transactions/TransactionsListMobileItem.vue';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});

const modals = useModals();
const { openEditTransactionModal } = modals;

// function handleTransactionClick(transaction: Database['public']['Tables']['transactions']['Row']) {
//   openEditTransactionModal(transaction);
// }
</script>
