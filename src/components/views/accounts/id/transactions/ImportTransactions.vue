<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Import Transactions</div>
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="grid w-full grid-cols-8 gap-4 md:w-2/3">
          <input
            id="import-transactions-file-input"
            class="col-span-6 file-input file-input-neutral file-input-bordered file-input-sm"
            @change="handleFileSelect"
            accept="text/csv"
            type="file"
          />
          <button @click="handleClear" :disabled="!file" class="col-span-2 btn btn-sm">
            Clear
          </button>
        </div>

        <div class="flex gap-4 md:w-1/3">
          <button @click="handleDownloadTemplate" class="flex-1 btn btn-secondary btn-sm">
            Download Template
          </button>
          <button @click="handleImport" :disabled="!file" class="flex-1 btn btn-primary btn-sm">
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

import { useUserStore } from '@/stores/user';
import { useAccountsStore } from '@/stores/accounts';
import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { importTransactionCSV, generateImportTemplate } from '@/util/csv-utils';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const toast = useToast();

const userStore = useUserStore();
const { addCategory, saveAppSettings } = userStore;

const accountsStore = useAccountsStore();
const { loadAccountBalances } = accountsStore;

const transactionsStore = useTransactionsStore();
const { addTransactions } = transactionsStore;

const file: Ref<File | null> = ref(null);
function handleFileSelect(event: any) {
  file.value = event.target.files[0];
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
function handleDownloadTemplate() {
  const template = new Blob([generateImportTemplate()], { type: 'text/csv' });

  // https://www.geeksforgeeks.org/how-to-export-html-table-to-csv-using-javascript/
  let tempLink = document.createElement('a');

  tempLink.download = 'import_template.csv';
  let templateUrl = window.URL.createObjectURL(template);
  tempLink.href = templateUrl;

  tempLink.style.display = 'none';
  document.body.appendChild(tempLink);

  tempLink.click();
  document.body.removeChild(tempLink);
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
        addCategory(transaction.category);

        const transformedTransaction = { ...transaction };
        transformedTransaction.account_id = props.id;

        return transformedTransaction;
      });
    await saveAppSettings();

    await addTransactions(transactionsToImport);
    // const transactionsToImportNew: NewTransaction[] = transactionsJSON.map((transaction: any) => {
    //   const transformedTransaction = { ...transaction };
    //   transformedTransaction.accountId = props.id;
    //   return transformedTransaction;
    // });
    // transactionsToImportNew.forEach(async (importTransaction) => {
    //   await addTransaction(importTransaction);
    // });

    toast.success('Transactions imported successfully!');

    await loadAccountBalances();

    handleClear();
  } catch (error) {
    toast.error('Error importing transactions');
  }
}
</script>
