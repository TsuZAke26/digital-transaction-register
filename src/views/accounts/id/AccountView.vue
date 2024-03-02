<template>
  <div class="flex flex-col gap-8">
    <!-- Account Info card -->
    <Suspense>
      <AccountData :id="accountId" />

      <template #fallback>
        <SkeletonCard class="h-32 border" />
      </template>
    </Suspense>

    <!-- Account Transactions -->
    <Card title="Transactions" class="w-full border shadow-md">
      <template #body>
        <div>
          <Suspense>
            <div class="space-y-4">
              <AccountTransactionsPreview :id="accountId" />
              <Button
                @click="$router.push({ name: 'account-transactions' })"
                class="btn-primary float-end"
              >
                View All Transactions
              </Button>
            </div>

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
import { useRoute } from 'vue-router';

import Card from '@/components/daisy/Card.vue';
import AccountData from '@/components/accounts/AccountData.vue';
import AccountTransactionsPreview from '@/components/transactions/AccountTransactionsPreview.vue';
import Button from '@/components/daisy/Button.vue';
import SkeletonCard from '@/components/app/SkeletonCard.vue';

const route = useRoute();
const accountId = route.params.id as string;
</script>
