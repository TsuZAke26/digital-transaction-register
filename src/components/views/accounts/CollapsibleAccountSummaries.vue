<template>
  <div
    :id="`accounts-collapsible-${title.toLowerCase().replace(' ', '-')}`"
    class="border bg-slate-300 collapse collapse-arrow"
  >
    <input
      type="checkbox"
      :id="`accounts-collapsible-${title.toLowerCase().replace(' ', '-')}-checkbox`"
    />

    <!-- Collapsible title -->
    <div class="text-xl font-semibold collapse-title">{{ title }}</div>

    <!-- Collapsible content -->
    <div class="collapse-content">
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

import AccountSummarySmall from '@/components/views/home/AccountSummarySmall.vue';

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
