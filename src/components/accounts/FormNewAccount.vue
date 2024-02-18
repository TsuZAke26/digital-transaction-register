<template>
  <div class="flex flex-col gap-4">
    <!-- Name & Type -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Name -->
      <div class="flex flex-col col-span-1 gap-2 sm:col-span-2">
        <Input
          v-model="name"
          :class="formErrors.name ? 'input-error' : ''"
          placeholder="Name"
          v-bind="nameAttrs"
        />
        <span v-if="formErrors.name" class="text-sm text-red-500">{{ formErrors.name }}</span>
      </div>

      <!-- Type -->
      <div class="flex flex-col col-span-1 gap-2">
        <Select
          v-model="accountType"
          :class="formErrors.accountType ? 'input-error' : ''"
          :values="accountTypeValues"
          @input="maxBalance = undefined"
          placeholder="Account Type"
          v-bind="accountTypeAttrs"
        />
        <span v-if="formErrors.accountType" class="text-sm text-red-500">{{
          formErrors.accountType
        }}</span>
      </div>
    </div>

    <!-- Max Balance (Credit Lines) -->
    <div v-if="accountType === 'Credit Line'" class="flex flex-col gap-2">
      <Input
        v-model="maxBalance"
        :class="formErrors.maxBalance ? 'input-error' : ''"
        placeholder="Maximum Balance"
        v-bind="maxBalanceAttrs"
        type="number"
        min="0"
      />
      <span v-if="formErrors.maxBalance" class="text-sm text-red-500">{{
        formErrors.maxBalance
      }}</span>
    </div>

    <div class="flex flex-row justify-end gap-4">
      <Button @click="$emit('close')" class="btn-neutral btn-outline">Close</Button>
      <Button
        @click="handleNewAccount"
        class="btn-secondary"
        :class="!isFormValid ? 'btn-disabled' : ''"
      >
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useForm, useIsFormValid } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, number } from 'yup';

import { AccountTypes } from '@/types/supabase/db-tables';

import { useAccountsStore } from '@/stores/accounts';

import Input from '@/components/daisy/Input.vue';
import Select from '@/components/daisy/Select.vue';
import Button from '@/components/daisy/Button.vue';

const accountTypeValues = Object.values(AccountTypes);
const validationSchema = toTypedSchema(
  object({
    name: string().required('Account name required'),
    accountType: string()
      .required('Account type required')
      .test(
        'validAccountType',
        `Account type must be one of: ${accountTypeValues.join(', ')}`,
        (value) => {
          const matchedType = accountTypeValues.find((accountType) => accountType === value);
          return matchedType !== undefined;
        }
      ),
    maxBalance: number()
  })
);
const { errors: formErrors, defineField } = useForm({ validationSchema });
const [name, nameAttrs] = defineField('name');
const [accountType, accountTypeAttrs] = defineField('accountType');
const [maxBalance, maxBalanceAttrs] = defineField('maxBalance');
const isBaseFormValid = useIsFormValid();
const isFormValid = computed(() => {
  if (accountType.value !== 'Credit Line') {
    return isBaseFormValid.value;
  } else {
    const isMaxBalanceValid = maxBalance.value !== undefined && maxBalance.value > 0;
    return isBaseFormValid.value && isMaxBalanceValid;
  }
});

const emit = defineEmits(['close']);

const accountsStore = useAccountsStore();
const { addAccount } = accountsStore;
const handleNewAccount = async () => {
  // TODO: turn on loading state
  const result = await addAccount({
    name: name.value,
    accountType: accountType.value,
    maxBalance: maxBalance.value
  });
  if (result === true) {
    emit('close');
  }
  // TODO: turn off loading state
};
</script>
