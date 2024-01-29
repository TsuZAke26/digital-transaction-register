import { createClient } from '@supabase/supabase-js';

import router from '@/router/index';

const supabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_URL as string,
	import.meta.env.VITE_SUPABASE_KEY as string
);

supabaseClient.auth.onAuthStateChange((event) => {
	// if (event === 'SIGNED_OUT') {
	// 	router.push({ name: 'auth' });
	// }
	console.log(`Auth state: ${event}`);
});

export { supabaseClient };
