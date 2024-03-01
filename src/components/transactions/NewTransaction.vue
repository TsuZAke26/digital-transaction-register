<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <Button class="w-full text-white sm:w-64 bg-primary dark:text-black" @click="showForm = true">
      <span class="text-lg font-semibold">Create New Transaction</span>
    </Button>
    <Card v-if="showForm" class="w-full border" title="Add New Transaction">
      <template #body>
        <NewTransactionForm @close="showForm = false" :account-id="accountId" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';

import Button from '@/components/daisy/Button.vue';
import Card from '@/components/daisy/Card.vue';
import NewTransactionForm from '@/components/forms/NewTransactionForm.vue';

defineProps({ accountId: { type: String, required: true } });

const showForm: Ref<boolean> = ref(false);
</script>
