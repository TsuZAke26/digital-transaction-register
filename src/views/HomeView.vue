<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="text-xl font-bold text-center">Welcome, {{ displayName }}</div>

    <!-- Accounts List -->
    <div class="w-full mt-4 border card">
      <div class="space-y-2 card-body">
        <div class="flex justify-between card-title">
          Accounts
          <div
            class="flex items-center text-sm cursor-pointer"
            @click="$router.push({ name: 'accounts' })"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-6 h-6">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
          </div>
        </div>

        <Suspense>
          <AccountSummaryListsRenderer />
          <template #fallback><div>Loading accounts...</div></template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

import AccountSummaryListsRenderer from '@/components/views/home/AccountSummaryListsRenderer.vue';

const userStore = useUserStore();
const { displayName } = storeToRefs(userStore);
</script>
