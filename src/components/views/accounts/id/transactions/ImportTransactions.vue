<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Import Transactions</div>
      <div class="flex items-center gap-4">
        <input
          id="import-transactions-file-input"
          class="flex-auto file-input file-input-neutral file-input-bordered file-input-sm"
          @change="file = $event.target.files[0]"
          accept="text/csv"
          type="file"
        />

        <button @click="handleImport" :disabled="!file" class="btn btn-secondary btn-sm">
          Import
        </button>
        <button @click="handleClear" :disabled="!file" class="btn btn-outline btn-sm">Clear</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/suapbase';

import { importTransactionCSV } from '@/util/csv-utils';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const toast = useToast();

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { addTransactions } = transactionsStore;

const file: Ref<File | null> = ref(null);
async function handleImport() {
  try {
    if (file.value.type !== 'text/csv') {
      throw new Error('Not a CSV file');
    }

    const transactionsJSON = (await importTransactionCSV(file.value)).data;

    const transactionsToImport: Database['public']['Tables']['transactions']['Insert'][] =
      transactionsJSON.map((transaction) => {
        const transformedTransaction = { ...transaction };
        transformedTransaction.account_id = props.id;
        return transformedTransaction;
      });

    await addTransactions(transactionsToImport);

    toast.success('Transactions imported successfully!');

    await loadAccountBalances();
  } catch (error) {
    toast.error('Error importing transactions');
  }
}

function handleClear() {
  const importTransactionsFileInput: HTMLElement | null = document.getElementById(
    'import-transactions-file-input'
  );
  if (importTransactionsFileInput instanceof HTMLInputElement) {
    importTransactionsFileInput.value = null;
    file.value = null;
  }
}
</script>
