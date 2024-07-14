<template>
  <RouterView />
  <EditTransactionModal />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';

import EditTransactionModal from '@/components/modals/EditTransactionModal.vue';

import { anonClient } from './supabase/anon-client';

import { useUserStore } from './stores/user';
import { useAccountsStore } from './stores/accounts';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { loadUserData } = userStore;

const accountsStore = useAccountsStore();
const { loadAccounts, loadAccountBalances } = accountsStore;

anonClient.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' && route.path === '/auth') {
    router.push({ name: 'home' });
  } else if (event === 'SIGNED_OUT') {
    router.push({ name: 'auth' });
  }
});

onMounted(async () => {
  const isSignedIn = (await anonClient.auth.getSession()).data.session;
  if (isSignedIn) {
    await loadUserData();
    await loadAccounts();
    await loadAccountBalances();
  }
});
</script>
