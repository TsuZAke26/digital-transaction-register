<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Import Transactions</div>
      <div class="flex flex-col gap-4 sm:flex-row">
        <input
          id="import-transactions-file-input"
          class="flex-auto w-full file-input file-input-neutral file-input-bordered file-input-sm sm:w-auto"
          @change="handleFileSelect"
          accept="text/csv"
          type="file"
        />

        <div class="flex gap-4">
          <button @click="handleClear" :disabled="!file" class="flex-1 btn btn-sm">Clear</button>
          <button @click="handleImport" :disabled="!file" class="flex-1 btn btn-secondary btn-sm">
            Import
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useToast } from 'vue-toastification';

import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

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
function handleFileSelect(event: any) {
  file.value = event.target.files[0];
}
async function handleImport() {
  try {
    if (!file.value) {
      throw new Error('No file selected');
    }

    if (file.value?.type !== 'text/csv') {
      throw new Error('Not a CSV file');
    }

    const transactionsJSON = (await importTransactionCSV(file.value)).data;

    const transactionsToImport: Database['public']['Tables']['transactions']['Insert'][] =
      transactionsJSON.map((transaction: any) => {
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
    importTransactionsFileInput.value = '';
    file.value = null;
  }
}
</script>
