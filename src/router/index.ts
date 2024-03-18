import { createRouter, createWebHistory } from 'vue-router';

import { anonClient } from '@/supabase/supabase-client';

import AuthView from '@/views/auth/AuthView.vue';
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
      path: '',
      component: MainLayout,
      children: [
        {
          path: '/accounts/:id/transactions',
          name: 'account-transactions',
          component: () => import('@/views/accounts/id/transactions/AccountTransactionsView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/accounts/:id',
          name: 'account',
          component: () => import('@/views/accounts/id/AccountView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/user-account',
          name: 'user-account',
          component: () => import('@/views/user-account/UserAccountView.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/settings/SettingsView.vue'),
          meta: {
            auth: true
          }
        }
      ]
    },
    { path: '/:pathMatch(.*)', component: () => import('@/views/NotFoundView.vue') }
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
