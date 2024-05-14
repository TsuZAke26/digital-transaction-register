<template>
  <div class="border card">
    <div class="card-body">
      <div class="flex flex-wrap justify-between">
        <div>
          <div class="font-semibold">{{ summary?.name }}</div>
          <div class="text-sm">{{ summary?.accountType }}</div>
        </div>

        <div :class="styleAmount(summary?.balance)" class="text-2xl font-semibold">
          {{ formatAmount(summary.balance) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { AccountSummary } from '@/types/ui-types';

import { formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  summary: {
    type: Object as PropType<AccountSummary>,
    required: true
  }
});
</script>
