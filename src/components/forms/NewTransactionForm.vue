<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <!-- Name & Date -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Name -->
      <ValidatedInput
        v-model="name"
        :error="formErrors.name"
        placeholder="Name"
        v-bind="nameAttrs"
        class="flex flex-col col-span-1 gap-2 sm:col-span-2"
      />

      <!-- Date -->
      <ValidatedInput
        v-model="transactionDate"
        :error="formErrors.transactionDate"
        class="flex flex-col col-span-1 gap-2"
        placeholder="Date"
        type="date"
        v-bind="transactionDateAttrs"
      />
    </div>

    <!-- Amount -->
    <ValidatedInput
      v-model="amount"
      :error="formErrors.amount"
      class="flex flex-col gap-2"
      placeholder="Amount"
      v-bind="amountAttrs"
    />

    <div class="flex flex-row justify-end gap-4">
      <Button @click="$emit('close')" class="btn-neutral btn-outline">Close</Button>
      <Button class="btn-secondary" type="submit">Submit</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { object, string, date, number } from 'yup';

import { useTransactionsStore } from '@/stores/transactions';
import { useAccountsStore } from '@/stores/accounts';

import ValidatedInput from '@/components/daisy/ValidatedInput.vue';
import Button from '@/components/daisy/Button.vue';

const props = defineProps({ accountId: { type: String, required: true } });
const emit = defineEmits(['close']);

const validationSchema = toTypedSchema(
  object({
    name: string().required('Transaction name required'),
    transactionDate: date().required('Transaction date required'),
    amount: number().required('Transaction amount required')
  })
);
const { errors: formErrors, defineField, handleSubmit } = useForm({ validationSchema });
const [name, nameAttrs] = defineField('name');
const [transactionDate, transactionDateAttrs] = defineField('transactionDate');
const [amount, amountAttrs] = defineField('amount');

const transactionsStore = useTransactionsStore();
const { addTransaction } = transactionsStore;
const accountsStore = useAccountsStore();
const { refreshAccountBalance } = accountsStore;
const onSubmit = handleSubmit(async () => {
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
});
</script>
