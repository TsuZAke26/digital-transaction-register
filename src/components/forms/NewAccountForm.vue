<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <!-- Name & Type -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Name -->
      <ValidatedInput
        v-model="name"
        :error="formErrors.name"
        placeholder="Name"
        v-bind="nameAttrs"
        class="flex flex-col col-span-1 gap-2 sm:col-span-2"
      />

      <!-- Account Type -->
      <ValidatedSelect
        v-model="accountType"
        :error="formErrors.accountType"
        :values="ACCOUNT_TYPES"
        class="flex flex-col col-span-1 gap-2"
        @input="maxBalance = undefined"
        placeholder="Account Type"
        v-bind="accountTypeAttrs"
      />
    </div>

    <!-- Max Balance (Credit Lines) -->
    <div v-if="accountType === 'Credit Line'" class="flex flex-col gap-2">
      <ValidatedInput
        v-model="maxBalance"
        :error="formErrors.maxBalance"
        placeholder="Maximum Balance"
        v-bind="maxBalanceAttrs"
        type="number"
      />
    </div>

    <div class="flex flex-row justify-end gap-4">
      <Button @click="$emit('close')" class="btn-neutral btn-outline">Close</Button>
      <Button class="btn-secondary" type="submit">Submit</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, number } from 'yup';

import { ACCOUNT_TYPES } from '@/types/ui-types';

import { useAccountsStore } from '@/stores/accounts';

import Button from '@/components/daisy/Button.vue';
import ValidatedInput from '@/components/daisy/ValidatedInput.vue';
import ValidatedSelect from '@/components/daisy/ValidatedSelect.vue';

const validationSchema = toTypedSchema(
  object({
    name: string().required('Account name required'),
    accountType: string()
      .required('Account type required')
      .test(
        'validAccountType',
        `Account type must be one of: ${ACCOUNT_TYPES.join(', ')}`,
        (value) => {
          const matchedType = ACCOUNT_TYPES.find((accountType) => accountType === value);
          return matchedType !== undefined;
        }
      ),
    maxBalance: number()
      .integer('Maximum balance cannot have a decimal')
      .positive('Maximum balance must be a positive value')
      .when('accountType', {
        is: (accountType: string) => 'Credit Line' === accountType,
        then: (validationSchema) =>
          validationSchema.required('Credit lines require a maximum balance')
      })
  })
);
const { errors: formErrors, defineField, handleSubmit } = useForm({ validationSchema });
const [name, nameAttrs] = defineField('name');
const [accountType, accountTypeAttrs] = defineField('accountType');
const [maxBalance, maxBalanceAttrs] = defineField('maxBalance');

const emit = defineEmits(['close']);

const accountsStore = useAccountsStore();
const { addAccount } = accountsStore;

const onSubmit = handleSubmit(async (values) => {
  const newAccountData = {
    name: values.name,
    accountType: values.accountType as 'Checking' | 'Savings' | 'Credit Line',
    maxBalance: values.maxBalance
  };

  const result = await addAccount(newAccountData);
  if (result === true) {
    emit('close');
  }
});
</script>
