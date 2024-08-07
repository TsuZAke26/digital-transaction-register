import { createRouter, createWebHistory } from 'vue-router';

import { anonClient } from '@/supabase/anon-client';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/AuthView.vue')
    },
    {
      path: '/',
      component: () => import('@/components/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/test',
          component: () => import('@/views/TestView.vue')
        },
        {
          path: '/accounts/:id',
          name: 'account',
          component: () => import('@/views/accounts/id/AccountIdView.vue'),
          props: true,
          children: [
            {
              path: '/accounts/:id/transactions',
              name: 'account-transactions',
              component: () =>
                import('@/views/accounts/id/transactions/AccountIdTransactionsView.vue'),
              props: true
            },
            {
              path: '/accounts/:id/reports',
              name: 'account-reports',
              component: () => import('@/views/accounts/id/reports/AccountIdReportsView.vue'),
              props: true
            }
          ]
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/settings/SettingsView.vue')
        }
      ],
      meta: {
        auth: true
      }
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
