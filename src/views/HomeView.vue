<template>
  <div class="space-y-4">
    <Suspense>
      <div>
        <div class="text-3xl font-bold text-center">My Accounts</div>
        <MyAccounts />
      </div>

      <template #fallback>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard v-for="i in 3" :key="i" class="border" />
        </div>
      </template>
    </Suspense>

    <NewAccount />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

import MyAccounts from '@/components/accounts/MyAccounts.vue';
import SkeletonCard from '@/components/app/SkeletonCard.vue';
import NewAccount from '@/components/accounts/NewAccount.vue';

const userStore = useUserStore();
const { loadProfileData } = userStore;

loadProfileData().then(() => console.log('loaded profile data'));
</script>
