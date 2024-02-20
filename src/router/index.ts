import { createRouter, createWebHistory } from 'vue-router';

import { anonClient } from '@/supabase/supabase-client';

import AuthView from '@/views/AuthView.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: 'accounts',
          name: 'accounts',
          component: () => import('@/views/AccountsView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: 'accounts/:id',
          name: 'account',
          component: () => import('@/views/accounts/AccountView.vue'),
          meta: {
            auth: true
          },
          props: true
        }
      ]
    }
  ]
});

router.beforeEach(async (to) => {
  const isSignedIn = (await anonClient.auth.getSession()).data.session;

  if (to.meta?.auth && !isSignedIn) {
    return { name: 'auth' };
  }
  return true;
});

export default router;
