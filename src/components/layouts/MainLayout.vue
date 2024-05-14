<template>
  <div class="drawer">
    <!-- Drawer toggle control -->
    <input ref="drawerToggleRef" id="app-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Drawer "Content" -->
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <div class="sticky top-0 z-10 border-b-2 bg-base-100 navbar">
        <div class="flex items-center space-x-2">
          <!-- Menu Button -->
          <button @click="drawerToggleRef?.click()" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <!-- Navbar Title -->
          <div class="text-xl font-semibold">Transaction Tracker</div>
        </div>
      </div>

      <!-- Page Content -->
      <RouterView />
    </div>

    <!-- Drawer Side -->
    <div class="z-20 drawer-side">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <!-- Drawer Menu & Items -->
      <ul class="min-h-full p-4 w-60 menu bg-base-100 text-base-content">
        <li @click="handleMenuItemClick('home')"><a>Home</a></li>
        <li>
          <details>
            <summary>Accounts</summary>
            <ul>
              <li @click="handleShowAddAccountModal"><a>+ Add Account</a></li>
            </ul>
          </details>
        </li>
        <li><a>Reports</a></li>
        <div class="w-full my-2 border border-neutral-300"></div>
        <li @click="handleMenuItemClick('profile')"><a>Profile</a></li>
        <li @click="handleSignOut"><a>Sign Out</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { anonClient } from '@/supabase/anon-client';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

const router = useRouter();

const accountsStore = useAccountsStore();
const { resetState: accountsResetState } = accountsStore;
const transactionsStore = useTransactionsStore();
const { resetState: transactionsResetState } = transactionsStore;

const drawerToggleRef: Ref<HTMLInputElement | null> = ref(null);
function handleMenuItemClick(routeName: string) {
  router.push({ name: routeName });
  drawerToggleRef.value?.click();
}

let addAccountDialogEl: HTMLElement | null;
function handleShowAddAccountModal() {
  if (addAccountDialogEl instanceof HTMLDialogElement) {
    addAccountDialogEl.showModal();
    drawerToggleRef.value?.click();
  }
}

const handleSignOut = async () => {
  try {
    const { error: signOutError } = await anonClient.auth.signOut();
    if (signOutError) {
      throw signOutError;
    }
    accountsResetState();
    transactionsResetState();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  addAccountDialogEl = document.getElementById('modal-add-account');
});
</script>
