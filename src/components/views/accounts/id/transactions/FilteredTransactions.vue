<template>
  <!-- Filter Controls -->
  <!-- <div class="border collapse collapse-arrow">
    <input type="checkbox" /> -->

  <!-- <div class="collapse-title">Filters</div>
    <div class="collapse-content">
      <div class="flex flex-col gap-4"> -->
  <!-- Start/End Date -->
  <!-- <div class="flex gap-4">
          <input
            id="account-transactions-filters-start-date"
            v-model="filters.startDate"
            class="flex-grow input input-bordered"
            type="date"
          />

          <input
            id="account-transactions-filters-end-date"
            v-model="filters.endDate"
            class="flex-grow input input-bordered"
            type="date"
          />
        </div> -->

  <!-- Transaction Name Contains -->
  <!-- <input class="w-full input input-bordered" v-model="filters.name" placeholder="Name" /> -->

  <!-- Transactions with Selected Categories -->
  <!-- <div v-if="categoriesForFiltering.length > 0" class="flex flex-wrap gap-4"> -->
  <!-- https://vuejs.org/guide/essentials/forms#checkbox -->
  <!-- <div
            v-for="(category, index) in categoriesForFiltering"
            :key="index"
            class="flex items-center space-x-2"
          >
            <input
              v-model="filters.categories"
              :value="category"
              :id="category"
              type="checkbox"
              class="checkbox"
            />
            <label :for="category">{{ category }}</label>
          </div>
        </div> -->

  <!-- Clear/Apply Filters -->
  <!-- <div class="flex gap-4">
          <button class="flex-grow btn btn-ghost" @click="clearFilters">Reset</button>

          <button
            :disabled="!canApplyFilters"
            class="flex-grow btn btn-primary"
            @click="updateFilteredTransactions"
          >
            Apply
          </button>
        </div>
      </div>
    </div> -->
  <!-- </div> -->

  <!-- <div class="w-full my-4 border"></div> -->

  <div class="space-y-4">
    <TransactionsListRenderer :transactions="filteredTransactionsPaginated" />

    <div class="flex items-center justify-between gap-4">
      <!-- Pagination controls -->
      <div class="join">
        <!-- Previous Page button -->
        <button @click="currentPage -= 1" class="join-item btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-4 h-4">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>

        <button class="join-item btn btn-sm">Page {{ currentPage }} / {{ totalPages }}</button>

        <!-- Next Page button -->
        <button @click="currentPage += 1" class="join-item btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960">
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>

      <!-- Per Page selector -->
      <div class="space-x-2">
        <label>Per Page</label>
        <select v-model="perPage" class="select select-bordered select-sm">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, type ComputedRef, computed, watch, reactive } from 'vue';
import { storeToRefs } from 'pinia';

import { useTransactionsStore } from '@/stores/transactions';

import type { Database } from '@/types/supabase';

import { REGEX_DATE_FORMAT } from '@/util/regex';

import TransactionsListRenderer from '@/components/transactions/TransactionsListRenderer.vue';

const props = defineProps({
  accountId: {
    type: String,
    required: true
  }
});
const accountIdAsNumber = Number.parseInt(props.accountId);

const transactionsStore = useTransactionsStore();
const { transactions } = storeToRefs(transactionsStore);
const { loadTransactionsByAccount } = transactionsStore;

const filters = reactive({
  startDate: '',
  endDate: '',
  name: '',
  categories: [] as string[]
});
const categoriesForFiltering = computed(() => {
  const result: string[] = [];
  transactions.value.forEach((transaction) => {
    const hasCategory = transaction.category !== null;
    const alreadyInResult =
      result.findIndex((resultTransaction) => resultTransaction === transaction.category) !== -1;
    if (hasCategory && !alreadyInResult) {
      result.push(transaction.category as string);
    }
  });
  return result.sort();
});
const canApplyFilters = computed(() => {
  const startDateValid = filters.startDate.length > 0 && REGEX_DATE_FORMAT.test(filters.startDate);
  const endDateValid = filters.endDate.length > 0 && REGEX_DATE_FORMAT.test(filters.endDate);
  const nameValid = filters.name.length >= 3;
  const categoriesValid = filters.categories.length > 0;

  return startDateValid || endDateValid || nameValid || categoriesValid;
});
function clearFilters() {
  filters.startDate = '';
  filters.endDate = '';
  filters.name = '';
  filters.categories = [];

  filteredTransactions.value = transactions.value;
}

const filteredTransactions: Ref<Database['public']['Tables']['transactions']['Row'][]> = ref([]);
watch(transactions, (newValue) => {
  filteredTransactions.value = newValue;
  updateFilteredTransactions();
});

const filteredTransactionsPaginated: ComputedRef<
  Database['public']['Tables']['transactions']['Row'][]
> = computed(() => {
  const startIndex = perPage.value * currentPage.value - perPage.value;
  const endIndex =
    perPage.value * currentPage.value > filteredTransactions.value.length
      ? filteredTransactions.value.length
      : perPage.value * currentPage.value;

  return filteredTransactions.value.slice(startIndex, endIndex);
});
const perPage = ref(10);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / perPage.value));

function updateFilteredTransactions() {
  let finalFilteredTransactions: Database['public']['Tables']['transactions']['Row'][] = [];
  finalFilteredTransactions = transactions.value;

  if (filters.startDate.length > 0) {
    finalFilteredTransactions = finalFilteredTransactions.filter((transaction) => {
      return transaction.date >= filters.startDate;
    });
  }

  if (filters.endDate.length > 0) {
    finalFilteredTransactions = finalFilteredTransactions.filter((transaction) => {
      return transaction.date <= filters.endDate;
    });
  }

  if (filters.name.length > 0) {
    finalFilteredTransactions = finalFilteredTransactions.filter((tranasction) => {
      return tranasction.name.includes(filters.name);
    });
  }

  if (filters.categories.length > 0) {
    finalFilteredTransactions = finalFilteredTransactions.filter((transaction) => {
      if (transaction.category) {
        return filters.categories.includes(transaction.category);
      } else {
        return transaction;
      }
    });
  }

  filteredTransactions.value = finalFilteredTransactions;
}

await loadTransactionsByAccount(accountIdAsNumber).then(() => {
  filteredTransactions.value = transactions.value;
});
</script>
