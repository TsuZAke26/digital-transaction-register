<template>
  <div
    :id="`accounts-collapsible-${title.toLowerCase().replaceAll(' ', '-')}`"
    class="border bg-slate-300 collapse collapse-arrow"
  >
    <input
      type="checkbox"
      :id="`accounts-collapsible-${title.toLowerCase().replaceAll(' ', '-')}-checkbox`"
    />

    <!-- Collapsible title -->
    <div class="text-xl font-semibold collapse-title">{{ title }}</div>

    <!-- Collapsible content -->
    <div class="collapse-content">
      <!-- Loaded & has summaries to render -->
      <div v-if="loaded && balances.length > 0" class="space-y-2">
        <div v-for="accountBalance in balances" :key="accountBalance.id">
          <AccountSummarySmall
            :name="accountBalance.name"
            :balance="accountBalance.balance"
            :id="accountBalance.id"
            class="bg-white"
          />
        </div>
      </div>
      <!-- Loaded & doesn't have summaries to render -->
      <div v-else-if="loaded && balances.length === 0">
        No {{ title.toLowerCase() }} accounts found
      </div>
      <!-- Loading state -->
      <div v-else>Loading {{ title.toLowerCase() }} accounts...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from '@/types/supabase';

import AccountSummarySmall from '@/components/views/home/AccountSummarySmall.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  balances: {
    type: Array as PropType<Array<Database['public']['Views']['account_balance']['Row']>>,
    default: () => []
  },
  loaded: {
    type: Boolean,
    default: false
  }
});
</script>
