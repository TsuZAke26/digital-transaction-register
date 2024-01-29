<template>
	<div class="h-screen flex items-center justify-center">
		<Panel v-if="view === 'signin'" header="Sign In">
			<form class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="email">Email Address</label>
					<InputText id="email" type="email" v-model="email" />
				</div>

				<div class="flex flex-col gap-2">
					<label for="password">Password</label>
					<InputText id="password" type="password" v-model="password" />
				</div>

				<Button label="Sign In" @click="handleSignIn" />

				<span
					@click="toggleView"
					class="text-center hover:text-green-600 cursor-pointer hover:scale-105 duration-75"
				>
					Don't have an account? Sign Up
				</span>
			</form>
		</Panel>

		<Panel v-else header="Sign Up">
			<form class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="email">Email Address</label>
					<InputText id="email" type="email" v-model="email" />
				</div>

				<div class="flex flex-col gap-2">
					<label for="password">Password</label>
					<InputText id="password" type="password" v-model="password" />
				</div>

				<div></div>

				<div class="flex flex-col gap-2">
					<label for="first-name">First Name</label>
					<InputText id="first-name" type="text" v-model="firstName" />
				</div>

				<div class="flex flex-col gap-2">
					<label for="last-name">Last Name</label>
					<InputText id="last-name" type="text" v-model="lastName" />
				</div>

				<Button label="Register" @click="handleSignUp" />

				<span
					@click="toggleView"
					class="text-center hover:text-green-600 cursor-pointer hover:scale-105 duration-75"
				>
					Already registered? Sign in
				</span>
			</form>
		</Panel>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const view = ref('signup');
function toggleView() {
	console.log('Toggle View');
	if (view.value === 'signin') {
		view.value = 'signup';
	} else {
		view.value = 'signin';
	}
}

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');

function handleSignIn() {
	console.log('Sign In');
}

function handleSignUp() {
	console.log('Sign Up');
}
</script>
