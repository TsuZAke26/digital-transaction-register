<template>
  <dialog id="modal-add-transaction" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <!-- Modal Title -->
      <h3 class="text-lg font-bold">Add Transaction</h3>

      <!-- New Transaction form -->
      <form @submit.prevent="handleAddTransaction" class="space-y-4">
        <div class="flex gap-4">
          <!-- Category -->
          <select v-model="transactionCategory" class="flex-1 select select-bordered">
            <option v-for="(category, index) in transactionCategories" :key="index">
              {{ category }}
            </option>
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
import { ref, type Ref, toRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { jsDateToSupabaseDate } from '@/util/date-utils';
import { REGEX_AMOUNT_STRING } from '@/util/regex';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});

const toast = useToast();

const userStore = useUserStore();
const { transactionCategories } = storeToRefs(userStore);

const accountsStore = useAccountsStore();
const { loadAccountBalanceById } = accountsStore;

const transactionsStore = useTransactionsStore();
const { addTransaction } = transactionsStore;

const transactionCategory = ref('');
const name = ref('');
const date = ref(jsDateToSupabaseDate(new Date()));
const amount: Ref<String | undefined> = ref(undefined);
function formatAmountValue(event: any) {
  const newAmount = Number.parseFloat(event.target?.value).toFixed(2);
  amount.value = newAmount;
}

function close() {
  const addTransactionDialogEl: HTMLElement | null =
    document.getElementById('modal-add-transaction');
  if (addTransactionDialogEl instanceof HTMLDialogElement) {
    addTransactionDialogEl.close();
  }
}

async function handleAddTransaction() {
  try {
    const accountIdAsNumber = Number.parseInt(toRef(props, 'accountId').value);
    const newTransactionData: Database['public']['Tables']['transactions']['Insert'] = {
      account_id: accountIdAsNumber,
      category: transactionCategory.value,
      name: name.value,
      date: date.value,
      amount: Number.parseFloat(amount.value as string)
    };
    await addTransaction(newTransactionData);

    await loadAccountBalanceById(accountIdAsNumber);

    toast.success('Transaction creation successful');

    // Reset form values
    transactionCategory.value = '';
    date.value = jsDateToSupabaseDate(new Date());
    name.value = '';
    amount.value = undefined;

    close();
  } catch (error) {
    console.error(error);
    toast.error('Transaction creation failed');
  }
}
</script>
