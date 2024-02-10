<template>
  <div class="flex flex-col gap-6">
    <!-- First Name -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="firstName"
        :class="formErrors.firstName ? 'input-error' : ''"
        placeholder="First Name"
        v-bind="firstNameAttrs"
      />
      <span v-if="formErrors.firstName" class="text-sm text-red-500">{{
        formErrors.firstName
      }}</span>
    </div>

    <!-- Last Name -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="lastName"
        :class="formErrors.lastName ? 'input-error' : ''"
        placeholder="Last Name"
        v-bind="lastNameAttrs"
      />
      <span v-if="formErrors.lastName" class="text-sm text-red-500">{{ formErrors.lastName }}</span>
    </div>

    <!-- Email Address -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="email"
        :class="formErrors.email ? 'input-error' : ''"
        placeholder="Email address"
        type="email"
        v-bind="emailAttrs"
      />
      <span v-if="formErrors.email" class="text-sm text-red-500">{{ formErrors.email }}</span>
    </div>

    <!-- Password -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="password"
        :class="formErrors.password ? 'input-error' : ''"
        placeholder="Password"
        type="password"
        v-bind="passwordAttrs"
      />
      <span v-if="formErrors.password" class="text-sm text-red-500">{{ formErrors.password }}</span>
    </div>

    <!-- Password Match -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="passwordMatch"
        :class="formErrors.passwordMatch ? 'input-error' : ''"
        placeholder="Match Password"
        type="password"
        v-bind="passwordMatchAttrs"
      />
      <span v-if="formErrors.passwordMatch" class="text-sm text-red-500">{{
        formErrors.passwordMatch
      }}</span>
    </div>

    <Button
      label="Sign Up"
      @click="handleSignUp"
      class="btn-primary"
      :class="!isFormValid ? 'btn-disabled' : ''"
    />
  </div>
</template>

<script setup lang="ts">
import { useForm, useIsFormValid } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, ref } from 'yup';

import Input from '../daisy/Input.vue';
import Button from '../daisy/Button.vue';

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
const { errors: formErrors, defineField } = useForm({ validationSchema });
const isFormValid = useIsFormValid();
const [firstName, firstNameAttrs] = defineField('firstName');
const [lastName, lastNameAttrs] = defineField('lastName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [passwordMatch, passwordMatchAttrs] = defineField('passwordMatch');

const handleSignUp = async () => {
  console.log('Sign Up');
};
</script>
