<template>
  <div class="overflow-x-auto">
    <table class="table table-xs table-zebra">
      <!-- Table header -->
      <thead>
        <tr>
          <th>Category</th>
          <th class="w-20">Date</th>
          <th>Name</th>
          <th class="text-right">Amount</th>
          <th></th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id" class="hover">
          <td>{{ transaction.category }}</td>
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.name }}</td>
          <td class="font-semibold text-right" :class="styleAmount(transaction.amount)">
            {{ formatAmount(transaction.amount) }}
          </td>
          <!-- Edit Transaction -->
          <td>
            <button
              @click="handleEditTransaction(transaction)"
              type="button"
              class="btn btn-info dark:btn-outline dark:btn-white btn-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4">
                <path
                  d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';

import { useModals } from '@/composables/useModals';

import type { Database } from '@/types/supabase';

import { formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});

const modals = useModals();
const { openEditTransactionModal } = modals;

function handleEditTransaction(transaction: Database['public']['Tables']['transactions']['Row']) {
  openEditTransactionModal(transaction);
}
</script>
