<template>
  <div class="w-full max-w-xs border card">
    <div class="card-body">
      <div class="text-xl font-semibold">Sign In</div>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="email"
          class="w-full max-w-xs input input-bordered"
          placeholder="Email"
          type="email"
        />
        <input
          v-model="password"
          class="w-full max-w-xs input input-bordered"
          placeholder="Password"
          type="password"
        />
        <div class="justify-end card-actions">
          <button class="btn btn-primary" type="submit">Sign In</button>
        </div>
      </form>
      <div @click="$emit('auth-view', 'sign-up')" class="text-center underline cursor-pointer">
        Need an account? Sign up here
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

import { anonClient } from '@/supabase/anon-client';

import { useUserStore } from '@/stores/user';

defineEmits(['auth-view']);

const toast = useToast();

const userStore = useUserStore();
const { loadProfileData } = userStore;

const email = ref('');
const password = ref('');
const formValid = computed(() => {
  const hasEmail = email.value.length > 0;
  const hasPassword = password.value.length > 0;

  return hasEmail && hasPassword;
});
async function handleSubmit() {
  if (formValid.value) {
    try {
      const { error } = await anonClient.auth.signInWithPassword({
        email: email.value as string,
        password: password.value as string
      });
      if (error) {
        throw error;
      }
      await loadProfileData();
      toast.success('Sign in successful!');
    } catch (error) {
      toast.error('Sign in failed!');
      console.error('Sign In Error', error);
    }
  }
}
</script>
