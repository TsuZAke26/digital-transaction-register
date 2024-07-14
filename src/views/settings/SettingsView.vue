<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <div class="text-2xl font-semibold">User Settings</div>
      <!-- <div class="flex items-center justify-between">
        <div class="text-2xl font-semibold">Profile Settings</div>
        <button @click="handleSignOut" class="text-lg text-white btn btn-neutral btn-sm">
          Sign Out
        </button>
      </div> -->

      <div class="space-y-4">
        <!-- Profile Image/Username card -->
        <ProfileCard />

        <!-- Transaction Categories card -->
        <TransactionCategories />
      </div>

      <div class="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <!-- Sign Out button -->
        <button @click="handleSignOut" class="w-full text-lg text-white sm:w-auto btn btn-neutral">
          Sign Out
        </button>

        <!-- Save Settings button -->
        <button
          @click="handleSaveCategories"
          class="w-full text-lg text-white sm:w-auto btn btn-primary"
          :disabled="!canSave"
        >
          Save Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import { useUserStore } from '@/stores/user';

import { anonClient } from '@/supabase/anon-client';

import ProfileCard from '@/components/views/profile/ProfileCard.vue';
import TransactionCategories from '@/components/views/profile/TransactionCategories.vue';

const toast = useToast();

const userStore = useUserStore();
const { saveUserSettings } = userStore;

const canSave = ref(true);
async function handleSaveCategories() {
  try {
    canSave.value = false;
    await saveUserSettings();
    toast.success('Settings saved successfully!');
  } catch (error) {
    console.error('Error saving application settings: ', error);
    toast.error('Error savings settings');
  } finally {
    canSave.value = true;
  }
}

async function handleSignOut() {
  await anonClient.auth.signOut();
}
</script>
