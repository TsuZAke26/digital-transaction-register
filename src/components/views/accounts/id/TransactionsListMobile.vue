<template>
  <div class="space-y-2">
    <TransactionsListMobileItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      @edit="$emit('edit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

import type { Database } from '@/types/supabase';

import TransactionsListMobileItem from '@/components/views/accounts/id/TransactionsListMobileItem.vue';

defineProps({
  transactions: {
    type: Array as PropType<Array<Database['public']['Tables']['transactions']['Row']>>,
    default: () => []
  }
});

defineEmits<{
  edit: [transaction: Database['public']['Tables']['transactions']['Row']];
}>();
</script>
