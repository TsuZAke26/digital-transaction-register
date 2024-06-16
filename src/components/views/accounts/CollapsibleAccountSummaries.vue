<template>
  <div class="border card bg-slate-100">
    <div class="card-body">
      <div class="card-title">{{ title }}</div>
      <!-- Loaded & has summaries to render -->
      <div v-if="!loading && summaries.length > 0" class="space-y-2">
        <div v-for="accountSummary in summaries" :key="accountSummary.id">
          <AccountSummarySmall
            :name="accountSummary.name"
            :balance="accountSummary.balance"
            :id="accountSummary.id"
            class="bg-white"
          />
        </div>
      </div>
      <!-- Loaded & doesn't have summaries to render -->
      <div v-else-if="!loading && summaries.length === 0">
        No {{ title.toLowerCase() }} accounts found
      </div>
      <!-- Loading state -->
      <div v-else>Loading {{ title.toLowerCase() }} accounts...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import type { AccountSummary } from '@/types/ui-types';

import AccountSummarySmall from '@/components/accounts/AccountSummarySmall.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  summaries: {
    type: Array as PropType<Array<AccountSummary>>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>
