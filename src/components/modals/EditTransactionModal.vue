<template>
  <dialog id="modal-edit-transaction" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <!-- Modal Title -->
      <h3 class="text-lg font-bold">Edit Transaction</h3>

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
          <!-- Delete Transaction -->
          <button @click="handleDeleteTransaction" type="button" class="btn btn-error">
            Delete
          </button>

          <div class="w-full"></div>

          <!-- Close modal -->
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-ghost">Close</button>
          </form>

          <!-- Submit form -->
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { reactive, type PropType, toRef, watch } from 'vue';
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
    default: () => {
      return {
        id: -1,
        name: '',
        date: '',
        category: '',
        amount: 0,
        accountId: -1
      };
    }
  }
});

const toast = useToast();

const userStore = useUserStore();
const { categories } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { editTransaction, removeTransaction } = transactionsStore;

const localTransaction = reactive({
  id: -1,
  name: '',
  date: '',
  category: '',
  amount: '',
  accountId: -1
});
watch(
  () => toRef(props, 'transaction'),
  (newValue, oldValue) => {
    localTransaction.id = newValue.value.id;
    localTransaction.name = newValue.value.name;
    localTransaction.date = newValue.value.date;
    localTransaction.category = newValue.value.category as string;
    localTransaction.amount = newValue.value.amount.toString();
    localTransaction.accountId = newValue.value.account_id;
  }
);
function formatAmountValue(event: any) {
  const newAmount = Number.parseFloat(event.target?.value).toFixed(2);
  localTransaction.amount = newAmount;
}

function close() {
  const editTransactionDialogEl: HTMLElement | null =
    document.getElementById('modal-edit-transaction');
  if (editTransactionDialogEl instanceof HTMLDialogElement) {
    editTransactionDialogEl.close();
  }
}

async function handleEditTransaction() {
  try {
    const updateData: Database['public']['Tables']['transactions']['Update'] = {
      account_id: localTransaction.accountId,
      category: localTransaction.category,
      date: localTransaction.date,
      name: localTransaction.name,
      amount: Number.parseFloat(localTransaction.amount)
    };
    await editTransaction(localTransaction.id, updateData);

    close();

    toast.success('Transaction update successful');

    await loadAccountBalances();
  } catch (error) {
    console.error(error);
    toast.error('Transaction update failed');
  }
}

async function handleDeleteTransaction() {
  try {
    await removeTransaction(localTransaction.id);

    close();

    toast.success('Transaction delete successful');

    await loadAccountBalances();
  } catch (error) {
    console.error(error);
    toast.error('Transaction delete failed');
  }
}
</script>
