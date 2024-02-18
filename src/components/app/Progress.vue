<template>
  <progress
    :value="progressValue"
    class="z-20 w-full progress progress-accent"
    max="100"
  ></progress>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const { progressValue } = appStore;
</script>
