<template>
  <div class="flex flex-col gap-6">
    <!-- Email Address -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="email"
        placeholder="Email address"
        v-bind="emailAttrs"
        :class="formErrors.email ? 'input-error' : ''"
        type="email"
      />
      <span v-if="formErrors.email" class="text-sm text-red-500">{{ formErrors.email }}</span>
    </div>

    <!-- Password -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="password"
        placeholder="Password"
        type="password"
        v-bind="passwordAttrs"
        :class="formErrors.password ? 'input-error' : ''"
      />
      <span v-if="formErrors.password" class="text-sm text-red-500">{{ formErrors.password }}</span>
    </div>

    <Button @click="handleSignIn" class="btn-primary" :class="!isFormValid ? 'btn-disabled' : ''">
      Sign In
    </Button>
  </div>
</template>

<script setup lang="ts">
import { useForm, useIsFormValid } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string } from 'yup';
import { anonClient } from '@/supabase/supabase-client';

import Input from '../daisy/Input.vue';
import Button from '../daisy/Button.vue';

const validationSchema = toTypedSchema(
  object({
    email: string().required().email(),
    password: string().required()
  })
);
const { errors: formErrors, defineField } = useForm({ validationSchema });
const isFormValid = useIsFormValid();
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const handleSignIn = async () => {
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
};
</script>
