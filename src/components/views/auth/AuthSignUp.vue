<template>
  <div class="w-full max-w-xs border card">
    <div class="card-body">
      <div class="text-xl font-semibold">Sign Up</div>
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
        <input
          v-model="confirmPassword"
          class="w-full max-w-xs input input-bordered"
          placeholder="Confirm Password"
          type="password"
        />
        <div class="justify-end card-actions">
          <button :disabled="!formValid" class="btn btn-primary" type="submit">Sign Up</button>
        </div>
      </form>
      <div @click="$emit('auth-view', 'sign-in')" class="text-center underline cursor-pointer">
        Already registered? Sign in here
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { useToast } from 'vue-toastification';

import { anonClient } from '@/supabase/anon-client';
import { REGEX_PASSWORD } from '@/util/regex';

defineEmits(['auth-view']);

const toast = useToast();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const formValid = computed(() => {
  const hasEmail = email.value.length > 0;

  const hasPassword = password.value.length > 0;
  const validPassword = REGEX_PASSWORD.test(password.value);

  const hasConfirmPassword = confirmPassword.value.length > 0;
  const passwordMatch = password.value === confirmPassword.value;

  return hasEmail && hasPassword && validPassword && hasConfirmPassword && passwordMatch;
});
async function handleSubmit() {
  if (formValid.value) {
    try {
      const signUpObject: SignUpWithPasswordCredentials = {
        email: email.value as string,
        password: password.value as string
      };

      const { error } = await anonClient.auth.signUp(signUpObject);
      if (error) {
        throw error;
      }
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed!');
      console.error('Sign Up Error', error);
    }
  }
}
</script>
