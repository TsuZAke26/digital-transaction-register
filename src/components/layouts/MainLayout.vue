<template>
  <div class="drawer">
    <!-- Drawer toggle control -->
    <input ref="drawerToggleRef" id="app-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Drawer "Content" -->
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <div class="hidden border-b-2 bg-base-100 navbar sm:block">
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
    <div class="drawer-side">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <!-- Drawer Menu & Items -->
      <ul class="min-h-full p-4 w-60 menu bg-base-200 text-base-content">
        <li @click="handleMenuItemClick('home')"><a>Home</a></li>
        <li><a>Transactions</a></li>
        <li><a>Reports</a></li>
        <div class="w-full my-2 border border-neutral-300"></div>
        <li><a>Settings</a></li>
        <li @click="handleSignOut"><a>Sign Out</a></li>
      </ul>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <div class="btm-nav sm:hidden">
    <!-- Home -->
    <button @click="$router.push({ name: 'home' })" :class="$route.name === 'home' ? 'active' : ''">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
        />
      </svg>
      <span class="btm-nav-label">Home</span>
    </button>

    <!-- Transactions -->
    <button :class="$route.name === 'transactions' ? 'active' : ''">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z"
        />
      </svg>
      <span class="btm-nav-label">Transactions</span>
    </button>

    <!-- Reports -->
    <button :class="$route.name === 'reports' ? 'active' : ''">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          d="M120-160v-520l160 120 200-280 200 160h160v520H120Zm200-120 160-220 280 218v-318H652L496-725 298-447l-98-73v144l120 96Z"
        />
      </svg>
      <span class="btm-nav-label">Reports</span>
    </button>

    <!-- Profile -->
    <button
      @click="$router.push({ name: 'profile' })"
      :class="$route.name === 'profile' ? 'active' : ''"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
        />
      </svg>
      <span class="btm-nav-label">Profile</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
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
</script>
