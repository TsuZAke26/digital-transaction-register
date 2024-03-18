<template>
  <!-- User Information Card -->
  <Card class="border-2">
    <template #body>
      <!-- Profile Icon -->
      <img
        src="/src/assets/icons/google-material-icon-account-circle.svg"
        alt="Profile Icon"
        class="w-24 h-24 mx-auto"
      />

      <div class="text-3xl font-semibold text-center">{{ displayName }}</div>
    </template>
  </Card>

  <div class="my-4"></div>

  <!-- My Account Menu Card -->
  <Card class="border-2">
    <template #body>
      <Menu>
        <!-- Settings Menu Item-->
        <MenuItem @click="$router.push({ name: 'settings' })" text="Settings">
          <template #left
            ><img
              src="/src/assets/icons/google-material-icon-settings.svg"
              alt="Settings Icon"
              class="w-6 h-6"
          /></template>

          <template #text>
            <span class="text-lg font-semibold">Settings</span>
          </template>
        </MenuItem>

        <!-- Log Out Menu Item -->
        <MenuItem @click="handleSignOut">
          <template #left
            ><img
              src="/src/assets/icons/google-material-icon-logout.svg"
              alt="Logout Icon"
              class="w-6 h-6"
          /></template>

          <template #text>
            <span class="text-lg font-semibold">Log Out</span>
          </template>
        </MenuItem>
      </Menu>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { anonClient } from '@/supabase/supabase-client';

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import Card from '@/components/daisy/Card.vue';
import Menu from '@/components/daisy/Menu.vue';
import MenuItem from '@/components/daisy/MenuItem.vue';

const userStore = useUserStore();
const { displayName } = userStore;
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
