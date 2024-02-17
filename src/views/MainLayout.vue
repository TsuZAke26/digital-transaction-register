<template>
  <div class="drawer">
    <!-- Drawer toggle control -->
    <input ref="drawerToggle" id="app-drawer" type="checkbox" class="drawer-toggle" />

    <!-- Drawer "Content" -->
    <div class="flex flex-col drawer-content">
      <!-- Navbar -->
      <Navbar class="fixed top-0 left-0 right-0 z-10 bg-base-300">
        <template #start>
          <label for="app-drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
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
          <div class="flex-none hidden md:block">
            <ul class="menu menu-horizontal">
              <!-- Navbar menu content here -->
              <li @click="router.push({ name: 'accounts' })"><a>My Accounts</a></li>
              <li @click="handleSignOut"><a>Sign Out</a></li>
            </ul>
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
        <li @click="handleMenuItemClick('home')"><a>Home</a></li>
        <li @click="handleMenuItemClick('accounts')"><a>My Accounts</a></li>
        <div class="w-full my-2 border border-neutral-300"></div>
        <li @click="handleSignOut"><a>Sign Out</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';

import { anonClient } from '@/supabase/supabase-client';

import Navbar from '@/components/daisy/Navbar.vue';

const router = useRouter();

const drawerToggle: Ref<HTMLInputElement | null> = ref(null);
function handleMenuItemClick(routeName: string) {
  router.push({ name: routeName });
  drawerToggle.value?.click();
}

const handleSignOut = async () => {
  try {
    const { error: signOutError } = await anonClient.auth.signOut();
    if (signOutError) {
      throw signOutError;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
