<template>
  <div v-if="!loading && localLatestTransactions.length === 0">No transactions found</div>
  <div v-else>
    <!-- Latest Transactions - Mobile View -->
    <div class="sm:hidden">
      <TransactionsListMobile :transactions="localLatestTransactions" />
    </div>

    <!-- Latest Transactions - Desktop View -->
    <div class="hidden sm:block">
      <TransactionsListDesktop :transactions="localLatestTransactions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import TransactionsListMobile from '@/components/transactions/TransactionsListMobile.vue';
import TransactionsListDesktop from '@/components/transactions/TransactionsListDesktop.vue';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});
const idAsNumber = Number.parseInt(props.accountId);

const transactionsStore = useTransactionsStore();
const { loading } = storeToRefs(transactionsStore);
const { latestTransactions } = transactionsStore;

const localLatestTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);

await latestTransactions(idAsNumber).then((data) => {
  localLatestTransactions.value = data;
});
</script>
