<template>
  <div class="hidden sm:block drawer">
    <!-- Drawer toggle control -->
    <input ref="drawerToggle" id="app-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Drawer "Content" -->
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <Navbar class="fixed top-0 left-0 right-0 z-10 bg-base-300">
        <template #start>
          <label
            for="app-drawer"
            aria-label="open sidebar"
            class="md:hidden btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </template>
        <template #center>
          <span class="text-2xl font-bold">Checkbook</span>
        </template>
        <template #end>
          <div class="hidden md:flex md:items-center md:justify-right">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              <li @click="router.push({ name: 'home' })"><a>Accounts</a></li>
              <li @click="router.push({ name: 'user-account' })"><a>User Settings</a></li>
              <!-- <li @click="handleSignOut"><a>Sign Out</a></li> -->
            </ul>
            <!-- <div>
              <img
                src="/src/assets/icons/google-material-icon-account-circle.svg"
                alt="Account balance icon"
                class="w-6 h-6"
              />
              <div class="text-xs text-center">Me</div>
            </div> -->
          </div>
        </template>
      </Navbar>

      <!-- Page Content -->
      <div class="container p-4 mx-auto mt-16">
        <RouterView />
      </div>
    </div>

    <!-- Actual Side Drawer -->
    <div class="z-20 drawer-side">
      <label for="app-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="min-h-full p-4 w-60 menu bg-base-200">
        <!-- Drawer content here -->
        <li @click="handleMenuItemClick('home')"><a>Accounts</a></li>
        <div class="w-full my-2 border border-neutral-300"></div>
        <li @click="handleMenuItemClick('user-account')"><a>User Settings</a></li>
        <li @click="handleSignOut"><a>Sign Out</a></li>
      </ul>
    </div>
  </div>

  <div class="sm:hidden">
    <!-- Page Content -->
    <div class="container max-w-5xl p-4 mx-auto">
      <RouterView />
    </div>

    <!-- Bottom Navigation -->
    <BottomNavbar />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';

import { anonClient } from '@/supabase/supabase-client';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import Navbar from '@/components/daisy/Navbar.vue';
import BottomNavbar from '@/components/app/BottomNavbar.vue';

const router = useRouter();

const drawerToggle: Ref<HTMLInputElement | null> = ref(null);
function handleMenuItemClick(routeName: string) {
  router.push({ name: routeName });
  drawerToggle.value?.click();
}

const accountsStore = useAccountsStore();
const { resetState: accountsResetState } = accountsStore;
const transactionsStore = useTransactionsStore();
const { resetState: transactionsResetState } = transactionsStore;
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
