<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router';
import { anonClient } from './supabase/anon-client';

import { useUserStore } from './stores/user';

const router = useRouter();
const userStore = useUserStore();

anonClient.auth.onAuthStateChange((event) => {
  console.log(`Auth state: ${event}`);
  if (event === 'SIGNED_IN') {
    userStore.loadProfileData().then(() => {
      router.push({ name: 'home' });
    });
  } else if (event === 'SIGNED_OUT') {
    router.push({ name: 'auth' });
  }
});
</script>
