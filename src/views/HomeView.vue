<template>
  <div v-if="accountsStore.accountPreviews.length > 0" class="flex flex-col gap-8 md:flex-row">
    <Card v-for="preview in accountsStore.accountPreviews" :key="preview.id" :title="preview.name">
    </Card>
  </div>
  <div v-else class="text-xl font-semibold text-center">No accounts exist yet :(</div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts';

import Card from '@/components/daisy/Card.vue';

const accountsStore = useAccountsStore();
</script>
