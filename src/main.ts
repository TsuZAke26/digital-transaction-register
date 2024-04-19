import '@/assets/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { POSITION, type PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

// Supabase init
import { anonClient } from './supabase/anon-client';
anonClient.auth.onAuthStateChange((event) => {
  console.log(`Auth state: ${event}`);
  if (event === 'SIGNED_IN') {
    router.push({ name: 'home' });
  } else if (event === 'SIGNED_OUT') {
    router.push({ name: 'auth' });
  }
});

// vue-toastification config
const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 2000
};

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, toastOptions);

app.mount('#app');
