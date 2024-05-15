<template>
  <div class="container max-w-5xl p-4 mx-auto">
    <div class="text-xl font-bold text-center">Welcome, {{ displayName }}</div>

    <!-- Accounts List -->
    <div class="w-full mt-4 border card">
      <div class="space-y-2 card-body">
        <div class="card-title">Accounts</div>

        <Suspense>
          <AccountSummaryListsRenderer />
          <template #fallback><div>Loading accounts...</div></template>
        </Suspense>

        <div class="justify-end card-actions">
          <button
            class="float-right text-lg btn btn-secondary"
            @click="handleShowAddAccountModal"
            type="button"
          >
            Add New Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

import AccountSummaryListsRenderer from '@/components/views/home/AccountSummaryListsRenderer.vue';

const userStore = useUserStore();
const { displayName } = storeToRefs(userStore);

let addAccountDialogEl: HTMLElement | null;
function handleShowAddAccountModal() {
  if (addAccountDialogEl instanceof HTMLDialogElement) {
    addAccountDialogEl.showModal();
  }
}

onMounted(() => {
  addAccountDialogEl = document.getElementById('modal-add-account');
});
</script>
