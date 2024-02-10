import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import { anonClient } from '@/supabase/supabase-client';

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
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue'),
      meta: {
        auth: true
      }
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
