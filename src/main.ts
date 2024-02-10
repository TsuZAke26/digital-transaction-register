import '@/assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { anonClient } from './supabase/supabase-client';
anonClient.auth.onAuthStateChange((event) => {
  console.log(`Auth state: ${event}`);
  if (event === 'SIGNED_IN') {
    router.push({ name: 'home' });
  } else if (event === 'SIGNED_OUT') {
    router.push({ name: 'auth' });
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
