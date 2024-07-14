<template>
  <div class="container max-w-5xl mx-auto">
    <div class="space-y-4">
      <!-- Import Transactions card -->
      <ImportTransactions :accountId="id" />

      <!-- Render All Transactions card -->
      <div class="border card">
        <div class="card-body">
          <div class="card-title">Transactions</div>
          <Suspense>
            <FilteredTransactions :account-id="id" />

            <template #fallback>Loading transactions...</template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImportTransactions from '@/components/views/accounts/id/transactions/ImportTransactions.vue';
import FilteredTransactions from '@/components/views/accounts/id/transactions/FilteredTransactions.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>
