<template>
  <div class="border card">
    <div class="card-body">
      <div class="flex justify-between">
        <div>
          <div class="font-bold">{{ summary?.name }}</div>
          <div class="text-sm">{{ summary?.accountType }}</div>
        </div>

        <div :class="styleAmount(summary?.balance)" class="text-2xl">
          {{ formatAmount(summary.balance) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatAmount, styleAmount } from '@/util/format-utils';

import type { AccountSummary } from '@/types/ui-types';

defineProps({
  summary: {
    type: Object as PropType<AccountSummary>,
    required: true
  }
});
</script>
