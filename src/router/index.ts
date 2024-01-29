import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { supabaseClient } from '@/supabase/supabase-client';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				auth: true,
			},
		},
		{
			path: '/auth',
			name: 'auth',
			// route level code-splitting
			// this generates a separate chunk (Auth.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AuthView.vue'),
		},
	],
});

router.beforeEach(async (to) => {
	const isSignedIn = (await supabaseClient.auth.getSession()).data.session;

	if (to.meta?.auth && !isSignedIn) {
		return { name: 'auth' };
	}
	return true;
});

export default router;
