<template>
  <!-- Name & amount -->
  <div class="flex items-start justify-between">
    <div class="text-sm font-medium truncate">{{ transaction.name }}</div>
    <div class="font-bold text-md" :class="styleAmount(transaction.amount)">
      {{ formatAmount(transaction.amount) }}
    </div>
  </div>

  <!-- Date & category -->
  <div class="flex items-center justify-between">
    <div class="text-sm font-semibold text-white badge badge-info">
      {{ transaction.category }}
    </div>
    <div class="text-sm font-medium">{{ transaction.date }}</div>
  </div>

  <div>
    <button class="w-full btn btn-info h-1/2">Edit</button>
    <button class="w-full btn btn-error h-1/2">Delete</button>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '@/types/supabase';

import { formatAmount, styleAmount } from '@/util/format-utils';

defineProps({
  transaction: {
    type: Object as PropType<Database['public']['Tables']['transactions']['Row']>,
    default: () => {}
  }
});
</script>
