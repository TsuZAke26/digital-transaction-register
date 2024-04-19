<template>
  <div class="container flex items-center justify-center h-screen mx-auto">
    <AuthSignIn v-if="currentView === 'sign-in'" @auth-view="currentView = $event" />
    <AuthSignUp v-else @auth-view="currentView = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AuthSignIn from '@/components/views/auth/AuthSignIn.vue';
import AuthSignUp from '@/components/views/auth/AuthSignUp.vue';

const currentView = ref('sign-in');
</script>
