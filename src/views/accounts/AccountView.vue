<template>
  <div class="flex flex-col gap-8">
    <!-- Account Info card -->
    <Card :title="account?.name" class="w-full border shadow-md">
      <template #body>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, placeat velit. Eos velit
        sint consectetur sit doloribus repellat ipsam, nisi voluptatibus! Reiciendis quam eligendi
        alias exercitationem consequatur magni. Porro, eius?
      </template>
    </Card>

    <Card title="Transactions" class="w-full border shadow-md">
      <template #body>
        <div class="font-medium text-md">No transactions found</div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';

import { useAccountsStore } from '@/stores/accounts';

import type { Accounts } from '@/types/supabase/db-tables';

import Card from '@/components/daisy/Card.vue';

const props = defineProps({ id: { type: String, required: true } });

const accountsStore = useAccountsStore();
const { getAccountById, findAccountInStore } = accountsStore;

const account: Ref<Accounts | undefined> = ref(undefined);
onBeforeMount(async () => {
  await getAccountById(Number.parseInt(props.id));
  account.value = findAccountInStore(Number.parseInt(props.id));
});
</script>
