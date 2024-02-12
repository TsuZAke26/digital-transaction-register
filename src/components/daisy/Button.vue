<template>
  <button class="btn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>
