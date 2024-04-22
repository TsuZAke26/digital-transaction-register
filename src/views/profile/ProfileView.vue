<template>
  <div class="container h-screen max-w-5xl p-4 mx-auto">
    <div class="border card">
      <div class="space-y-4 card-body">
        <div class="card-title">Profile</div>

        <!-- Card body content -->
        <div class="space-y-4">
          <!-- Profile Image/Username card -->
          <div class="border card">
            <div class="flex items-center justify-center card-body">
              <!-- Profile Image -->
              <div class="w-16 h-16 bg-red-500 rounded-full"></div>

              <!-- Username -->
              <div class="font-semibold">{{ displayName }}</div>
            </div>
          </div>

          <!-- Transaction Categories card -->
          <div class="border card">
            <div class="card-body">
              <div class="card-title">Transaction Categories</div>
              <ul v-if="categories">
                <li v-for="category in categories" :key="category">{{ category }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Card actions -->
        <div class="justify-end card-actions">
          <!-- Sign Out button -->
          <button @click="handleSignOut" class="bg-red-300 btn">Sign Out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { anonClient } from '@/supabase/anon-client';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { displayName, categories } = userStore;

async function handleSignOut() {
  await anonClient.auth.signOut();
}
</script>
