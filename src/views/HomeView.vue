<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-4">
      <span class="text-xl">Home View</span>
      <button @click="signOut" class="btn">Sign Out</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { anonClient } from '@/supabase/supabase-client';

const signOut = () => {
  anonClient.auth.signOut();
};
</script>

<style scoped></style>
