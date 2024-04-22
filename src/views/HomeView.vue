<template>
  <div class="container relative h-screen max-w-lg p-4 mx-auto">
    <div class="text-xl font-bold text-center">Welcome, {{ displayName }}</div>
    <!-- Add Transaction modal -->
    <dialog id="modal-add-transaction" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add Transaction</h3>
        <p class="py-4">Under construction...</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <!-- Add Account modal -->
    <dialog id="modal-add-account" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Add Account</h3>
        <p class="py-4">Under construction...</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <!-- Floating Action Button -->
    <div class="absolute right-10 bottom-20 dropdown dropdown-top dropdown-end">
      <!-- Button element -->
      <div tabindex="0" role="button" class="mt-4 btn btn-circle bg-primary">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </div>
      <!-- Dropdown menu -->
      <ul tabindex="0" class="border w-44 menu bg-base-100 dropdown-content rounded-box">
        <li @click="handleShowAddTransactionModal"><a>Add Transaction</a></li>
        <li @click="handleShowAddAccountModal"><a>Add Account</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { displayName } = userStore;

let addTransactionDialogEl: HTMLElement | null;
function handleShowAddTransactionModal() {
  if (addTransactionDialogEl instanceof HTMLDialogElement) {
    addTransactionDialogEl.showModal();
  }
}

let addAccountDialogEl: HTMLElement | null;
function handleShowAddAccountModal() {
  if (addAccountDialogEl instanceof HTMLDialogElement) {
    addAccountDialogEl.showModal();
  }
}

onMounted(() => {
  addTransactionDialogEl = document.getElementById('modal-add-transaction');
  addAccountDialogEl = document.getElementById('modal-add-account');
});
</script>

<style scoped></style>
