import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAccountsStore = defineStore('accounts', () => {
  const accountPreviews = ref([]);

  return { accountPreviews };
});
