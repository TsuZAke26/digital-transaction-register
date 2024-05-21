<template>
  <div class="border card">
    <div class="card-body">
      <div class="card-title">Import Transactions</div>
      <div class="flex flex-col gap-4 md:flex-row">
        <input
          id="import-transactions-file-input"
          class="w-full md:w-1/2 file-input file-input-neutral file-input-bordered file-input-sm sm:w-auto"
          @change="handleFileSelect"
          accept="text/csv"
          type="file"
        />

        <div class="flex gap-4 md:w-1/2">
          <button @click="handleClear" :disabled="!file" class="flex-1 btn btn-sm">Clear</button>
          <button @click="handleDownloadTempalte" class="flex-1 btn btn-secondary btn-sm">
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              class="w-6 h-6 fill-inherit"
            >
              <path
                d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"
              />
            </svg> -->
            Template
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
function handleDownloadTempalte() {
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
        const transformedTransaction = { ...transaction };
        transformedTransaction.account_id = props.id;
        return transformedTransaction;
      });
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
  } catch (error) {
    toast.error('Error importing transactions');
  }
}
</script>
