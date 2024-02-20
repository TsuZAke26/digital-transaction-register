<template>
  <div class="flex flex-col gap-8">
    <!-- Account Info card -->
    <Suspense>
      <AccountData :id="id" />

      <template #fallback>
        <SkeletonCard class="h-32 border" />
      </template>
    </Suspense>

    <!-- Account Transactions -->
    <Card title="Transactions" class="w-full border shadow-md">
      <template #body>
        <NewTransaction :account-id="id" />
        <div>
          <Suspense>
            <AccountTransactions :id="id" />

            <template #fallback>
              <div class="font-medium text-md">Loading account transactions...</div>
            </template>
          </Suspense>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/daisy/Card.vue';
import AccountData from '@/components/accounts/AccountData.vue';
import AccountTransactions from '@/components/transactions/AccountTransactions.vue';
import NewTransaction from '@/components/transactions/NewTransaction.vue';
import SkeletonCard from '@/components/app/SkeletonCard.vue';

defineProps({ id: { type: String, required: true } });
</script>
