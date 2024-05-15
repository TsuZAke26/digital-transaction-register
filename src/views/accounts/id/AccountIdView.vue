<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Account Summary card -->
      <div class="border card">
        <div class="card-body">
          <Suspense>
            <AccountSummaryRenderer :id="id" />

            <template #fallback>
              <div>Loading account summary...</div>
            </template>
          </Suspense>
        </div>
      </div>

      <!-- Transactions Preview card -->
      <div class="border card">
        <div class="card-body">
          <div class="card-title">Transactions</div>

          <Suspense>
            <TransactionsListRenderer :id="id" />

            <template #fallback>
              <div>Loading recent transactions...</div>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountSummaryRenderer from '@/components/views/accounts/id/AccountSummaryRenderer.vue';
import TransactionsListRenderer from '@/components/views/accounts/id/TransactionsListRenderer.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>
