<template>
  <div class="flex flex-col gap-4">
    <!-- Name & Date -->
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

      <!-- Date -->
      <div class="flex flex-col col-span-1 gap-2">
        <Input
          v-model="transactionDate"
          :class="formErrors.transactionDate ? 'input-error' : ''"
          placeholder="Date"
          v-bind="transactionDateAttrs"
          type="date"
        />
        <span v-if="formErrors.transactionDate" class="text-sm text-red-500">
          {{ formErrors.transactionDate }}
        </span>
      </div>
    </div>

    <!-- Amount -->
    <div class="flex flex-col gap-2">
      <Input
        v-model="amount"
        :class="formErrors.amount ? 'input-error' : ''"
        placeholder="Amount"
        v-bind="amountAttrs"
        type="number"
      />
      <span v-if="formErrors.amount" class="text-sm text-red-500">{{ formErrors.amount }}</span>
    </div>

    <div class="flex flex-row justify-end gap-4">
      <Button @click="$emit('close')" class="btn-neutral btn-outline">Close</Button>
      <Button
        @click="handleNewTransaction"
        class="btn-secondary"
        :class="!isFormValid ? 'btn-disabled' : ''"
      >
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useIsFormValid } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, date, number } from 'yup';

import { useTransactionsStore } from '@/stores/transactions';
import { useAccountsStore } from '@/stores/accounts';

import Input from '@/components/daisy/Input.vue';
import Button from '@/components/daisy/Button.vue';

const props = defineProps({ accountId: { type: String, required: true } });
const emit = defineEmits(['close']);

const validationSchema = toTypedSchema(
  object({
    name: string().required('Account name required'),
    transactionDate: date().required('Transaction date required'),
    amount: number().required('Transaction amount required')
  })
);
const { errors: formErrors, defineField } = useForm({ validationSchema });
const [name, nameAttrs] = defineField('name');
const [transactionDate, transactionDateAttrs] = defineField('transactionDate');
const [amount, amountAttrs] = defineField('amount');
const isFormValid = useIsFormValid();

const transactionsStore = useTransactionsStore();
const { addTransaction } = transactionsStore;
const accountsStore = useAccountsStore();
const { refreshAccountBalance } = accountsStore;
async function handleNewTransaction() {
  const date = transactionDate.value?.toString();
  const accountId = Number.parseInt(props.accountId);

  const result = await addTransaction({
    name: name.value as string,
    date: date as string,
    amount: amount.value as number,
    accountId: accountId
  });
  if (result === true) {
    await refreshAccountBalance(accountId);
    emit('close');
  }
}
</script>
