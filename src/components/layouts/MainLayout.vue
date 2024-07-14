<template>
  <div>
    <!-- Navbar -->
    <div class="sticky z-10 hidden border-b-2 md:block bg-base-100 navbar">
      <div class="pl-2 navbar-start">
        <!-- App Title -->
        <div class="text-xl font-semibold">Transaction Tracker</div>
      </div>

      <div class="navbar-end">
        <!-- Desktop Menu -->
        <div class="flex-none">
          <ul class="menu menu-horizontal">
            <li @click="handleMenuItemClick('home')"><a>Home</a></li>
            <li>
              <details>
                <summary>Accounts</summary>
                <ul class="w-40 p-2 rounded-t-none bg-base-100">
                  <li
                    v-for="account in accounts"
                    :key="account.id"
                    @click="handleAccountDropdownClick(account.id)"
                  >
                    <a>{{ account.name }}</a>
                  </li>
                </ul>
              </details>
            </li>
            <li><a>Reports</a></li>
          </ul>
        </div>

        <!-- Profile Image/Menu -->
        <div class="dropdown dropdown-end dropdown-hover">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="dark:fill-white"
              >
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                />
              </svg>
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow"
          >
            <li @click="handleMenuItemClick('settings')"><a>Settings</a></li>
            <li @click="handleSignOut"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div class="mb-16 sm:mb-0">
      <RouterView :key="$route.path" />
    </div>

    <!-- Mobile Navigation -->
    <BottomNavigation class="md:hidden" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useAccountsStore } from '@/stores/accounts';

import { anonClient } from '@/supabase/anon-client';

import BottomNavigation from '@/components/layouts/BottomNavigation.vue';

const router = useRouter();

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
const { resetState } = accountsStore;

function handleMenuItemClick(routeName: string) {
  router.push({ name: routeName });
}

function handleAccountDropdownClick(accountId: number) {
  router.push({
    name: 'account',
    params: {
      id: accountId
    }
  });
}

const handleSignOut = async () => {
  try {
    const { error: signOutError } = await anonClient.auth.signOut();
    if (signOutError) {
      throw signOutError;
    }
    resetState();
  } catch (error) {
    console.error(error);
  }
};
</script>
