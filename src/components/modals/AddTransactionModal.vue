<template>
  <dialog id="modal-add-transaction" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 modal-box">
      <!-- Modal Title -->
      <h3 class="text-lg font-bold">Add Transaction</h3>

      <!-- New Transaction form -->
      <form @submit.prevent="handleAddTransaction" class="space-y-4">
        <div class="flex gap-4">
          <!-- Category -->
          <select v-model="transactionCategory" class="flex-1 select select-bordered" required>
            <option v-for="(category, index) in categories" :key="index">{{ category }}</option>
            <option>Other</option>
          </select>

          <!-- Date -->
          <input
            id="modal-add-transaction-form-date"
            v-model="date"
            class="input input-bordered"
            type="date"
            required
          />
        </div>

        <!-- Transaction Name -->
        <input
          v-model="name"
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
            v-model="amount"
            class="w-full text-right"
            type="number"
            step="0.01"
            :pattern="AMOUNT"
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
import { ref, toRef, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type NewTransaction from '@/types/ui-types';

import { jsDateToSupabaseDate } from '@/util/date-utils';
import { AMOUNT } from '@/util/regex';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});

const toast = useToast();

const userStore = useUserStore();
const { categories } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { addTransaction } = transactionsStore;

const transactionCategory = ref('');
const name = ref('');
const date = ref(jsDateToSupabaseDate(new Date()));
const amount: Ref<Number | undefined> = ref(undefined);
function formatAmountValue(event) {
  const newAmount = Number.parseFloat(event.target.value).toFixed(2);
  console.log(`Formatted amount: ${newAmount}`);
  amount.value = newAmount;
}

async function handleAddTransaction() {
  try {
    const accountIdAsNumber = Number.parseInt(toRef(props, 'accountId').value);
    const newTransactionData: NewTransaction = {
      accountId: accountIdAsNumber,
      category: transactionCategory.value,
      name: name.value,
      date: date.value,
      amount: amount.value as number
    };
    await addTransaction(newTransactionData);

    // Closes the add transaction modal
    if (addTransactionDialogEl instanceof HTMLDialogElement) {
      addTransactionDialogEl.close();
    }

    toast.success('Transaction creation successful');

    // Reset form values
    transactionCategory.value = '';
    date.value = jsDateToSupabaseDate(new Date());
    name.value - '';
    amount.value = undefined;

    await loadAccountBalances();
  } catch (error) {
    toast.error('Transaction creation failed');
  }
}

let addTransactionDialogEl: HTMLElement | null;
onMounted(() => {
  addTransactionDialogEl = document.getElementById('modal-add-transaction');
});
</script>
