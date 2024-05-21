<template>
  <div class="container max-w-5xl p-4 mx-auto space-y-4">
    <!-- Back Button -->
    <div @click="$router.back()" class="flex items-center space-x-2 text-sm cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6 fill-black">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
      <span class="text-lg font-semibold">Back to Account</span>
    </div>

    <!-- Import Transactions card -->
    <ImportTransactions :id="id" />

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
