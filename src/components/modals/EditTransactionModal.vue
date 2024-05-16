<template>
  <dialog :id="`modal-edit-transaction-${transaction.id}`" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 modal-box">
      <!-- Modal Title -->
      <h3 class="text-lg font-bold">Add Transaction</h3>

      <!-- New Transaction form -->
      <form @submit.prevent="handleEditTransaction" class="space-y-4">
        <div class="flex gap-4">
          <!-- Category -->
          <select
            v-model="localTransaction.category"
            class="flex-1 select select-bordered"
            required
          >
            <option v-for="(category, index) in categories" :key="index">{{ category }}</option>
            <option>Other</option>
          </select>

          <!-- Date -->
          <input
            id="modal-add-transaction-form-date"
            v-model="localTransaction.date"
            class="input input-bordered"
            type="date"
            required
          />
        </div>

        <!-- Transaction Name -->
        <input
          v-model="localTransaction.name"
          class="w-full input input-bordered"
          maxlength="100"
          placeholder="Name"
          type="text"
          required
        />

        <!-- Amount -->
        <label class="flex items-center input input-bordered">
          $
          <input
            id="modal-add-transaction-form-amount"
            v-model="localTransaction.amount"
            class="w-full text-right"
            type="number"
            step="0.01"
            :pattern="REGEX_AMOUNT_STRING"
            required
            @blur="formatAmountValue"
          />
        </label>

        <!-- Modal actions-->
        <div class="space-x-4 modal-action">
          <!-- Close modal -->
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>

          <!-- Submit form -->
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { REGEX_AMOUNT_STRING } from '@/util/regex';

const props = defineProps({
  transaction: {
    type: Object as PropType<Database['public']['Tables']['transactions']['Row']>,
    required: true
  }
});

const toast = useToast();

const userStore = useUserStore();
const { categories } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { editTransaction } = transactionsStore;

const localTransaction: Database['public']['Tables']['transactions']['Row'] = reactive(
  props.transaction
);
// const transactionCategory = ref(props.transaction.category);
// const name = ref(props.transaction.name);
// const date = ref(prosp.transaction.date);
// const amount = ref(props.transaction.amount);
function formatAmountValue(event: any) {
  console.log(`Event type: ${event}`, event);
  const newAmount = Number.parseFloat(event.target?.value).toFixed(2);
  localTransaction.amount = Number.parseFloat(newAmount);
}

async function handleEditTransaction() {
  try {
    await editTransaction(localTransaction);

    // Closes the add transaction modal
    if (editTransactionDialogEl instanceof HTMLDialogElement) {
      editTransactionDialogEl.close();
    }

    toast.success('Transaction update successful');

    await loadAccountBalances();
  } catch (error) {
    console.error(error);
    toast.error('Transaction update failed');
  }
}

let editTransactionDialogEl: HTMLElement | null;
onMounted(() => {
  editTransactionDialogEl = document.getElementById(
    `modal-edit-transaction-${props.transaction.id}`
  );
});
</script>
