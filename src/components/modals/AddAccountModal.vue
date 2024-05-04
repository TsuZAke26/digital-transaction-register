<template>
  <dialog id="modal-add-account" class="modal">
    <!-- Modal content -->
    <div class="space-y-4 border modal-box">
      <h3 class="text-xl font-bold">Add Account</h3>

      <!-- New Account form -->
      <form @submit.prevent="handleAddAccount" class="space-y-4">
        <div class="flex gap-4">
          <!-- Account Type -->
          <select v-model="accountType" class="select select-bordered" required>
            <option v-for="(type, index) in ACCOUNT_TYPES" :key="index">{{ type }}</option>
          </select>

          <!-- Account Name -->
          <input
            v-model="name"
            class="w-full input input-bordered"
            placeholder="Name"
            type="text"
            required
          />
        </div>

        <!-- Maximum Balance -->
        <input
          v-if="accountTypesNeedingMaxBal.includes(accountType)"
          v-model="maxBalance"
          :placeholder="maxBalancePlaceholder"
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
            <button class="btn btn-neutral">Close</button>
          </form>

          <!-- Submit form -->
          <button type="submit" class="btn btn-primary">Create Account</button>
        </div>
      </form>
    </div>

    <!-- Modal closer -->
    <!-- <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form> -->
  </dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { ACCOUNT_TYPES } from '@/types/ui-types';

const name = ref('');
const accountType = ref('Checking');
const maxBalance = ref(null);

const accountTypesNeedingMaxBal = ['Credit Line'];
const maxBalancePlaceholder = computed(() => {
  return 'Credit Limit';
});

function handleAddAccount() {
  console.log('Add account');
}
</script>
