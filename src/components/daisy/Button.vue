<template>
  <button class="w-full max-w-xs btn" @click="$emit('click')">{{ label }}</button>
</template>

<script setup lang="ts">
defineProps({
  label: String
});
defineEmits(['click']);
</script>
