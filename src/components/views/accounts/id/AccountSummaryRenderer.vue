<template>
  <div v-if="summary" class="flex flex-wrap justify-between">
    <div>
      <div class="font-semibold">{{ summary.name }}</div>
      <div class="text-sm">{{ summary.accountType }}</div>
    </div>

    <div :class="styleAmount(summary.balance)" class="text-2xl font-semibold">
      {{ formatAmount(summary.balance) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useAccountsStore } from '@/stores/accounts';

import { formatAmount, styleAmount } from '@/util/format-utils';

import type { AccountSummary } from '@/types/ui-types';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountsStore = useAccountsStore();
const { loadAccountById, loadAccountBalanceById, getAccountSummary } = accountsStore;

const summary: ComputedRef<AccountSummary | undefined> = computed(() => {
  return getAccountSummary(idAsNumber);
});
const idAsNumber = Number.parseInt(toRef(props, 'id').value);
await loadAccountById(idAsNumber);
await loadAccountBalanceById(idAsNumber);
</script>
