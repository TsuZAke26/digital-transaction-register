<template>
  <Card :title="accountData?.name" class="w-full border shadow-md">
    <template #body>
      <div class="flex items-start justify-between">
        <div class="font-light text-md text-neutral-500">{{ accountData?.accountType }}</div>
        <div class="text-4xl font-semibold">${{ accountData?.balance }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

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

await loadAccountById(accountId);
const accountData = computed(() => {
  return getAccountSummary(accountId);
});
</script>
