<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- First Name -->
    <ValidatedInput
      v-model="firstName"
      :error="formErrors.firstName"
      placeholder="First Name"
      v-bind="firstNameAttrs"
    />

    <!-- Last Name -->
    <ValidatedInput
      v-model="lastName"
      :error="formErrors.lastName"
      placeholder="Last Name"
      v-bind="lastNameAttrs"
    />

    <div class="w-full border border-gray-400"></div>

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

    <!-- Password Match -->
    <ValidatedInput
      v-model="passwordMatch"
      :error="formErrors.passwordMatch"
      placeholder="Match Password"
      type="password"
      v-bind="passwordMatchAttrs"
    />

    <Button class="w-full btn-primary" type="submit">Sign Up</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref } from 'yup';

import { anonClient } from '@/supabase/supabase-client';
import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

import ValidatedInput from '@/components/daisy/ValidatedInput.vue';
import Button from '@/components/daisy/Button.vue';

const validationSchema = toTypedSchema(
  object({
    firstName: string().required('First name required'),
    lastName: string().required('Last name required'),
    email: string().required('Email is required').email('Enter a valid email address'),
    password: string()
      .required('Password is required')
      .min(10, 'Password must be at least 10 characters'),
    passwordMatch: string()
      .required('Matched password is required')
      .oneOf([ref('password')], 'Mismatched passwords')
  })
);
const { errors: formErrors, defineField, handleSubmit } = useForm({ validationSchema });
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordMatch, passwordMatchAttrs] = defineField('passwordMatch');

const onSubmit = handleSubmit(async () => {
  try {
    let signUpObject: SignUpWithPasswordCredentials = {
      email: email.value as string,
      password: password.value as string,
      options: {
        data: {
          first_name: firstName.value as string,
          last_name: lastName.value as string
        }
      }
    };

    const { error } = await anonClient.auth.signUp(signUpObject);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Sign Up Error', error);
  }
});
</script>
