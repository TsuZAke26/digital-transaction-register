<template>
  <Suspense>
    <AccountPreviews />

    <template #fallback>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard v-for="i in 3" :key="i" class="border" />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import AccountPreviews from '@/components/accounts/AccountPreviews.vue';
import SkeletonCard from '@/components/app/SkeletonCard.vue';
</script>
