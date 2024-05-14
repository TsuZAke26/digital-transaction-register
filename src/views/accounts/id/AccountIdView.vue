<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="space-y-4">
      <!-- Account Summary card -->
      <Suspense>
        <AccountSummaryRenderer :id="id" />

        <template #fallback>
          <div class="border card">
            <div class="card-body">Loading account summary...</div>
          </div>

          <!-- Account Summary Card skeleton -->
          <!-- <div class="border h-28 card">
            <div class="card-body">
              <div class="flex flex-row justify-between">
                <div class="space-y-4">
                  <div class="w-48 h-4 skeleton"></div>
                  <div class="w-24 h-2 skeleton"></div>
                </div>

                <div class="w-1/3 h-6 skeleton"></div>
              </div>
            </div>
          </div> -->
        </template>
      </Suspense>

      <!-- Transactions Preview card -->
      <Suspense>
        <TransactionsRenderer :id="id" />

        <template #fallback>
          <div>
            <div class="border card">
              <div class="card-body">Loading recent transactions...</div>
            </div>
            <!-- Transactions Card skeleton (mobile) -->
            <!-- <div class="border card sm:hidden">
              <div class="space-y-2 card-body">
                <div v-for="i in 3" :key="i" class="px-4 py-2 space-y-2 border rounded-lg">
                  <div class="flex items-start justify-between">
                    <div class="w-1/2 h-3 skeleton"></div>
                    <div class="w-1/4 h-4 skeleton"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="w-1/4 h-4 skeleton"></div>
                    <div class="w-1/6 h-2 skeleton"></div>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- Transactions Card skeleton (desktop) -->
            <!-- <div class="hidden w-full border card sm:block">
              <div class="card-body">
                <div class="w-48 h-4 skeleton"></div>
                <div v-for="i in 4" :key="i" class="w-full h-2 skeleton"></div>
              </div>
            </div> -->
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountSummaryRenderer from '@/components/views/accounts/id/AccountSummaryRenderer.vue';
import TransactionsRenderer from '@/components/views/accounts/id/TransactionsRenderer.vue';

defineProps({
  id: {
    type: String,
    required: true
  }
});
</script>
