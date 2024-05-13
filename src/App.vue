<template>
  <RouterView />
  <AddAccountModal />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';

import { anonClient } from './supabase/anon-client';

import { useUserStore } from './stores/user';

import AddAccountModal from '@/components/modals/AddAccountModal.vue';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { loadProfileData } = userStore;

anonClient.auth.onAuthStateChange((event) => {
  console.log(`Auth state: ${event}`);
  if (event === 'SIGNED_IN' && route.path === '/auth') {
    router.push({ name: 'home' });
  } else if (event === 'SIGNED_OUT') {
    router.push({ name: 'auth' });
  }
});

onMounted(async () => {
  const isSignedIn = (await anonClient.auth.getSession()).data.session;
  if (isSignedIn) {
    await loadProfileData();
  }
});
</script>
