<template>
	<div class="w-full">
		<Toolbar class="fixed top-0 left-0 right-0 z-10">
			<template #start>
				<span class="text-md font-semibold">digital-transaction-register</span>
			</template>

			<template #end>
				<Button @click="handleSignOut" label="Sign Out" size="small" />
			</template>
		</Toolbar>

		<!-- Nested Route Container -->
		<div class="container mx-auto">
			<RouterView />
		</div>
	</div>
</template>

<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import { supabaseClient } from '@/supabase/supabase-client';

async function handleSignOut() {
	try {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			throw error;
		}
	} catch (error) {
		console.error('Sign Out Error', error);
	}
}
</script>
