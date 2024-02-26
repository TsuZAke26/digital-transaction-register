<template>
  <Card :title="account?.name" class="w-full border shadow-md">
    <template #body>
      <div class="flex items-start justify-between">
        <div class="font-light text-md text-neutral-500">{{ account?.account_type }}</div>
        <div class="text-4xl font-semibold">${{ account?.balance }}</div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { useAccountsStore } from '@/stores/accounts';
import type { Database } from '@/types/supabase';

import Card from '../daisy/Card.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const accountId = Number.parseInt(props.id);

const accountsStore = useAccountsStore();
const { getAccountById, findAccountInStore } = accountsStore;

const account: Ref<Database['public']['Tables']['accounts']['Row'] | undefined> = ref(undefined);
await getAccountById(accountId);
account.value = findAccountInStore(accountId);
</script>
