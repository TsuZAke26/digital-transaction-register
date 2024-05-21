<template>
  <dialog id="modal-edit-account" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <!-- Modal Title -->
      <h3 class="text-xl font-bold">Edit Account</h3>

      <!-- New Account form -->
      <form @submit.prevent="handleEditAccount" class="space-y-4">
        <div class="flex flex-col gap-4 sm:flex-row">
          <!-- Account Type -->
          <select v-model="localAccount.accountType" class="select select-bordered" required>
            <option v-for="(type, index) in ACCOUNT_TYPES" :key="index">{{ type }}</option>
          </select>

          <!-- Account Name -->
          <input
            v-model="localAccount.name"
            class="w-full input input-bordered"
            maxlength="50"
            placeholder="Name"
            type="text"
            required
          />
        </div>

        <!-- Maximum Balance -->
        <label class="flex items-center input input-bordered">
          $
          <input
            v-if="ACCOUNT_TYPES_MAX_BALANCE_REQUIRED.includes(localAccount.accountType)"
            v-model="localAccount.maxBalance"
            :placeholder="localAccount.accountType"
            class="w-full text-right"
            min="1"
            type="number"
            required
          />
        </label>

        <!-- Modal actions-->
        <div class="space-x-4 modal-action">
          <!-- Delete Transaction -->
          <button @click="handleDeleteAccount" type="button" class="btn btn-error">Delete</button>

          <div class="w-full"></div>

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
import { type PropType, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { useAccountsStore } from '@/stores/accounts';

import type { Database } from '@/types/supabase';
import { ACCOUNT_TYPES, ACCOUNT_TYPES_MAX_BALANCE_REQUIRED } from '@/types/ui-types';

const props = defineProps({
  account: {
    type: Object as PropType<Database['public']['Tables']['accounts']['Row']>,
    required: true
  }
});

const router = useRouter();
const toast = useToast();

const accountsStore = useAccountsStore();
const { editAccount, removeAccount } = accountsStore;

const localAccount = reactive({
  id: props.account.id,
  name: props.account.name,
  accountType: props.account.account_type as Database['public']['Enums']['account_type'],
  maxBalance: props.account.max_balance
});

function close() {
  const editAccountDialogEl: HTMLElement | null = document.getElementById('modal-edit-account');
  if (editAccountDialogEl instanceof HTMLDialogElement) {
    editAccountDialogEl.close();
  }
}

async function handleEditAccount() {
  try {
    const updateData: Database['public']['Tables']['accounts']['Update'] = {
      name: localAccount.name,
      account_type: localAccount.accountType,
      max_balance: localAccount.maxBalance ?? null
    };
    await editAccount(localAccount.id, updateData);

    close();

    toast.success('Account update successful');
  } catch (error) {
    console.error('Update Account Error: ', error);
    toast.error('Account update failed');
  }
}

async function handleDeleteAccount() {
  try {
    await removeAccount(localAccount.id);

    close();

    toast.success('Account delete successful');

    router.push({ name: 'home' });
  } catch (error) {
    console.error(error);
    toast.error('Account delete failed');
  }
}
</script>
