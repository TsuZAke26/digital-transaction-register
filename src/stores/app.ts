import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false);
  function startLoading() {
    console.log('startLoading()');
    isLoading.value = true;
  }
  function stopLoading() {
    console.log('stopLoading()');
    isLoading.value = false;
  }

  return { isLoading, startLoading, stopLoading };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
