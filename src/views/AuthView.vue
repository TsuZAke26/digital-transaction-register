<template>
  <div class="container flex flex-col items-center justify-center min-h-screen gap-8 p-4 mx-auto">
    <div class="text-2xl">Digital Transaction Register</div>
    <div class="">
      <Card :title="cardTitle" class="border border-neutral-300">
        <template #body>
          <div v-if="view === 'signin'" class="mt-4">
            <FormSignIn />
            <div @click="view = 'signup'" class="mt-8 text-center link">
              Need an account? Register here
            </div>
          </div>

          <div v-else-if="view === 'signup'" class="mt-4">
            <FormSignUp />
            <div @click="view = 'signin'" class="mt-8 text-center link">
              Already resgistered? Sign in
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import Card from '@/components/daisy/Card.vue';
import FormSignIn from '@/components/auth/FormSignIn.vue';
import FormSignUp from '@/components/auth/FormSignUp.vue';

const view = ref('signin');
const cardTitle = computed(() => {
  let result = '';

  switch (view.value) {
    case 'signin':
      result = 'Sign In';
      break;
    case 'signup':
      result = 'Sign Up';
      break;
  }

  return result;
});
</script>
