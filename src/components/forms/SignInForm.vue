<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Email Address -->
    <ValidatedInput
      v-model="email"
      :error="formErrors.email"
      placeholder="Email address"
      type="email"
      v-bind="emailAttrs"
    />

    <!-- Password -->
    <ValidatedInput
      v-model="password"
      :error="formErrors.password"
      placeholder="Password"
      type="password"
      v-bind="passwordAttrs"
    />

    <Button class="w-full btn-primary" type="submit">Sign In</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
import { anonClient } from '@/supabase/supabase-client';

import Button from '@/components/daisy/Button.vue';
import ValidatedInput from '@/components/daisy/ValidatedInput.vue';

const validationSchema = toTypedSchema(
  object({
    email: string().required('Email required').email(),
    password: string().required('password required')
  })
);
const { errors: formErrors, defineField, handleSubmit } = useForm({ validationSchema });
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async () => {
  try {
    const { error } = await anonClient.auth.signInWithPassword({
      email: email.value as string,
      password: password.value as string
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Sign In Error', error);
  }
});
</script>
