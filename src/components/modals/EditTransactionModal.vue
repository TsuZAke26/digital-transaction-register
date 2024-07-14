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
          <select v-model="transactionToEdit.category" class="flex-1 select select-bordered">
            <option v-for="(category, index) in transactionCategories" :key="index">
              {{ category }}
            </option>
            <option>Other</option>
          </select>

          <!-- Date -->
          <input
            id="modal-add-transaction-form-date"
            v-model="transactionToEdit.date"
            class="input input-bordered"
            type="date"
            required
          />
        </div>

        <!-- Transaction Name -->
        <input
          v-model="transactionToEdit.name"
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
            v-model="transactionToEdit.amount"
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
          <!-- <button @click="handleDeleteTransaction" type="button" class="btn btn-error">
            Delete
          </button> -->

          <!-- <div class="w-full"></div> -->

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
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { REGEX_AMOUNT_STRING } from '@/util/regex';

const toast = useToast();

const userStore = useUserStore();
const { transactionCategories } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { transactionToEdit } = storeToRefs(transactionsStore);
const { editTransaction } = transactionsStore;

function formatAmountValue(event: any) {
  const newAmount = Number.parseFloat(event.target?.value).toFixed(2);
  transactionToEdit.amount = newAmount;
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
      account_id: transactionToEdit.accountId,
      category: transactionToEdit.category,
      date: transactionToEdit.date,
      name: transactionToEdit.name,
      amount: Number.parseFloat(transactionToEdit.amount)
    };
    await editTransaction(transactionToEdit.id, updateData);

    close();

    toast.success('Transaction update successful');

    await loadAccountBalances();
  } catch (error) {
    console.error(error);
    toast.error('Transaction update failed');
  }
}

// async function handleDeleteTransaction() {
//   try {
//     await removeTransaction(localTransaction.id);

//     await loadAccountBalances();

//     close();

//     toast.success('Transaction delete successful');
//   } catch (error) {
//     console.error(error);
//     toast.error('Transaction delete failed');
//   }
// }
</script>
