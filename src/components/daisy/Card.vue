<template>
  <div class="shadow-xl card w-96 bg-base-100">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <slot name="body"></slot>
      <div class="justify-end card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ title: String });
</script>

<style scoped></style>
