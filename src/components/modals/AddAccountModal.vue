<template>
  <dialog id="modal-add-account" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <!-- Modal Title -->
      <h3 class="text-xl font-bold">Add Account</h3>

      <!-- New Account form -->
      <form @submit.prevent="handleAddAccount" class="space-y-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <!-- Account Type -->
          <select v-model="accountType" class="select select-bordered" required>
            <option v-for="(type, index) in ACCOUNT_TYPES" :key="index">{{ type }}</option>
          </select>

          <!-- Account Name -->
          <input
            v-model="name"
            class="w-full input input-bordered"
            maxlength="50"
            placeholder="Name"
            type="text"
            required
          />
        </div>

        <!-- Maximum Balance -->
        <input
          v-if="ACCOUNT_TYPES_MAX_BALANCE_REQUIRED.includes(accountType)"
          v-model="maxBalance"
          :placeholder="accountType"
          class="w-full input input-bordered"
          min="1"
          type="number"
          required
        />

        <!-- Modal actions-->
        <div class="space-x-4 modal-action">
          <!-- Close modal -->
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>

          <!-- Submit form -->
          <button type="submit" class="btn btn-primary">Create Account</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

import { useAccountsStore } from '@/stores/accounts';

import type { Database } from '@/types/supabase';
import {
  ACCOUNT_TYPES,
  ACCOUNT_TYPES_MAX_BALANCE_REQUIRED,
  type NewAccount
} from '@/types/ui-types';

const toast = useToast();

const accountsStore = useAccountsStore();
const { addAccount, loadAccountBalances } = accountsStore;

const name = ref('');
const accountType: Ref<Database['public']['Enums']['account_type']> = ref('Checking');
const maxBalance = ref(undefined);

async function handleAddAccount() {
  try {
    const newAccountData: NewAccount = {
      name: name.value,
      accountType: accountType.value,
      maxBalance: maxBalance.value
    };
    await addAccount(newAccountData);

    // Closes the add account modal
    if (addAccountDialogEl instanceof HTMLDialogElement) {
      addAccountDialogEl.close();
    }

    await loadAccountBalances();

    toast.success('Account creation successful');

    // Reset form values
    name.value = '';
    accountType.value = 'Checking';
    maxBalance.value = undefined;
  } catch (error) {
    toast.error('Account creation failed');
  }
}

let addAccountDialogEl: HTMLElement | null;
onMounted(() => {
  addAccountDialogEl = document.getElementById('modal-add-account');
});
</script>
