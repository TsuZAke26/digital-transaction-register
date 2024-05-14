<template>
  <AccountSummaryCard v-if="summary" :summary="summary" />
</template>

<script setup lang="ts">
import { ref, type Ref, toRef } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import type { AccountSummary } from '@/types/ui-types';

import AccountSummaryCard from '@/components/views/accounts/id/AccountSummaryCard.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { loadAccountById, loadAccountBalanceById, getAccountSummary } = accountsStore;

const summary: Ref<AccountSummary | undefined> = ref(undefined);
const idAsNumber = Number.parseInt(toRef(props, 'id').value);
await loadAccountById(idAsNumber);
await loadAccountBalanceById(idAsNumber);
summary.value = getAccountSummary(idAsNumber);
</script>
