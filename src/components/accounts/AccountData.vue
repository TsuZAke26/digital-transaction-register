<template>
  <Card :title="account?.name" class="w-full border shadow-md">
    <template #body>
      <div class="flex items-start justify-between">
        <div class="font-light text-md text-neutral-500">{{ account?.accountType }}</div>
        <div class="text-4xl font-semibold">${{ account?.balance }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';
import type { AccountSummary } from '@/types/ui-types';

import Card from '@/components/daisy/Card.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountId = Number.parseInt(props.id);

const accountsStore = useAccountsStore();
const { loadAccountById, getAccountSummary } = accountsStore;

const account: Ref<AccountSummary | undefined> = ref(undefined);
await loadAccountById(accountId).then(() => (account.value = getAccountSummary(accountId)));
</script>
