import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const progressValue = ref(0);
  const showProgress = computed(() => {
    return progressValue.value > 0;
  });
  function setProgress(value: number) {
    progressValue.value = value;
  }

  let gradualTimeout: NodeJS.Timeout;
  function startGradualProgress() {
    console.log('startGradualProgress()');

    gradualTimeout = setInterval(() => {
      if (progressValue.value < 105) {
        progressValue.value += Math.random();
      }
    }, 250);
  }

  function stopGradualProgress() {
    console.log('stopGradualProgress()');

    clearInterval(gradualTimeout);

    progressValue.value = 100;

    setTimeout(() => (progressValue.value = 0), 2500);
  }

  return { progressValue, showProgress, setProgress, startGradualProgress, stopGradualProgress };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
